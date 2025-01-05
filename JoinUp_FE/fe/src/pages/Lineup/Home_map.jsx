import React, { useEffect, useRef, useState } from 'react';
import "../../assets/scss/section/Lineup/home_map.scss";
import { FaBell } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";

const HomeMap = () => {
    const mapContainer = useRef(null); // 지도를 표시할 div의 ref
    const mapRef = useRef(null); // 지도를 저장할 ref
    const [searchInput, setSearchInput] = useState(''); // 검색어 상태
    const [placesList, setPlacesList] = useState([]); // 검색 결과 상태
    const [markerRef, setMarkerRef] = useState(null);

    useEffect(() => {
      // 카카오 지도 API 스크립트 로드
      const script = document.createElement("script");
      script.src =
        '//dapi.kakao.com/v2/maps/sdk.js?appkey=ec66d94c1117358241e7da7954e8ce47&libraries=services,clusterer,drawing';
      script.async = true;
      document.head.appendChild(script);
  
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          const mapContainer = document.getElementById("map"); // 지도를 표시할 div
          const mapOption = {
            center: new window.kakao.maps.LatLng(37.566535, 126.9779692), // 지도의 중심좌표 (서울 시청 좌표 예시)
            level: 3, // 지도의 확대 레벨
          };
  
          // 지도 생성
          const map = new window.kakao.maps.Map(mapContainer, mapOption);
  
          // 현재 위치 표시
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              const lat = position.coords.latitude; // 위도
              const lon = position.coords.longitude; // 경도
  
              const currentLocation = new window.kakao.maps.LatLng(lat, lon); // 현재 위치의 위도와 경도
  
              const marker = new window.kakao.maps.Marker({
                position: currentLocation, // 마커의 위치
              });
  
              marker.setMap(map);
              map.setCenter(currentLocation); // 지도의 중심을 현재 위치로 설정
            });
          } else {
            alert("GPS를 지원하지 않는 브라우저입니다.");
          }
  
          // 임의의 장소 마커 추가
          const positions = [
            {
              title: "왕십리역 9번출구",
              latlng: new window.kakao.maps.LatLng(37.561079, 127.037661),
            },
            {
              title: "왕십리역 CGV",
              latlng: new window.kakao.maps.LatLng(37.560486, 127.037458),
            },
          ];
  
          positions.forEach((pos) => {
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: pos.latlng,
              title: pos.title,
            });
  
            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:5px;font-size:12px;">${pos.title}</div>`,
            });
  
            window.kakao.maps.event.addListener(marker, "mouseover", () =>
              infowindow.open(map, marker)
            );
            window.kakao.maps.event.addListener(marker, "mouseout", () =>
              infowindow.close()
            );
          });
        }
      };
  
      return () => {
        script.remove();
      };
    }, []);
  

    return (
        <div className="home-map-container">
            <header className="header">
                <div className="location-info">
                    <RiSendPlaneLine className="send-icon" />
                    <div className="location-text">
                        <h1>내 위치</h1>
                        <p>왕십리역 7번출구</p>
                    </div>
                </div>
                <FaBell className="bell-icon" />
            </header>
            <div
                ref={mapContainer}
                className="map-container"
                style={{ width: '375px', height: '375px', marginTop: '10px' }} // 지도의 크기 설정
            ></div>
        </div>
    );
};

export default HomeMap;
