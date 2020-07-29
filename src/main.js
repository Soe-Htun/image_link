import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//import table from '../src/components/table'
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  //table,
  render: h => h(App)
}).$mount('#app')
