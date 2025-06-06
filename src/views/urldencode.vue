<template>
    <a-space direction="vertical" :size="16" style="display: block;">
        <a-row :gutter="24">
            <a-col :span="3">
            <div></div>
            </a-col>
            <a-col :span="18">
                <a-card :title="$t('urldencode.input')" :bordered="true">
                    <a-textarea v-model="form.input" :auto-size="{ minRows: 6, maxRows: 8 }" />
                </a-card><br/>
                <a-card :title="$t('urldencode.output')" :bordered="true">
                    <a-textarea v-model="form.output" :auto-size="{ minRows: 6, maxRows: 8 }" />
                </a-card><br/>
                <a-card title="" :bordered="true">
                    <a-space>
                    <a-button type="primary" @click="encodeUrl">{{ $t('urldencode.encode') }}</a-button>
                    <a-button type="primary" status="success" @click="decodeUrl">{{ $t('urldencode.decode') }}</a-button>
                    <a-button type="outline" @click="swap">{{ $t('urldencode.swap') }}</a-button>
                    <a-button @click="copyToClipboard">{{ $t('copy') }}</a-button>
                    </a-space>
                </a-card>
            </a-col>
        </a-row>
    </a-space>
</template>

<script setup>
import { reactive } from 'vue'
import {Message } from "@arco-design/web-vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const form = reactive({
  input: '',
  output: '',
  encoding: 'utf-8',
})

const encodeUrl = () => {
  try {
    form.output = encodeURIComponent(form.input)
  } catch (err) {
    form.output = '编码失败'
  }
}

const decodeUrl = () => {
  try {
    form.output = decodeURIComponent(form.input)
  } catch (err) {
    form.output = '解码失败'
  }
}

const swap = () => {
  const temp = form.input
  form.input = form.output
  form.output = temp
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(form.output);
  Message.info(`${t('copied')}!`)
};

</script>

<style scoped>
</style>
