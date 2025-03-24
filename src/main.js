// main.js
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import './assets/css/tailwind.css';

// Create the app and mount it
const app = createApp(App);
app.use(store);
app.mount('#app');