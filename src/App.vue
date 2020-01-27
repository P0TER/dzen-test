<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <nav class="menu">
          <h1 class="header__title">GeoIP</h1>
          <LocaleDropdown/>
        </nav>
      </div>
    </header>
    <div class="container">
      <main class="main">
        <form class="form" @submit.prevent="fetch()">
          <label class="form__label" for="ip">{{$t('message.ip_address')}}</label>
          <input type="text"
                 id="ip"
                 v-model="ip"
                 v-mask="'###.###.##.##'"
                 placeholder="0.0.0.0"
                 :class="['form__input', $v.ip.$error ? 'form__input--error' : '', ip ? 'form__input--active' : '']">
          <button class="btn" type="submit">{{$t('message.get_information')}}</button>
        </form>
        <ResultTable/>
        <HistoryTable/>
      </main>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import  {ipAddress, required} from 'vuelidate/lib/validators';
import ResultTable from "@/components/ResultTable";
import HistoryTable from "@/components/HistoryTable";
import LocaleDropdown from "@/components/LocaleDropdown";

export default {
  name: 'app',
  data() {
    return {
      ip: '',
    }
  },
  validations: {
    ip: {
      ipAddress,
      required
    }
  },
  components: {
    ResultTable,
    HistoryTable,
    LocaleDropdown
  },
  computed: {
    ...mapState({
      location: "location",
      history: "history",
      error: "error"
    })
  },
  methods: {
    ...mapActions(['GET_LOCATION']),
    ...mapMutations(['CLEAR_HISTORY']),
    fetch() {
      this.$v.ip.$touch();
      if (this.$v.ip.$invalid) {
        return 0;
      }
      this.GET_LOCATION(this.ip);
    }
  },
}
</script>

<style lang="sass">
#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
.header
  background: #656BF2
  height: rem(48)
  padding: rem(12)
  &__title
    font-weight: 800
    font-size: rem(18)
    line-height: 25px
    color: #FFFFFF
  .menu
    display: flex
    flex-direction: row
    justify-content: center
    position: relative
    align-items: center
    .dropdown
      position: absolute
      right: 0
      top: 50%
      transform: translateY(-50%)
.main
  background: #FFFFFF
  box-shadow: 0 0 50px rgba(230, 230, 230, 0.8)
  padding: rem(45) rem(48) rem(48)
  margin: rem(57) 0
  overflow: auto
  .btn
    margin-top: rem(18)
.title
  font-size: 18px
  line-height: 25px
  text-align: left
.history, .result
  margin-top: rem(48)
</style>
