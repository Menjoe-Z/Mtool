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
            <a-textarea v-model="originText" :placeholder="$t('strbreak.input.placeholder')"/>
          </a-typography-paragraph>
        </template>
        <template #second>
          <a-typography-paragraph style="height: 100%; margin: 0; display: flex;">
            <a-textarea :model-value="distText" :placeholder="$t('strbreak.output.placeholder')"/>
          </a-typography-paragraph>
        </template>
      </a-split>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="6"></a-col>
    <a-col :span="18">
      <a-space>
        <a-typography-text>{{$t('strbreak.separator.label')}}: </a-typography-text>
        <a-select v-model="textSeparator"
                  :placeholder="$t('strbreak.separator.placeholder')"
                  :allow-search="{ retainInputValue: true }"
                  v-model:input-value="newTextSeparator"
                  style="width: 270px;" allow-clear>
          <a-option value=" ">{{$t('strbreak.separator.space')}}</a-option>
          <a-option value="\t">{{$t('strbreak.separator.tab')}}</a-option>
          <a-option value=",">{{$t('strbreak.separator.comma')}}</a-option>
          <a-option value=";">{{$t('strbreak.separator.semicolon')}}</a-option>
          <a-option value="。">{{$t('strbreak.separator.period')}}</a-option>
          <a-option value="\.">{{$t('strbreak.separator.dot')}}</a-option>
          <a-option value="\(">{{$t('strbreak.separator.brackets')}}(</a-option>
          <a-option value="\)">{{$t('strbreak.separator.brackets')}})</a-option>
        </a-select>
        <a-button @click="formatJson" type="primary">{{ $t('format') }}</a-button>
        <a-button @click="clearJson">{{ $t('clean') }}</a-button>
        <a-button @click="copyToClipboard">{{ $t('copy') }}</a-button>
      </a-space>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">

import {ref} from "vue";
import {Message, Modal} from "@arco-design/web-vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

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
    const errorMessage = e instanceof Error ? e.message : t('strbreak.error');
    Modal.error({
      title: t('error.alert'),
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
    Message.info(`${t('copied')}!`)
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
