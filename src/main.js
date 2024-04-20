import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './routes/index.js';
import axios from './plugins/axios.js';

const app = createApp(App);
app.use(router);
app.use(axios);
app.mount('#app');