<template>
  <a-layout>
    <a-layout-header>
<!--        <Header/>-->
      <Menu/>
    </a-layout-header>
    <a-layout>
<!--        <a-layout-sider :resize-directions="['right']"></a-layout-sider>-->
      <a-layout-content>
      </a-layout-content>
    </a-layout>
<!--      <a-layout-footer>Footer</a-layout-footer>-->
  </a-layout>
</template>
<script setup lang="ts">
import Menu from "./menu.vue";
</script>
