import axios from 'axios'
axios.defaults.baseURL = 'http://3.232.244.22/api/';

export default Vue => Vue.provide('$axios', axios);