<template>
  <div class="result">
    <h2 class="title">Result</h2>
    <table class="table">
      <thead class="table__head">
      <tr>
        <th>{{$t('message.table.ip_address')}}</th>
        <th>{{$t('message.table.continent')}}</th>
        <th>{{$t('message.table.country')}}</th>
        <th>{{$t('message.table.city')}}</th>
        <th>{{$t('message.table.postcode')}}</th>
        <th>{{$t('message.table.coordinates')}}</th>
      </tr>
      </thead>
      <tbody class="table__body" v-if="location.ip">
      <tr>
        <td>
          {{location.ip}}
        </td>
        <td>
          {{continentName}}/{{location.continent ? location.continent.code : '—'}}
        </td>
        <td>
          {{countryName}}/{{location.country ? location.country.iso_code : '—'}}
        </td>
        <td>
          {{cityName}}
        </td>
        <td>
          {{location.postal ? location.postal.code : '—' }}
        </td>
        <td>
          {{location.location ? location.location.latitude : '—'}}/{{location.location ? location.location.longitude : '—'}}
        </td>
      </tr>
      </tbody>
      <tbody class="table__body table__body--empty" v-else>
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
  import {mapState, mapGetters} from 'vuex';

  export default {
    name: "ResultTable",
    computed: {
      ...mapGetters({
        countryName: "getCountryName",
        continentName: "getContinentName",
        cityName: "getCityName"
      }),
      ...mapState({
        location: "location"
      })
    },
  }
</script>

<style scoped lang="sass">
  .result
    .table
      width: 100%
</style>