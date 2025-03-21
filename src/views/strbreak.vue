<template>
  <a-row :gutter="24" style="height: 83vh;">
    <a-col :span="24" style="height: 82vh;">
      <a-split
          :style="{ height: '82vh', width: '100%', minWidth: '500px', border: '1px solid var(--color-border)' }"
          direction="horizontal"
          :min="0.2"
          :max="0.8"
      >
        <template #first>
          <a-typography-paragraph style="height: 100%; margin: 0; display: flex;">
            <a-textarea v-model="originText" placeholder="输入原始文本..."/>
          </a-typography-paragraph>
        </template>
        <template #second>
          <a-typography-paragraph style="height: 100%; margin: 0; display: flex;">
            <a-textarea :model-value="distText" placeholder="格式化后的文本"/>
          </a-typography-paragraph>
        </template>
      </a-split>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="8"></a-col>
    <a-col :span="16">
      <a-space>
        <a-typography-text>分隔符(支持正则): </a-typography-text>
        <a-select v-model="textSeparator"
                  placeholder="选择或者输入..."
                  :allow-search="{ retainInputValue: true }"
                  v-model:input-value="newTextSeparator"
                  style="width: 220px;" allow-clear>
          <a-option value=" ">空格</a-option>
          <a-option value="\t">制表符</a-option>
          <a-option value=",">逗号</a-option>
          <a-option value=";">分号</a-option>
          <a-option value="。">句号</a-option>
          <a-option value="\.">点</a-option>
          <a-option value="\(">括号(</a-option>
          <a-option value="\)">括号)</a-option>
        </a-select>
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

const originText = ref('')
const textSeparator = ref('')
const newTextSeparator = ref('')
const distText = ref('')

const formatJson = () => {
  let tempText = originText.value
  if (!tempText) {
    return;
  }
  let tempDistText = '';
  try {
    if (textSeparator.value === '') {
      textSeparator.value = newTextSeparator.value
    }
    const regex = new RegExp(textSeparator.value);
    let splitArr = tempText.split(regex);
    for (let i = 0; i < splitArr.length; i++) {
      tempDistText += splitArr[i] + '\n'
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "文本换行失败";
    Modal.error({
      title: "错误提示",
      content: errorMessage,
    });
    return;
  }
  distText.value = tempDistText
}

const copyToClipboard = () => {
  if (!distText.value) {
    return
  }
  navigator.clipboard.writeText(distText.value).then(() => {
    Message.info('复制成功!')
  }).catch(err => {
    console.error("Copy failed:", err);
  });
}

const clearJson = () => {
  originText.value = ''
  distText.value = ''
}

</script>
<style scoped>
.split-container {
  height: 85vh;
  width: 100%;
  min-width: 500px;
}
</style>
