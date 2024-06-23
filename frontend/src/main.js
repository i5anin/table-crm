import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css'; // Используйте reset.css для стилей

const app = createApp(App);
app.use(Antd);
app.mount('#app');