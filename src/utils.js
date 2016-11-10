export const clearUrlParams = () => {
  const query = window.location.search.substring(1)
  if (query.length) {
    if (window.history !== undefined && window.history.pushState !== undefined) {
      window.history.pushState({}, document.title, window.location.pathname)
    }
  }
}

export const SERVER_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4567/instagram'
  : 'https://sinatra-oauth-backend.herokuapp.com/instagram'

export const REDIRECT_URI = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : 'https://gp3gp3gp3.github.io/instagram-clone'