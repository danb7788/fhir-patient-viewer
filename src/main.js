import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

window.moment = require('dayjs/dayjs.min');
const moment = window.moment;
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone'); // dependent on utc plugin
moment.extend(utc);
moment.extend(timezone);

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })
Vue.use(BootstrapVue)
Vue.use(moment)

new Vue({
  render: h => h(App),
}).$mount('#fhir-visualizer')
