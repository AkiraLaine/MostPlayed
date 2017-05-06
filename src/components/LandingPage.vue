<template>
  <div class='wrapper'>
    <div class='card'>
      <div class='content'>
        <h1 class='title'>MostPlayed</h1>
        <h4 class='subtitle'>Find out what your most played Spotify artists and tracks are.</h4>
        <button class='button' @click='login()'>Get Started</button>
      </div>
      <div class='footer'>
        <p style="font-weight:300">Made with passion and music</p>
        <p style="font-weight:300">by <a href="https://akiralaine.github.io">Akira Laine</a> | <a href="https://github.com/AkiraLaine">GitHub</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import keys from '../keys'

export default {
  name: 'landing-page',
  methods: {
    login () {
      window.location.href = `https://accounts.spotify.com/authorize/?client_id=${keys.SPOTIFY_ID}&response_type=token&redirect_uri=${encodeURIComponent(window.location.origin + '/stats')}&scope=user-top-read`
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(#7cd89d, #1ed760);
}
.card {
  width: 350px;
  height: 450px;
  background-color: #fcfcfc;
  box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.2);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  font-size: 2em;
  color: #7cd89d;
  font-weight: 300;
  margin: 0;
  letter-spacing: 5px;
  text-transform: uppercase;
  border-bottom: 2px solid #7cd89d
}
.subtitle {
  font-weight: 400;
  color: #aaa;
  font-size: 0.9em;
  margin: 5px 0;
  text-align: center;
  letter-spacing: 2px;
  width: 260px;
}
.button {
  background: none;
  outline: none;
  border: none;
  padding: 10px 20px;
  font-size: 0.9em;
  color: #1ed760;
  border: 1px solid #1ed760;
  cursor: pointer;
  margin-top: 1.5em;
  transition: 0.3s ease all;
}
.button:hover {
  background-color: #1ed760;
  color: #fff;
}
.footer {
  font-size: 0.9em;
  text-align: center;
  margin-top: auto;
}
.footer a  {
  color: #333;
  text-decoration: none;
  font-weight: 400;
}
.footer a:hover {
  color: #666;
}
</style>
