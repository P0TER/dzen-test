<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
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
        <tbody class="result__body" v-if="getLocation">
        <tr>
          <td>
            {{fetchIp}}
          </td>
          <td>
            {{getLocation.continent.names.en}}/{{getLocation.continent.code}}
          </td>
          <td>
            {{getLocation.country.names.en}}/{{getLocation.country.iso_code}}
          </td>
          <td>
            {{getLocation.city ? getLocation.city.names.en : '-'}}
          </td>
          <td>
            {{ getLocation.postal ? getLocation.postal.code : '-' }}
          </td>
          <td>
            {{getLocation.location.latitude}}/{{getLocation.location.longitude}}
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
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import getLocation from './graphql/getLocation.graphql';
// import {mapState, mapActions} from 'vuex';

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data() {
    return {
      ip: '176.37.164.13',
      fetchIp: '',
      skipQuery: true
    }
  },
  computed: {
    // ...mapState({
    //   location: "location"
    // })
  },
  apollo: {
    getLocation: {
      query: getLocation,
      variables() {
        return {
          ip: this.ip,
        }
      },
      skip() {
        return this.skipQuery
      },
      update (data) {
        this.skipQuery = true;
        return data.getLocation;
      },
    }
  },
  methods: {
    // ...mapActions(['GET_LOCATION']),
    fetch() {
      // this.GET_LOCATION(this.ip);
      this.fetchIp = this.ip;
      this.skipQuery = false;
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
