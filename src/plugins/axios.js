import axios from 'axios'
axios.defaults.baseURL = 'http://3.232.244.22/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default Vue => Vue.provide('$axios', axios);