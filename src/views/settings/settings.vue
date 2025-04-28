<template>
  <a-drawer
      :title="$t('settings')"
      :width="400"
      placement="right"
      v-model:visible="innerVisible"
      @ok="handleOk"
      @cancel="handleCancel"
      :unmount-on-close="true"
      :closable="true"
      :hideCancel="true"
      :footer="true">
    <a-space direction="vertical" fill>
      <a-row>
        <a-col :span="5"></a-col>
        <a-col :span="12"><img :src="logo" width="200"/></a-col>
      </a-row>
      <a-card :title="$t('language')">
        <language/>
      </a-card>
      <a-card :title="$t('about')">
        <about/>
      </a-card>
    </a-space>
  </a-drawer>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import Language from "./language.vue";
import About from "./about.vue";
import logo from "../../assets/icon.png";

const props = defineProps({
  visible: Boolean
})
// 创建一个可写的 computed，用于和 v-model 对接
const innerVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})
const emit = defineEmits(['update:visible'])

function handleOk() {
  innerVisible.value = false
}

function handleCancel() {
  innerVisible.value = false
}

</script>
