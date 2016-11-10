import React, { Component } from 'react'
import logo from './logo.svg'
import axios from 'axios'
import './App.css'
import { clearUrlParams, SERVER_URL, REDIRECT_URI } from './utils'
import User from './User'

class App extends Component {
  constructor () {
    super()
    this.state = {
      authenticated: false,
      response: {}
    }
    this.renderUser = this.renderUser.bind(this)
    this.onSignOut = this.onSignOut.bind(this)
  }

  componentWillMount () {
    const url = window.location.search
    const parsedUrl = new URLSearchParams(url)
    if (parsedUrl.has('code')) {
      const code = parsedUrl.get('code')

      axios.get(`${SERVER_URL}?code=${code}`)
      .then(res => {
        if (res.data.code === 400) {
          console.log('Instagram api call error', res.data)
          this.setState({error: res.data})
          clearUrlParams()
        } else {
          localStorage.setItem('token', res.data.access_token)
          this.setState({
            response: res.data.user,
            authenticated: true
          })
          clearUrlParams()
        }
      })
      .catch(error => {
        console.log("Sinatra server error", error)
        this.setState({error})
        clearUrlParams()
      })
    }
  }

  onSignOut () {
    localStorage.removeItem('token')
    this.setState({
      response: {},
      authenticated: false
    })
  }

  renderUser () {
    const {
      authenticated,
      response
    } = this.state

    if (!authenticated) {
      return (
        <a
          href={`https://api.instagram.com/oauth/authorize/?client_id=f98db0ad5d2648f095525ea0986f4d1a&redirect_uri=${REDIRECT_URI}&response_type=code`}
        >Login to Instagram</a>
      )
    } else {
      return (
        <div>
          <User {...response} />
          <button onClick={this.onSignOut}>Sign Out</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Instagram clone</h2>
        </div>
        <div className="App-intro">
          {this.renderUser()}
        </div>
      </div>
    );
  }
}

export default App;
