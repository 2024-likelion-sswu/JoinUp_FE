import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/scss/section/Posting/addpost.scss'
import Camera from '../../assets/images/Camera.svg'

const AddPost = () => {
    const navigate = useNavigate();
    const handleMovePost = () => {
        navigate('/post')
    }
  return (
    <div className='AddPostContainer'>
        <div className='AddPTitle'>
            <div className='AddPDelete' onClick={() => handleMovePost()}>취소</div>
            <div className='AddPTitle1'>글쓰기</div>
        </div>
        <div className='PostTitleBox'>
            <div className='PostTitleBox1'>제목</div>
            <input className='PostTitleBox2' placeholder='input field'></input>
        </div>
        <div className='PostingBox'>
            <div className='PostingBox1'>본문</div>
            <textarea className='PostingBox2'></textarea>
            <input type="file" id="file-input" className='file-input' />
            <label htmlFor="file-input" className='file-label'>
                <img src={Camera} alt="Upload" className='PostingBox3' />
            </label>
        </div>
        <div className='MyEdBtn'>업로드</div>
    </div>
  )
}

export default AddPost
