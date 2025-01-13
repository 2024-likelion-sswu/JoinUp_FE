import React, {useState, useEffect} from 'react'
import axios from 'axios'
import UserIcon from '../../assets/images/UserIcon.png'
import { useNavigate } from 'react-router-dom'

const Account = ({onClick}) => {
    const navigate = useNavigate();

    const handleMoveEditPage = () => {
        navigate('/mypage/myedit')
    }

    const [user, setUser] = useState([]);
    useEffect(() => {
    const fetchPostInfo = async () => {
        try {
            const token = localStorage.getItem('authToken'); 

            const response = await axios.get(`http://localhost:8080/user/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUser(response.data.data);
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      };
      fetchPostInfo();
    },[])
  return (
    <div className='AccountContainer'>
        <img src={UserIcon}className='UserIcon'></img>
        <div className='UserInfoBox'>
            <div className='UserName'>{user.name}</div>
            <div className='UserEmail'>{user.email}</div>
            <div className='UserInfoBtn'>
                <button className='UserInfoEditer' onClick={() => handleMoveEditPage()}>회원정보 수정</button>
                <button className='UserInfoLogout' onClick={onClick}>로그아웃</button>
            </div>
        </div>
    </div>
  )
}

export default Account
