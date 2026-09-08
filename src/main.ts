// External imports
import { createApp } from 'vue';

// Internal imports
import './assets/main.css';
import App from './App.vue';
import PiniaConfig from './PiniaConfig';
import router from './router';

const app = createApp(App);

app.use(PiniaConfig.init());
app.use(router);

app.mount('#app');
