<template>
  <a-config-provider :locale="arcoLocale" size="small">
    <a-tabs
        type="line"
        lazy-load="true"
        destroy-on-hide="true"
        justify="true"
        animation="true">
      <template #extra>
          <a-button type="text" style="color:#51558f;font-size: 20px;"  @click="showSettings = true"><IconSettings /></a-button>
      </template>
      <a-tab-pane key="1" :title="$t('json.title')">
        <Json/>
      </a-tab-pane>
      <a-tab-pane key="2" :title="$t('time.title')">
        <timestamp/>
      </a-tab-pane>
      <a-tab-pane key="3" :title="$t('password.title')">
        <RandomPwd/>
      </a-tab-pane>
      <a-tab-pane key="4" :title="$t('strbreak.title')">
        <Strbreak/>
      </a-tab-pane>
      <a-tab-pane key="5" :title="$t('md5.title')">
        <md5/>
      </a-tab-pane>
      <a-tab-pane key="6" :title="$t('urldencode.title')">
        <Urldencode/>
      </a-tab-pane>
    </a-tabs>
    <Settings v-model:visible="showSettings" />
  </a-config-provider>
</template>
<script setup lang="ts">
import Json from "./json.vue";
import Timestamp from "./timestamp.vue";
import RandomPwd from "./randompwd.vue";
import Strbreak from "./strbreak.vue";
import Settings from "./settings/settings.vue";

import { IconSettings } from '@arco-design/web-vue/es/icon';
import {computed, ref} from "vue";
import zhCN from "@arco-design/web-vue/es/locale/lang/zh-cn";
import enUS from "@arco-design/web-vue/es/locale/lang/en-us";
import {useI18n} from "vue-i18n";
import Md5 from "./md5.vue";
import Urldencode from "./urldencode.vue";

const { locale} = useI18n();
const arcoLocale = computed(() => {
  return locale.value === 'zh-CN' ? zhCN : enUS;
});

const showSettings = ref(false)

</script>

<style scoped>
</style>
