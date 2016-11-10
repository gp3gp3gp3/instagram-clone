import React from 'react'
import './FeedItem.css'

export default (props) => {
  const { link, imgUrl } = props

  return (
    <div className='feedItem'>
      <a href={link}>
        <img src={imgUrl} alt='feed item' />
      </a>
    </div>
  )
}
