import Vue from 'vue'
import App from './App.vue'
import VueTableDynamic from 'vue-table-dynamic'

Vue.use(VueTableDynamic);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
