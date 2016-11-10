import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

class App extends Component {
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
          // set local storage off res.data.authentication_token
          this.setState({response: res.data.user})

        }
      })
      .catch(error => {
        console.log("sad", error)
        this.setState({error})
      })
    }

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Instagram clone</h2>
        </div>
        <p className="App-intro">
          <a href='https://api.instagram.com/oauth/authorize/?client_id=f98db0ad5d2648f095525ea0986f4d1a&redirect_uri=http://localhost:3001&response_type=code'>Login to instagram</a>
        </p>
      </div>
    );
  }
}

export default App;
