import Vue from 'vue';
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

import en from './locales/en'

const i18n = new VueI18n({
  locale   : 'en',
  fallbackLocale: 'en', // use if translation is not exists
  messages : {
    en
  },
  formatFallbackMessages: true,
});

const locales = ['ru', 'en'];
export default i18n;
export const defaultLocale = i18n.locale;
export const supportedLanguages =  locales;