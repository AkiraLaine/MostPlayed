<template>
  <div class='wrapper'>
    <div class='content'>
      <h1 class='title'>MostPlayed</h1>
      <h4 class='subtitle'>Find out what your most played Spotify artists and tracks are.</h4>
      <button class='button' @click='login()'>Get Started!</button>
    </div>
    <div class='footer'>
      <p style="font-weight:300">Made with passion and music</p>
      <p style="font-weight:300">by <a href="https://akiralaine.github.io">Akira Laine</a> | <a href="https://github.com/AkiraLaine">GitHub</a></p>
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
  background: #7CD89D;
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
  color: #fff;
  font-weight: 300;
  margin: 0 0 10px 0;
  letter-spacing: 5px;
  text-transform: uppercase;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff
}
.subtitle {
  font-weight: 400;
  color: #eee;
  font-size: 0.9em;
  text-align: center;
  letter-spacing: 2px;
}
.button {
  background: none;
  outline: none;
  border: none;
  padding: 15px 35px;
  font-size: 0.9em;
  color: #eee;
  background-color: #1ED760;
  cursor: pointer;
  margin-top: 2em;
  transition: 0.3s ease all;
  box-shadow: 5px 5px 15px 0 rgba(0,0,0,0.3);
}
.footer {
  font-size: 0.9em;
  text-align: center;
  margin-top: auto;
  margin-bottom: 10px;
}
.footer a  {
  color: #eee;
  text-decoration: none;
  font-weight: 400;
}
.footer a:hover {
  color: #fff;
}
</style>
