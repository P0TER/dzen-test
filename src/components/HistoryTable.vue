<template>
  <div class="history">
    <h2 class="title">History</h2>
    <table class="table">
      <thead class="table__head">
      <tr>
        <th>{{$t('message.table.ip_address')}}</th>
        <th>{{$t('message.table.country')}}</th>
        <th>{{$t('message.table.city')}}</th>
      </tr>
      </thead>
      <tbody class="table__body" v-if="history.length">
      <tr v-for="(item, index) in history" :key="index">
        <td>
          {{item.ip}}
        </td>
        <td>
          {{countryName(index)}}/{{item.location.country ? item.location.country.iso_code : '—'}}
        </td>
        <td>
          {{cityName(index)}}
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
      </tr>
      </tbody>
    </table>
    <button class="btn" @click="clearHistory" :disabled="history.length === 0">{{$t('message.clear_history')}}</button>
  </div>
</template>

<script>
  import {mapMutations, mapState, mapGetters} from 'vuex';

  export default {
    name: "HistoryTable",
    computed: {
      ...mapState({
        history: "history"
      }),
      ...mapGetters(['getHistoryCountryName', 'getHistoryCityName'])
    },
    methods: {
      ...mapMutations(['CLEAR_HISTORY']),
      clearHistory() {
        this.CLEAR_HISTORY();
      },
      countryName(id) {
        return this.getHistoryCountryName(id);
      },
      cityName(id) {
        return this.getHistoryCityName(id);
      }
    }
  }
</script>

<style scoped lang="sass">
  .history
    text-align: left
    .table
      max-width: rem(398)
      width: 100%
      text-align: center
</style>