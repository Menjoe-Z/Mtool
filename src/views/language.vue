<template>
  <a-button @click="changeLanguage('en-US')">Switch to English</a-button>
  <a-button @click="changeLanguage('zh-CN')">切换到中文</a-button>
</template>
<script setup lang="ts">
import useLocale from "../hooks/locale";

const { changeLocale } = useLocale();
function changeLanguage(lang: string) {
  changeLocale(lang);
}
</script>
