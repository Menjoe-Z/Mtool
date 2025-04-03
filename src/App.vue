<script setup lang="ts">
import Menu from "./views/menu.vue";
import useLocale from "./hooks/locale.ts";
const { currentLocale} = useLocale();
console.log("当前语言:", currentLocale.value);
</script>
<template>
  <Menu/>
</template>

