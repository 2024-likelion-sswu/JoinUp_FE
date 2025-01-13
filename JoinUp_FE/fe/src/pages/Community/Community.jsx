import React from 'react'
import BackBtn from '../../assets/images/BackBtn.svg'
import '../../assets/scss/section/Community/community.scss'
import Community_Post from '../../components/Community_section/Community_Post'
import Community_Notice from '../../components/Community_section/Community_Notice'
import Community_Hot from '../../components/Community_section/Community_Hot'
const Community = () => {
  return (
    <div className='container'>
        <div className='CommunityContainer'>
            <div className='CommunityHd'>
                    <img src={BackBtn} className='BackBtnImg'></img>
                    <div className='CommunityTitle'>커뮤니티</div>
            </div>
            <Community_Post />
            <Community_Hot />
            <Community_Notice />
        </div>
    </div>
    
  )
}

export default Community
