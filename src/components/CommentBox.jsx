import React, { useEffect } from 'react'
import profilePic from '../assets/person-circle-outline.svg'

const CommentBox = ({data}) => {
    const arr = data?.authorThumbnail
    let url = "";
    if(arr.length == 0){
      url = '';
    }else{
      const cpf = arr.slice(-1)[0];
      url = cpf.url;
    }
  return (
    <div className='video-info-grid comment-grid'>
        <div className="ppf">
            <img src={url === "" || undefined || null ? profilePic : url} alt="" />
        </div>
        <div className="comment_info">
            <span>{data?.authorText}</span>
            <span>{data?.publishedTimeText}</span>
            <p style={{paddingRight:'1rem'}} className='wrap-word'>{data?.textDisplay}</p>
        </div>
    </div>
  )
}

export default CommentBox