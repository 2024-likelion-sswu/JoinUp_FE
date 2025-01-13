import React, { useState } from 'react'
import BackBtn from '../../assets/images/BackBtn.svg'
import '../../assets/scss/section/Posting/post.scss'
import HotPost from '../../components/Post_section/HotPost'
import PostList from '../../components/Post_section/PostList'
import Icon from '../../assets/images/Icon.svg'
import { useNavigate } from 'react-router-dom'
const Post = () => {
    const navigate = useNavigate();
    const [postCount, setPostCount] = useState([
        {title : "동역사 2호선 -> 4호선 탑승", content : "지금 상왕십리역인데 동역사 지하철 몇분 후에 오나요?", like : 1, comment : 0, img: "https://s3-alpha-sig.figma.com/img/adc9/546d/9da27dcdff013f1bf9a7d3de098b20e6?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H9RU~AIJqz9Zbx2AJzSfTVat11q6~UegdqvQynReMv0XPsExV7PExbGKV7MdnErspeyPwTtqhZm1eIItKl1d5R8hJuQ0idtZC38Sb~luZBFPRofbieW~zAlG1002fXn-lhyYMUWvY8FLiVBUxWQ6SGGw6zv6QpdDYB6FzLkW7LC6Z3Hb-dPFrglW91QAplaNUKiNNwgvDLIxpkRmr1VHWI78Gp9u-cPTQ17vT~EvEVB6SHQHNfT1lS7o-BbmfLQMlT8p5WuMKZR-UF4qoEeYZeCaWKOJ25T-XkApHzwRhoOziPPtJoAmV1NY1hjPT81csWVdJ78wRGYbQSovnT0vZg__"},
        {title : "택시 탈 사람 있나?", content : "왕십리역이나 동역사에서 탈 예정임", like : 4, comment : 5},
        {title : "환승이슈", content : "환승 안하고 한번에 가고싶다.", like : 4, comment : 5, img: "https://s3-alpha-sig.figma.com/img/fc71/391f/21deb5147d064711d8a726bf941f81fd?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mxqEiqhhJylyBX7hxEOLHfPX9BCyeaB8ZeSdXK4c1jfSEfyvJKBoVDDfq73QxR9YGMRCWMtkzwNBgE1vn~UfwD~R-yJJLYN8aPJqM~oYtcUovlvIhk8qHF2v1jHj2zdcnRVLckQC8sVyClN3BQcwHuI2Iu6e1r8R0o-HwCFkGEmkamxBQMLDCvOA1U5FP8FR0No4IBfJfneigYTTfFbGomDitBNfm6-qgiCfN1U4Qd8NdTmvC9oD6m2mbY0UM5SvEaerRGl5HQuhvWkYr2mRTAV~FYgv1hQmQXDX07PWE3gCHayLEViimpi0Z~HNxXwysuCLa-GxVTG-BwONE1v-sA__" },
        {title : "택시 탈 사람 있나?", content : "왕십리역이나 동역사에서 탈 예정임", like : 1, comment : 0},
        {title : "환승이슈", content : "환승 안하고 한번에 가고싶다.", like : 4, comment : 5, img: "https://s3-alpha-sig.figma.com/img/4db3/da9b/171c868c88446366aaca417d8f74e688?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cXlmOb6h90Ji2PbikT6yVAt8itZMCMxGWLi4CEBwVwQoQLmj3Cw0Qk312JqV3CD65ytbl2KPcL7VOeM1fIS-ztAZggjp~cTE9uplNtoAuJ9MUoUfE2UW~sFmidHPC7MeGMRGDN5sP89LRvSYIdVHM4dn4fNKEHcyXBIQZGSBcaVOA7clnLJpROvBVO8xF5THtc8HWYPc3JSNnQgnf1ciageLvf-hVItoudjNXp8Q10OSG3DF9n7SiTzkHsvo8BuBn~9H~lPJZPWMOBwsOTN3ymdXOMXJRyQty-qM2DGIWVCg98wq1EDNq6rsIJIPtXtlOZ0jokCWu-6uDI-2IBlMOg__"},
    ]);
    const handleMoveAddPost = () => {
        navigate('/community/addpost')
    }
  return (
    <div className='PostContainer container'>
        <div className='PostHd'>
            <img src={BackBtn} className='PostBackBtn'></img>
            <div className='PostHdTxt'>2호선 게시판</div>
        </div>
        <HotPost/>
        <div style={{height : "443.5px"}}>
            {postCount.map((post, index) => (
                <PostList Img={post.img} title ={post.title} content = {post.content} like = {post.like} comment = {post.comment} />
            ))}
        </div>
        <div className='AddPostBtn' onClick={() => handleMoveAddPost()}>
            <img src={Icon}></img>
        </div>
    </div>
  )
}
export default Post