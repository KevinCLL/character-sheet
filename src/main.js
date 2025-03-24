// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/main.css';

// Create the app and mount it
const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');