<template>
  <div>
    <div class='top-bar'>
      <h1 class='title'>MostPlayed</h1>
      <div style="display:flex;align-items:center;margin-top:10px">
        <span class='tab' @click='activeTab = "monthly"' :class='{"active": activeTab === "monthly"}'>This Month</span>
        <span class='tab' @click='activeTab = "alltime"' :class='{"active": activeTab === "alltime"}'>All Time</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;justify-content:center;" v-if='activeTab === "monthly"'>
      <h2 class='header'>Most Played Songs</h2>
      <div class='container'>
        <div class='item' v-for='(track, index) in monthlyData.topTracks' :style='{"background-image": `url(${track.album.images[0].url})`}'>
          <div class='overlay'></div>
          <span class='item-num'>{{ index + 1 }}</span>
          <div class='item-details'>
            <div class='item-name'>{{ track.name }}</div>
            <div style="display:flex;justify-content:center">
              <div class='track-artist' v-for='(artist, index) in track.artists'>
                {{ artist.name }}{{ index !== track.artists.length - 1 ? ',&nbsp;' : '' }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 class='header'>Most Played Artists</h2>
      <div class='container'>
        <div class='item' v-for='(artist, index) in monthlyData.topArtists' :style='{"background-image": `url(${artist.images[0].url})`}'>
          <div class='overlay'></div>
          <span class='item-num'>{{ index + 1 }}</span>
          <div class='item-details'>
            <div class='item-name'>{{ artist.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;justify-content:center;" v-if='activeTab === "alltime"'>
      <h2 class='header'>Most Played Songs</h2>
      <div class='container'>
        <div class='item' v-for='(track, index) in allTimeData.topTracks' :style='{"background-image": `url(${track.album.images[0].url})`}'>
          <div class='overlay'></div>
          <span class='item-num'>{{ index + 1 }}</span>
          <div class='item-details'>
            <div class='item-name'>{{ track.name }}</div>
            <div style="display:flex;justify-content:center">
              <div class='track-artist' v-for='(artist, index) in track.artists'>
                {{ artist.name }}{{ index !== track.artists.length - 1 ? ',&nbsp;' : '' }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 class='header'>Most Played Artists</h2>
      <div class='container'>
        <div class='item' v-for='(artist, index) in allTimeData.topArtists' :style='{"background-image": `url(${artist.images[0].url})`}'>
          <div class='overlay'></div>
          <span class='item-num'>{{ index + 1 }}</span>
          <div class='item-details'>
            <div class='item-name'>{{ artist.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class='footer'>
      <p style="font-weight:300">Made with music</p>
      <p style="font-weight:300">by <a href="https://akiralaine.github.io">Akira Laine</a> | <a href="https://github.com/AkiraLaine">GitHub</a></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      monthlyData: {
        topTracks: {},
        topArtists: {}
      },
      allTimeData: {
        topTracks: {},
        topArtists: {}
      },
      activeTab: 'monthly'
    }
  },
  created () {
    const accessToken = window.location.hash.split('&')[0].split('=')[1]
    const lsAccessToken = window.localStorage.getItem('accessToken')
    window.localStorage.setItem('accessToken', accessToken || lsAccessToken)
    window.history.replaceState('', '', window.location.pathname)
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken || lsAccessToken}`
    this.getMonthlyData(accessToken || lsAccessToken)
    this.getAllTimeData(accessToken || lsAccessToken)
  },
  methods: {
    getMonthlyData (accessToken) {
      axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term')
        .then(data => {
          const items = data.data.items
          const ids = []
          items.forEach(track => {
            ids.push(track.id)
          })
          axios.get(`https://api.spotify.com/v1/tracks/?ids=${[...ids].toString()}`)
            .then(trackData => {
              this.monthlyData.topTracks = trackData.data.tracks
            })
        })

      axios.get('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=short_term')
        .then(data => {
          this.monthlyData.topArtists = data.data.items
        })
    },
    getAllTimeData (accessToken) {
      axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term')
        .then(data => {
          const items = data.data.items
          const ids = []
          items.forEach(track => {
            ids.push(track.id)
          })
          axios.get(`https://api.spotify.com/v1/tracks/?ids=${[...ids].toString()}`)
            .then(trackData => {
              this.allTimeData.topTracks = trackData.data.tracks
            })
        })

      axios.get('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=long_term')
        .then(data => {
          this.allTimeData.topArtists = data.data.items
        })
    }
  }
}
</script>

<style scoped>
.top-bar {
  width: 100%;
  height: 130px;
  background-color: #7CD89D;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  width: 260px;
  font-size: 2em;
  color: #fff;
  font-weight: 300;
  margin: 0 0 10px 0;
  letter-spacing: 5px;
  text-transform: uppercase;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff
}
.tab {
  color: #eee;
  margin-right: 10px;
  cursor: pointer;
}
.tab:hover {
  color: #fff;
}
.tab.active {
  color: #fff;
  font-weight: 600;
}
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.header {
  color: #1ED760;
  font-weight: 400;
  margin: 10px auto;
}
.item {
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 10px;
  background-size: cover;
  background-position: center;
  padding: 5px;
  box-sizing: border-box;
}
.item-num {
  font-size: 3em;
  color: #ddd;
  font-weight: 300;
  width: 55px;
  text-align: center;
  z-index: 10;
}
.item-details {
  margin-left: 1em;
}
.item-name {
  font-size: 1.5em;
  color: #eee;
  letter-spacing: 2px;
  z-index: 10;
  position: relative;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.track-artist {
  font-size: 0.8em;
  color: #ccc;
  letter-spacing: 1px;
  display: inline-block;
  z-index: 10;
  text-align: center;
}
.overlay {
  width: 100%;  
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.7);
  z-index: 1;
}
.footer {
  font-size: 0.9em;
  text-align: center;
  margin: 10px 0;
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
