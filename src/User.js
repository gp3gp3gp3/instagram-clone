import React, { Component } from 'react'

class User extends Component {
  render () {
    console.log(this.props)
    const {
      bio,
      full_name,
      profile_picture,
      username,
      website
    } = this.props

    return (
      <div>
        <img src={profile_picture} alt="Profile" />
        <h1>{full_name}</h1>
        <h2>{username}</h2>
        <h3>{website}</h3>
        <p>{bio}</p>
      </div>
    )
  }
}

export default User