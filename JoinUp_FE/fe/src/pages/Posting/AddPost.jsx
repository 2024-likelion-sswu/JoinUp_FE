import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../assets/scss/section/Posting/addpost.scss';
import Camera from '../../assets/images/Camera.svg';

const AddPost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [title, setTitle] = useState('');
    const queryParams = new URLSearchParams(location.search);
    const [content, setContent] = useState('');
    const category = queryParams.get('category');  // 쿼리 파라미터에서 category를 가져옴
    const [image, setImage] = useState(null); // 파일 상태

    const handleMovePost = () => {
        navigate('/post');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // 파일 선택
        if (file) {
            // 파일 크기 체크 (5MB 이하)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                alert('파일 크기가 너무 큽니다. 5MB 이하로 업로드 해주세요.');
                return;
            }

            // 파일 형식 체크 (JPG, PNG만 허용)
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                alert('JPG 또는 PNG 형식의 이미지 파일만 업로드 가능합니다.');
                return;
            }

        setImage(file); // 파일 상태로 설정
    }
    };
    

    const fetchAddPostInfo = async () => {
        try {
            const token = localStorage.getItem('authToken'); // 저장된 토큰 가져오기

            // FormData 객체를 사용하여 데이터를 전송
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('category', category);
            if (image) formData.append('image', image); // 이미지 파일 추가

            // API 요청
            const response = await axios.post("http://localhost:8080/community/posts", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // multipart로 전송
                },
            });

            // 서버 응답 처리
            if (response.data.success) {
                alert(response.data.message); // 성공 메시지
                navigate('/post'); // 게시글 목록으로 리다이렉트
            } else {
                alert(response.data.message); // 실패 메시지
            }
        } catch (error) {
            console.error("Failed to fetch add post info:", error);
            if (error.response) {
                console.error("Error response:", error.response.data);
                alert(`Error: ${error.response.data.message || error.response.data}`);
            } else {
                alert("게시글 등록 실패");
            }
        }
    };

    return (
        <div className='container'>
            <div className='AddPostContainer'>
                <div className='AddPTitle'>
                    <div className='AddPDelete' onClick={handleMovePost}>취소</div>
                    <div className='AddPTitle1'>글쓰기</div>
                </div>
                <div className='PostTitleBox'>
                    <div className='PostTitleBox1'>제목</div>
                    <input
                        className='PostTitleBox2'
                        placeholder='제목을 입력해주세요'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className='PostingBox'>
                    <div className='PostingBox1'>본문</div>
                    <textarea
                        className='PostingBox2'
                        placeholder='본문 내용을 입력해주세요'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <input
                        type="file"
                        id="file-input"
                        className='file-input'
                        onChange={handleImageChange}
                    />
                    <label htmlFor="file-input" className='file-label'>
                        <img src={Camera} alt="Upload" className='PostingBox3' />
                    </label>
                </div>
                <div className='MyEdBtn' onClick={fetchAddPostInfo}>업로드</div>
            </div>
        </div>
            
    );
};

export default AddPost;
