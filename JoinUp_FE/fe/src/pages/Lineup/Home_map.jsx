import React, { useEffect, useState } from "react";
import "../../assets/scss/section/Lineup/home_map.scss";
import { FaBell } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomeMap = () => {
  const [currentLocation, setCurrentLocation] = useState("서울 중심");
  const [clickScrollBar, setClickScrollBar] = useState(false);
  const [likedPositions, setLikedPositions] = useState([]);
  const navigate = useNavigate();
  const [overlays, setOverlays] = useState({}); // Store overlays for dynamic updates

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4ebcb27f678870a3ed3de7a0da539c36&autoload=false&libraries=services,clusterer,drawing";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          initializeMap();
        });
      } else {
        console.error("Kakao Maps 객체를 사용할 수 없습니다.");
      }
    };

    script.onerror = () => {
      console.error("Kakao Maps 스크립트 로드 실패");
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [clickScrollBar]);

  useEffect(() => {
    // Update overlays when likedPositions changes
    Object.entries(overlays).forEach(([key, overlay]) => {
      const isLiked = likedPositions.includes(key);
      const content = createOverlayContent(key, isLiked);
      overlay.setContent(content);
    });
  }, [likedPositions]);

  const handleAddStation = async (stationName) => {
    try {
      const token = localStorage.getItem("authToken"); // 실제 토큰 값으로 교체하세요
      const response = await axios.post(
        "http://localhost:8080/my-stations",
        { stationName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("정류장 추가 성공:", response.data);
      alert("정류장이 성공적으로 추가되었습니다!");
    } catch (error) {
      console.error("정류장 추가 실패:", error.response?.data || error.message);
      alert("정류장 추가 중 오류가 발생했습니다.");
    }
  };

  const createOverlayContent = (title, isLiked) => {
    const overlayContent = document.createElement("div");
    overlayContent.style.background = "white";
    overlayContent.style.padding = "5px";
    overlayContent.style.borderRadius = "5px";
    overlayContent.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
    overlayContent.style.position = "relative";
    overlayContent.style.transform = "translateY(-125%)";
    overlayContent.style.textAlign = "center";
    overlayContent.style.display = "flex";
    overlayContent.style.justifyContent = "center";
    overlayContent.style.alignItems = "center";

    const titleElement = document.createElement("span");
    titleElement.textContent = title;
    titleElement.style.marginRight = "10px";
    overlayContent.appendChild(titleElement);

    const heartIcon = document.createElement("span");
    heartIcon.style.cursor = "pointer";

    const heartSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    heartSVG.setAttribute("width", "17");
    heartSVG.setAttribute("height", "17");
    heartSVG.setAttribute("viewBox", "0 0 22 20");
    heartSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute("clip-rule", "evenodd");
    path.setAttribute(
      "d",
      "M11 18L9.55 16.7771C4.4 12.4507 1 9.59728 1 6.09537C1 3.24196 3.42 1 6.5 1C8.24 1 9.91 1.75041 11 2.93624C12.09 1.75041 13.76 1 15.5 1C18.58 1 21 3.24196 21 6.09537C21 9.59728 17.6 12.4507 12.45 16.7864L11 18Z"
    );

    if (isLiked) {
      path.setAttribute("fill", "#B097FF");
      path.setAttribute("stroke", "#B097FF");
    } else {
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "#B097FF");
    }

    path.setAttribute("stroke-width", "2");
    heartSVG.appendChild(path);
    heartIcon.appendChild(heartSVG);

    heartIcon.style.width = "17px";
    heartIcon.style.height = "17px";

    heartIcon.onclick = async () => {
      if (!isLiked) {
        await handleAddStation(title); // 서버로 데이터 전송
        setLikedPositions((prev) => [...prev, title]);
      }
    };

    overlayContent.appendChild(heartIcon);

    return overlayContent;
  };

  const initializeMap = () => {
    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
      console.error("지도 컨테이너를 찾을 수 없습니다.");
      return;
    }

    const mapOption = {
      center: new window.kakao.maps.LatLng(37.566535, 126.9779692),
      level: 8,
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    const positions = [
      { title: "도봉산", latlng: new window.kakao.maps.LatLng(37.689535, 127.046489) },
      { title: "창동", latlng: new window.kakao.maps.LatLng(37.653288, 127.047425) },
      { title: "석계", latlng: new window.kakao.maps.LatLng(37.614775, 127.065941) },
      { title: "신설동", latlng: new window.kakao.maps.LatLng(37.576480, 127.024798) },
      { title: "동묘앞", latlng: new window.kakao.maps.LatLng(37.571401, 127.016793) },
      { title: "동대문", latlng: new window.kakao.maps.LatLng(37.571437, 127.009130) },
      { title: "종로3가", latlng: new window.kakao.maps.LatLng(37.571607, 126.991806) },
      { title: "시청", latlng: new window.kakao.maps.LatLng(37.564718, 126.977108) },
      { title: "서울역", latlng: new window.kakao.maps.LatLng(37.554648, 126.970697) },
      { title: "노량진", latlng: new window.kakao.maps.LatLng(37.513290, 126.940621) },
      { title: "신길", latlng: new window.kakao.maps.LatLng(37.517122, 126.917169) },
      { title: "신도림", latlng: new window.kakao.maps.LatLng(37.508725, 126.891295) },
      { title: "가산디지털단지", latlng: new window.kakao.maps.LatLng(37.481426, 126.882882) },
      { title: "온수", latlng: new window.kakao.maps.LatLng(37.492258, 126.823384) },
      { title: "사당", latlng: new window.kakao.maps.LatLng(37.476647, 126.981685) },
      { title: "교대", latlng: new window.kakao.maps.LatLng(37.493514, 127.014888) },
      { title: "종합운동장", latlng: new window.kakao.maps.LatLng(37.510997, 127.073642) },
      { title: "건대입구", latlng: new window.kakao.maps.LatLng(37.540693, 127.070212) },
      { title: "왕십리", latlng: new window.kakao.maps.LatLng(37.561533, 127.037732) },
      { title: "신당", latlng: new window.kakao.maps.LatLng(37.565972, 127.017836) },
      { title: "동대문역사문화공원", latlng: new window.kakao.maps.LatLng(37.565138, 127.007896) },
      { title: "을지로4가", latlng: new window.kakao.maps.LatLng(37.566941, 126.998079) },
      { title: "을지로3가", latlng: new window.kakao.maps.LatLng(37.566295, 126.991885) },
      { title: "충정로", latlng: new window.kakao.maps.LatLng(37.559973, 126.963672) },
      { title: "합정", latlng: new window.kakao.maps.LatLng(37.549463, 126.913739) },
      { title: "당산", latlng: new window.kakao.maps.LatLng(37.534777, 126.902352) },
      { title: "영등포구청", latlng: new window.kakao.maps.LatLng(37.524997, 126.895811) },
      { title: "대림", latlng: new window.kakao.maps.LatLng(37.492974, 126.895701) },
      { title: "연신내", latlng: new window.kakao.maps.LatLng(37.619001, 126.921008) },
      { title: "불광", latlng: new window.kakao.maps.LatLng(37.610637, 126.929722) },
      { title: "충무로", latlng: new window.kakao.maps.LatLng(37.561243, 126.994332) },
      { title: "약수", latlng: new window.kakao.maps.LatLng(37.554347, 127.010655) },
      { title: "고속터미널", latlng: new window.kakao.maps.LatLng(37.504810, 127.004943) },
      { title: "오금", latlng: new window.kakao.maps.LatLng(37.502162, 127.128111) },
      { title: "노원", latlng: new window.kakao.maps.LatLng(37.655128, 127.061368) },
      { title: "삼각지", latlng: new window.kakao.maps.LatLng(37.534777, 126.973110) },
      { title: "동작", latlng: new window.kakao.maps.LatLng(37.502637, 126.979385) },
      { title: "총신대입구", latlng: new window.kakao.maps.LatLng(37.486263, 126.981618) },
      { title: "군자", latlng: new window.kakao.maps.LatLng(37.557345, 127.079543) },
      { title: "청구", latlng: new window.kakao.maps.LatLng(37.560245, 127.013828) },
      { title: "공덕", latlng: new window.kakao.maps.LatLng(37.544018, 126.951592) },
      { title: "여의도", latlng: new window.kakao.maps.LatLng(37.521592, 126.924016) },
      { title: "김포공항", latlng: new window.kakao.maps.LatLng(37.562434, 126.801059) },
      { title: "올림픽공원", latlng: new window.kakao.maps.LatLng(37.516078, 127.130848) },
      { title: "태릉입구", latlng: new window.kakao.maps.LatLng(37.617652, 127.075300) },
      { title: "모란", latlng: new window.kakao.maps.LatLng(37.432158, 127.129082) },
      { title: "복정", latlng: new window.kakao.maps.LatLng(37.470047, 127.126661) },
      { title: "가락시장", latlng: new window.kakao.maps.LatLng(37.492509, 127.118153) },
      { title: "석촌", latlng: new window.kakao.maps.LatLng(37.505431, 127.112893) },
      { title: "잠실", latlng: new window.kakao.maps.LatLng(37.513950, 127.102234) },
      { title: "천호", latlng: new window.kakao.maps.LatLng(37.538397, 127.123572) },
    ];


    const newOverlays = {}; // Temporary storage for overlays

    positions.forEach((pos) => {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: pos.latlng,
        title: pos.title,
      });

      const customOverlay = new window.kakao.maps.CustomOverlay({
        content: createOverlayContent(pos.title, likedPositions.includes(pos.title)),
        position: pos.latlng,
        yAnchor: 1,
      });

      newOverlays[pos.title] = customOverlay;

      window.kakao.maps.event.addListener(marker, "click", () => {
        customOverlay.setMap(map);
        setCurrentLocation(pos.title);
      });
    });

    setOverlays(newOverlays); // Store overlays in state
  };

  const handleScrollBar = () => {
    setClickScrollBar(!clickScrollBar);
  };

  return (
    <div className="home-map-container container">
      <header className="map-header">
        <div className="location-info">
          <RiSendPlaneLine className="send-icon" />
          <div className="location-text">
            <h1>내 위치</h1>
            <p>{currentLocation}</p>
          </div>
        </div>
        <FaBell className="bell-icon" />
      </header>
      {clickScrollBar ? (
        <Home onClick={handleScrollBar} />
      ) : (
        <>
          <div id="map" className="map" style={{ width: "100%", height: "80vh", maxHeight: "650px" }}></div>
          <div className="home-map-scroll-area btn" onClick={handleScrollBar}>
            <div className="home-map-scroll-bar"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeMap;
