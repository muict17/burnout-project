import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import VueQrcodeReader from "vue-qrcode-reader";

Vue.config.productionTip = false;
Vue.component(VueQrcode.name, VueQrcode);
Vue.use(VueQrcodeReader);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
