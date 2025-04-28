<template>
  <a-space direction="vertical" :size="16" style="display: block;">
    <a-row :gutter="24">
      <a-col :span="3"></a-col>
      <a-col :span="18">
        <a-card :title="$t('md5.plaintext')" :bordered="true">
            <a-textarea v-model="text" :placeholder="$t('md5.pleaseInput')" :auto-size="{ minRows: 4, maxRows: 8 }"/>
        </a-card><br/>
        <a-card :title="$t('settings')" :bordered="true">
          <a-space direction="horizontal" fill>
            <a-span>
              <a-space align="center">
                <a-typography-text>{{ $t('md5.hmacKey') }}:</a-typography-text>
                <a-input style="width: 380px;" v-model="hmacKey" :placeholder="$t('md5.hmacKey.placeholder')" allow-clear/>
              </a-space>
            </a-span>
            <a-span>
              <a-space align="center">
                <a-typography-text>{{ $t('md5.uppercase') }}:</a-typography-text>
                <a-checkbox size="large" v-model="toUpperCase"></a-checkbox>
              </a-space>
            </a-span>

          </a-space>
        </a-card><br/>
        <a-card :title="$t('md5.result')" :bordered="true">
          <a-input v-model="result" readonly size="large" :placeholder="$t('md5.result.placeholder')"/>
        </a-card><br/>
        <a-card title="" :bordered="true">
          <div class="flex gap-4">
            <a-button type="primary" @click="handleEncrypt">{{ $t('md5.encrypt') }}</a-button>
            <a-button @click="handleClear">{{ $t('clean') }}</a-button>
            <a-button @click="copyEncrypt">{{ $t('copy') }}</a-button>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </a-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MD5 from 'crypto-js/md5';
import HmacMD5 from 'crypto-js/hmac-md5';
import {Message} from "@arco-design/web-vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


// 定义类型
const text = ref<string>('')           // 输入内容
const hmacKey = ref<string>('')         // 盐值
const toUpperCase = ref<boolean>(false)  // 是否转大写
const result = ref<string>('')          // 加密结果

// 执行加密
const handleEncrypt = (): void => {
  if (!text.value) {
    result.value = ''
    return
  }
  const encrypted: string = hmacKey.value
      ? HmacMD5(text.value, hmacKey.value).toString()
      : MD5(text.value).toString()

  result.value = toUpperCase.value ? encrypted.toUpperCase() : encrypted.toLowerCase()
}

// 清空内容
const handleClear = (): void => {
  text.value = ''
  hmacKey.value = ''
  result.value = ''
}


const copyEncrypt = () => {
  navigator.clipboard.writeText(result.value);
  Message.info(`${t('copied')}!`)
};

</script>

<style scoped>
.flex {
  display: flex;
}
.gap-4 {
  gap: 16px;
}
</style>
