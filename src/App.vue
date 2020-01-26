<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <form @submit.prevent="fetch()">
      <label for="ip">IP Address</label>
      <input type="text" id="ip" v-model="ip">
      <button class="btn" type="submit">Get information</button>
    </form>
    <h2>Result</h2>
      <table class="result">
        <thead class="result__head">
          <tr>
            <td>IP address</td>
            <td>Continent/code</td>
            <td>Country/code</td>
            <td>City</td>
            <td>Postcode</td>
            <td>Coordinates</td>
          </tr>
        </thead>
        <tbody class="result__body" v-if="location.ip">
          <tr>
            <td>
              {{location.ip}}
            </td>
            <td>
              {{location.continent.names.en}}/{{location.continent.code}}
            </td>
            <td>
              {{location.country.names.en}}/{{location.country.iso_code}}
            </td>
            <td>
              {{location.city ? location.city.names.en : '-'}}
            </td>
            <td>
              {{ location.postal ? location.postal.code : '-' }}
            </td>
            <td>
              {{location.location.latitude}}/{{location.location.longitude}}
            </td>
          </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td>
            0.0.0.0
          </td>
          <td/>
          <td/>
          <td/>
          <td/>
          <td/>
        </tr>
        </tbody>
      </table>
    <h2>History</h2>
    <table class="result">
      <thead class="result__head">
      <tr>
        <td>IP address</td>
        <td>Country/code</td>
        <td>City</td>
      </tr>
      </thead>
      <tbody class="result__body" v-if="history.length">
      <tr v-for="(item, index) in history" :key="index">
        <td>
          {{item.ip}}
        </td>
        <td>
          {{item.location.country.names.en}}/{{item.location.country.iso_code}}
        </td>
        <td>
          {{item.location.city ? item.location.city.names.en : '-'}}
        </td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr>
        <td>
          0.0.0.0
        </td>
        <td/>
        <td/>
      </tr>
      </tbody>
    </table>
    <button @click="clearHistory">Clear history</button>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      ip: '176.37.164.13',
    }
  },
  computed: {
    ...mapState({
      location: "location",
      history: "history"
    })
  },
  methods: {
    ...mapActions(['GET_LOCATION']),
    ...mapMutations(['CLEAR_HISTORY']),
    fetch() {
      this.GET_LOCATION(this.ip);
    },
    clearHistory() {
      this.CLEAR_HISTORY();
    }
  },
}
</script>

<style lang="sass">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
.result
  width: 100%
  text-align: center
  border-collapse: collapse
  td
    padding: 12px
  tr, td
    border: 1px solid black
  &__head
    background: rgba(243, 244, 245, 0.2)
    border: 1px solid black
</style>
