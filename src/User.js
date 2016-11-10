import React, { Component } from 'react'
import FeedItem from './FeedItem'
import jsonp from 'jsonp'
import './User.css'

class User extends Component {
  constructor () {
    super()
    this.state = {
      feed: ''
    }
  }

  componentWillMount () {
    jsonp(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${localStorage.getItem('token')}`, null, (err, response) => {
      if (err) {
        console.error(err.message)
      } else {
        this.setState({
          feed: response.data.map(item => {
            return {
              id: item.id,
              link: item.link,
              imgUrl: item.images.standard_resolution.url
            }
          })
        })
      }
    })
  }

  renderFeed () {
    const { feed } = this.state
    if (!feed) {
      return <h2>Loading feed...</h2>
    }
    return feed.map(feedItem => <FeedItem key={feedItem.id} {...feedItem} />)
  }

  render () {
    const {
      bio,
      full_name,
      profile_picture,
      username,
      onSignOut,
      website
    } = this.props

    return (
      <div>
        <img className='profilePicture' src={profile_picture} alt='Profile' />
        <h1>{full_name}</h1>
        <h2>{username}</h2>
        <h3>{website}</h3>
        <p>{bio}</p>
        <button onClick={onSignOut}>Sign Out</button>
        {this.renderFeed()}
      </div>
    )
  }
}

export default User
