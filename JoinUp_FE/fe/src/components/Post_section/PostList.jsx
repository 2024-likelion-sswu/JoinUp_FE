import React from 'react'
import Ht from '../../assets/images/Ht.svg'
import CommentBtn from '../../assets/images/CommentBtn.svg'
import Img9 from '../../assets/images/Img9.png'
const PostList = ({Img, title, content, like, comment}) => {
  return (
    <div className='PostListContainer'>
        <div className='PostBox'>
            <div className='PostImg'><img src={Img ? Img : "https://s3-alpha-sig.figma.com/img/d52a/85d6/1a44a0cc362e0d9fa9ad5f37bd190aa6?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=htFQjzyVcm1LIgl-YG57boxhy~httgyubSj9PpPMJp8Vt-juH0wUi2KJ-cXrwXRdSff-9gdX-ErJwzq1KJ4TJ3ITt0feuhAOtwCOzgWYAqaTwDd2YlBe5H48Ai7Hh~EPOFZFjCSHr~fIn4oVSmVInUsD1AuHzrCHA7Hz-NVHboN4Qmaqs4iGqnUj4-86q94PNJLUyX7PW3jen0B0S6cejApYjGQx6lI3Pwc6td0reQS~APL7wiSD9~jypZpoNxOeOOVz-ZNaAVTkJhDWtfephLSDz0YAaWrPZey-VISGglelpZeV-wnsd4brenxDpIJJUvADolZnVHl15M7~7jz~-A__"}></img></div>
            <div className='PostDetail'>
                <div className='PostTitle'>{title}</div>
                <div className='Posting'>{content}</div>
                <div className='PostFeeling'>
                    <img className='PostHt' src={Ht}></img>
                    <p>{like}</p>
                    <img className='PostCmt' src={CommentBtn}></img>
                    <p>{comment}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
export default PostList