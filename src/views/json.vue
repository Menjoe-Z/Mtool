<template>
  <a-row :gutter="24" style="height: 84vh;">
    <a-col :span="24" style="height: 83vh;">
      <a-split
          :style="{ height: '83vh', width: '100%', minWidth: '500px', border: '1px solid var(--color-border)' }"
          direction="horizontal"
          :min="0.2"
          :max="0.8"
      >
        <template #first>
          <a-typography-paragraph style="height: 100%; margin: 0; display: flex;">
            <a-textarea v-model="originJson" placeholder="输入原始文本..."/>
          </a-typography-paragraph>
        </template>
        <template #second>
          <a-typography-paragraph style="height: 100%; margin: 0; display: flex;">
            <a-textarea :model-value="distJson" placeholder="格式化后的json"/>
          </a-typography-paragraph>
        </template>
      </a-split>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="16"></a-col>
    <a-col :span="6">
      <a-space>
        <a-button @click="formatJson" type="primary">格式</a-button>
        <a-button @click="clearJson">清除</a-button>
        <a-button @click="copyToClipboard">复制</a-button>
      </a-space>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">

import {ref} from "vue";
import {Message, Modal} from "@arco-design/web-vue";

const originJson = ref('')
const distJson = ref('')

const formatJson = () => {
  let tempJson = originJson.value
  if (!tempJson) {
    return;
  }
  let jsonParse = null;
  try {
    jsonParse = JSON.parse(tempJson)
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "JSON 解析失败";
    Modal.error({
      title: "错误提示",
      content: errorMessage,
    });
    return;
  }
  distJson.value = JSON.stringify(jsonParse, null, 2)
}

const copyToClipboard = () => {
  if (!distJson.value) {
    return
  }
  navigator.clipboard.writeText(distJson.value).then(() => {
    Message.info('复制成功!')
  }).catch(err => {
    console.error("Copy failed:", err);
  });
}

const clearJson = () => {
  originJson.value = ''
  distJson.value = ''
}

</script>
<style scoped>
.split-container {
  height: 85vh;
  width: 100%;
  min-width: 500px;
}
</style>
