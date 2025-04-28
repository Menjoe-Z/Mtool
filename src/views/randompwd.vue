<template>
  <a-space direction="vertical" :size="16" style="display: block;">
    <a-row :gutter="24">
      <a-col :span="3">
        <div></div>
      </a-col>
      <a-col :span="18">
        <a-card :title="$t('password.length')" :bordered="true">
          <div class="slider-container">
            <span></span>
            <a-slider v-model="length" :min="4" :max="20" show-input />
          </div>
        </a-card><br/>
        <a-card :title="$t('password.format')" :bordered="true">
          <div >
            <a-space>
              <a-typography-text>{{$t('password.format.number')}}:</a-typography-text>
              <a-switch size="medium" v-model="includeNumbers"></a-switch>
              <a-typography-text></a-typography-text>
              <a-typography-text>{{$t('password.format.symbol')}}:</a-typography-text>
              <a-switch size="medium" v-model="includeSymbols"></a-switch>
            </a-space>
          </div>
        </a-card><br/>
        <a-card :title="$t('password.generated')" :bordered="true">
          <a-typography-title :heading="6"></a-typography-title>
          <a-input v-model="generatedPassword" readonly size="large" />
        </a-card><br/>
        <a-card :bordered="true">
          <a-space>
            <a-button type="primary" @click="copyPassword">{{$t('password.copy')}}</a-button>
            <a-button @click="generatePassword">{{$t('password.refresh')}}</a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </a-space>
</template>

<script setup>
import { ref } from "vue";
import {Message } from "@arco-design/web-vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// 绑定数据
const length = ref(15);
const includeNumbers = ref(true);
const includeSymbols = ref(true);
const generatedPassword = ref("");

// 密码生成逻辑
const generatePassword = () => {
  let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeNumbers.value) charset += "0123456789";
  if (includeSymbols.value) charset += "!@#$%^&*()-_=+";

  let password = "";
  for (let i = 0; i < length.value; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  generatedPassword.value = password;
};

// 复制密码
const copyPassword = () => {
  navigator.clipboard.writeText(generatedPassword.value);
  Message.info(`${t('copied')}!`)
  generatePassword();
};

// 初始化
generatePassword();
</script>

<style scoped>
</style>
