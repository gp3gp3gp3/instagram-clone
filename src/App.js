import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor () {
    super()
    this.state = {
      authenticated: false,
      response: {}
    }
    this.renderUser = this.renderUser.bind(this)
  }

  componentWillMount () {
    const url = window.location.search
    const parsedUrl = new URLSearchParams(url)
    if (parsedUrl.has('code')) {
      const ROOT_URL = process.env.NODE_ENV === 'development'
        ? 'http://localhost:4567/instagram'
        : 'https://sinatra-oauth-backend.herokuapp.com/instagram'
      const code = parsedUrl.get('code')

      axios.get(`${ROOT_URL}?code=${code}`)
      .then(res => {
        if (res.data.code === 400) {
          this.setState({error: res.data})
        } else {
          localStorage.setItem('token', res.data.access_token)
          this.setState({
            response: res.data.user,
            authenticated: true
          })

        }
      })
      .catch(error => {
        console.log("Sinatra server error", error)
        this.setState({error})
      })
    }
  }

  renderUser () {
    /* Set localhost:3001 to https://gp3gp3gp3.github.io/instagram-clone */
    const {
      authenticated,
      response
    } = this.state
    if (!authenticated) {
      return <a href='https://api.instagram.com/oauth/authorize/?client_id=f98db0ad5d2648f095525ea0986f4d1a&redirect_uri=http://localhost:3001&response_type=code'>Login to Instagram</a>
    } else {
      console.log(response)
      return (
        <div>content</div>
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
