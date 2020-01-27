<template>
  <div class="dropdown">
    <a @click="toggleMenu()" class="dropdown__toggle" :class="{active : showMenu}">
      <span class="dropdown__name">{{ currentLang }}</span>
      <span class="dropdown__caret" :class="{active : showMenu}"/>
    </a>
    <ul class="dropdown__menu" v-if="showMenu">
      <li v-for="option in langs" :key="option">
        <a href="javascript:void(0)" @click="updateLang(option)" :class="option === currentLang ? 'active' : ''">
          {{ option}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {supportedLanguages} from "@/localization";
import {mapState, mapMutations} from 'vuex';

export default {
  data () {
    return {
      langs: supportedLanguages,
      currentLang: 'en',
      showMenu: false
    }
  },
  computed: {
    ...mapState({
      lang: "lang"
    })
  },
  methods: {
    ...mapMutations(['UPDATE_LANG']),
    updateLang(lang) {
      this.currentLang = lang;
      this.showMenu = false;
      import(/* webpackChunkName: "locale-code" */`@/localization/locales/${lang}.json`)
        .then((msg) => {
          this.$i18n.setLocaleMessage(lang, msg);
          this.$i18n.locale = lang;
          this.UPDATE_LANG(lang);
        });
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  },
  mounted() {
    this.updateLang(this.lang);
  }
}
</script>

<style scoped lang="sass">
.dropdown
  position: relative
  li
    list-style: none
  &__name
    margin: 0 rem(10)
    text-transform: uppercase
    font-size: 18px
    line-height: 25px
  &__toggle
    font-size: rem(14)
    line-height: 1.4
    color: white
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    border: none
    cursor: pointer
    position: relative
    &:hover
      background: transparent
    &.active
      .dropdown__caret
        transform: rotateX(180deg) rotate3d(1, 0, 0, 45deg)
  &__caret
    display: inline-block
    transform: rotateX(0deg) rotate3d(1, 0, 0, 45deg)
    position: relative
    transition: all .3s
    transform-style: preserve-3d
    transform-origin: center
    width: 0
    height: 0
    border-left: 5px solid transparent
    border-right: 5px solid transparent
    border-top: 9px solid white
  &__label
    position: absolute
    pointer-events: none
    width: auto
    left: rem(16)
    bottom: rem(10)
    text-align: left
    font-size: 1rem
    font-weight: 400
    line-height: 1.5
    transition: transform 0.3s
    transform-origin: left
    &.active
      color: #636e7e
      transform: translate3d(-16px, -150%, 0) scale(0.875)
  &__menu
    position: absolute
    top: 100%
    width: auto
    right: -50%
    padding: rem(14) rem(15)
    z-index: 100
    border-radius: $borderRadius
    box-shadow: 0 12px 18px -3px #60483180
    background-color: white
    list-style: none
    font-size: rem(14)
    background-clip: padding-box
    overflow-y: auto
    text-align: left
    +media((width: (xs: 100%, md: auto)))
    & > li > a
      font-size: 18px
      line-height: 25px
      color: black
      text-decoration: none
      margin: rem(3)
      display: inline-block
      text-transform: uppercase
      &.active
        color: #656BF2
</style>
