import React, { Component } from 'react'
import logo from './logo.svg'
import axios from 'axios'
import jsonp from 'jsonp'
import './App.css'
import { clearUrlParams, SERVER_URL, REDIRECT_URI } from './utils'
import User from './User'

class App extends Component {
  constructor () {
    super()
    this.state = {
      authenticated: false,
      user: {}
    }
  }

  componentWillMount () {
    const url = window.location.search
    const parsedUrl = new URLSearchParams(url)

    if (parsedUrl.has('code')) {
      const code = parsedUrl.get('code')
      this.fetchToken(code)
    }

    if (localStorage.hasOwnProperty('token')) {
      this.fetchUser()
    }
  }

  fetchToken (code) {
    axios.get(`${SERVER_URL}?code=${code}`)
    .then(res => {
      if (res.data.code === 400) {
        console.error('Instagram api call error', res.data)
        this.setState({error: res.data})
        clearUrlParams()
      } else {
        localStorage.setItem('token', res.data.access_token)
        this.setState({
          user: res.data.user,
          authenticated: true
        })
        clearUrlParams()
      }
    })
    .catch(error => {
      console.error('Sinatra server error', error)
      this.setState({error})
      clearUrlParams()
    })
  }

  fetchUser () {
    jsonp(`https://api.instagram.com/v1/users/self/?access_token=${localStorage.getItem('token')}`, null, (err, res) => {
      if (err) {
        console.error(err.message)
      } else {
        this.setState({
          user: res.data,
          authenticated: true
        })
      }
    })
  }

  onSignOut () {
    localStorage.removeItem('token')
    this.setState({
      user: {},
      authenticated: false
    })
  }

  renderUser () {
    const {
      authenticated,
      user
    } = this.state

    if (!authenticated) {
      const url = window.location.search
      const parsedUrl = new URLSearchParams(url)

      if (parsedUrl.has('code')) {
        return <h2>Loading...</h2>
      }

      return (
        <a
          href={`https://api.instagram.com/oauth/authorize/?client_id=f98db0ad5d2648f095525ea0986f4d1a&redirect_uri=${REDIRECT_URI}&response_type=code`}
        >Login to Instagram</a>
      )
    } else {
      return (
        <div>
          <User onSignOut={this.onSignOut.bind(this)} {...user} />
        </div>
      )
    }
  }

  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Instagram clone</h2>
        </div>
        <div className='App-intro'>
          <h2>Source code for front end is located <a href='https://github.com/gp3gp3gp3/instagram-clone'>here</a></h2>
          <h2>Source code for back end is located <a href='https://github.com/gp3gp3gp3/Sinatra-Oauth-backend'>here</a></h2>
          {this.renderUser()}
        </div>
      </div>
    )
  }
}

export default App
