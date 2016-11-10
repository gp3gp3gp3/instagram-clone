import React from 'react'

export default (props) => {
  const { link, imgUrl } = props

  return (
    <div>
      <a href={link}>
        <img src={imgUrl} alt="feed item" />
      </a>
    </div>
  )
}