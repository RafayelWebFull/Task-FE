import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
Vue.use(VueAxios, axios)

export default axios