import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import VueQrcode from "@chenfengyuan/vue-qrcode";
Vue.config.productionTip = false;
Vue.component(VueQrcode.name, VueQrcode);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
