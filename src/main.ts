import { createApp } from "vue";
import ArcoVue from '@arco-design/web-vue';
import App from "./App.vue";
import '@arco-design/web-vue/dist/arco.css';
import { createI18n } from 'vue-i18n';
import zhCN from './locale/zh-CN';
import enUS from './locale/en-US';


const messages = {
    'zh-CN': zhCN,
    'en-US': enUS,
};

const i18n = createI18n({
    locale: 'zh-CN',
    messages,
});

const app = createApp(App);
app.use(ArcoVue);
app.use(i18n)
app.mount('#app');
