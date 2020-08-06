import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import LoadScript from "vue-plugin-load-script";
import VueI18n from "vue-i18n";
import { messages } from "./i18n/messages";
Vue.use(LoadScript);
Vue.use(VueI18n);
Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: "it-IT",
  messages
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
