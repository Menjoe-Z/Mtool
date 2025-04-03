import { createApp } from "vue";
import ArcoVue from '@arco-design/web-vue';
import App from "./App.vue";
import '@arco-design/web-vue/dist/arco.css';
// import {createI18n} from "vue-i18n";
import i18n from "./hooks/locale";


const app = createApp(App);
app.use(ArcoVue);
app.use(i18n)
app.mount('#app');
