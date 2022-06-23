// #ifndef VUE3
import Vue from "vue";
import App from "./App";
import { showMsg } from "utils/index.js";
import $http from "utils/ajax.js";
import store from "./store/store";

uni.$http = $http;
uni.$showMsg = showMsg;
Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
  store
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app
  };
}
// #endif
