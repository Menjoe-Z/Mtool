<template>
  <a-space>
    <a-radio-group v-model="currentLocale" type="button" @change="changeLanguage">
      <a-radio value="zh-CN">中文</a-radio>
      <a-radio value="en-US">English</a-radio>
    </a-radio-group>
  </a-space>
</template>
<script setup lang="ts">
import useLocale from "../../hooks/locale";

const { changeLocale, currentLocale } = useLocale();
function changeLanguage(lang: string) {
  changeLocale(lang);
}
</script>
