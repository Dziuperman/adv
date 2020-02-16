import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import MultiFiltersPlugin from './plugins/MultiFilters'

// CSS
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false;

Vue.use(MultiFiltersPlugin);

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app');
