<template>
  <a-space direction="vertical" :size="16" style="display: block;">
    <a-row :gutter="24">
      <a-col :span="3">
        <div></div>
      </a-col>
      <a-col :span="18">
        <a-card title="当前时间">
          <a-space>
            <a-typography-text strong>当前时区:</a-typography-text>
            <a-select v-model="selectedTimezone" placeholder="请选择时区">
              <a-option v-for="tz in timezones" :key="tz" :value="tz">
                {{ tz }}
              </a-option>
            </a-select>
            <a-button size="medium" @click="currentTz">当前</a-button>
          </a-space>
          <br/><br/>
          <a-space>
            <a-typography-text strong>当前的Unix时间戳:</a-typography-text>
            <a-input :model-value="currentTs" />
            <a-button size="medium" @click="startCurrentTs">开始</a-button>
            <a-button size="medium" @click="stopCurrentTs">停止</a-button>
            <a-button size="medium" @click="refreshCurrentTs">刷新</a-button>
          </a-space>
        </a-card>
        <br/>
        <a-card title="时间戳转时间（Unix timestamp）">
          <a-space>
            <a-typography-text strong>毫秒:</a-typography-text>
            <a-input v-model="tsToTimeMillSecondOrigin" placeholder="输入你的值..." />
            <a-input v-model="tsToTimeMillSecondDist" placeholder="结果在这里展示" />
            <a-button size="medium" type="primary" @click="doTsToTimeMillSecond">转换</a-button>
            <a-button size="medium" @click="copyTsToTimeMillSecond">复制</a-button>
          </a-space>
          <br/><br/>
          <a-space>
            <a-typography-text strong>&nbsp;&nbsp;&nbsp;秒:</a-typography-text>
            <a-input v-model="tsToTimeSecondOrigin" placeholder="输入你的值..." />
            <a-input v-model="tsToTimeSecondDist" placeholder="结果在这里展示" />
            <a-button size="medium" type="primary" @click="doTsToTimeSecond">转换</a-button>
            <a-button size="medium" @click="copyTsToTimeSecond">复制</a-button>
          </a-space>
        </a-card>
        <br/>
        <a-card title="时间转时间戳（年-月-日 时:分:秒）">
          <a-space>
            <a-typography-text strong>毫秒:</a-typography-text>
            <a-input v-model="timeToTsMillSecondOrigin" placeholder="输入你的值..." />
            <a-input v-model="timeToTsMillSecondDist" placeholder="结果在这里展示" />
            <a-button size="medium" type="primary" @click="doTimeToTsMillSecond">转换</a-button>
            <a-button size="medium" @click="copyTimeToTsMillSecond">复制</a-button>
          </a-space>
          <br/><br/>
          <a-space>
            <a-typography-text strong>&nbsp;&nbsp;&nbsp;秒:</a-typography-text>
            <a-input v-model="timeToTsSecondOrigin" placeholder="输入你的值..." />
            <a-input v-model="timeToTsSecondDist" placeholder="结果在这里展示" />
            <a-button size="medium" type="primary" @click="doTimeToTsSecond">转换</a-button>
            <a-button size="medium" @click="copyTimeToTsSecond">复制</a-button>
          </a-space>
        </a-card>
      </a-col>
      <a-col :span="1">
        <div></div>
      </a-col>
    </a-row>
  </a-space>
</template>

<script setup lang="ts">

import {onUnmounted, ref} from "vue";
import {Message} from "@arco-design/web-vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

/** 【start】公共模块*/
onUnmounted(() => {
  stopCurrentTs()
});

dayjs.extend(utc);
dayjs.extend(timezone);
const toTimestampIntl = (dateString, timeZone) => {
  return dayjs.tz(dateString, "YYYY-MM-DD HH:mm:ss", timeZone).valueOf();
}

const formatDateIntl = (timestamp: number, timeZone : string) => {
  return dayjs(Number(timestamp)).tz(timeZone).format("YYYY-MM-DD HH:mm:ss");
}
/** 【end】公共模块*/

/** 【start】展示和选择时区*/
const timezones = Intl.supportedValuesOf
    ? Intl.supportedValuesOf("timeZone") // 现代浏览器
    : ["UTC", "America/New_York", "Europe/London", "Asia/Shanghai", "Asia/Tokyo", "Australia/Sydney"]; // 兼容性方案
// 默认时区
const selectedTimezone = ref(Intl.DateTimeFormat().resolvedOptions().timeZone);
const currentTz = () => {
  selectedTimezone.value = Intl.DateTimeFormat().resolvedOptions().timeZone
}
/** 【end】展示和选择时区*/

/** 【start】刷新当前时间*/
const currentTs = ref(Date.now())
let timer = null;
const startCurrentTs = () => {
  stopCurrentTs()
  timer = setInterval(() => {
    currentTs.value = Date.now();
  }, 500);
}
const stopCurrentTs = () => {
  if (timer != null) {
    clearInterval(timer)
  }
}
const refreshCurrentTs = () => {
  stopCurrentTs()
  currentTs.value = Date.now()
}
/**【end】刷新当前时间*/

/** 【start】号秒转时间*/
const tsToTimeMillSecondOrigin = ref<number>()
const tsToTimeMillSecondDist = ref<string>('')
const doTsToTimeMillSecond = () => {
  if (tsToTimeMillSecondOrigin.value == null) {return}
  tsToTimeMillSecondDist.value = formatDateIntl(tsToTimeMillSecondOrigin.value, selectedTimezone.value)
}
const copyTsToTimeMillSecond = () => {
  if (!tsToTimeMillSecondDist.value) {return}
  navigator.clipboard.writeText(tsToTimeMillSecondDist.value).then(() => {
    Message.info('复制成功!')
  }).catch(err => {console.error("Copy failed:", err);});
}
/** 【end】号秒转时间*/

/** 【start】秒转时间*/
const tsToTimeSecondOrigin = ref()
const tsToTimeSecondDist = ref('')
const doTsToTimeSecond = () => {
  if (tsToTimeSecondOrigin.value == null) {return}
  tsToTimeSecondDist.value = formatDateIntl(tsToTimeSecondOrigin.value * 1000, selectedTimezone.value)
}
const copyTsToTimeSecond = () => {
  if (!tsToTimeSecondDist.value) {return}
  navigator.clipboard.writeText(tsToTimeSecondDist.value).then(() => {
    Message.info('复制成功!')
  }).catch(err => {console.error("Copy failed:", err);});
}
/**【end】秒转时间*/

/** 【start】时间转毫秒*/
const timeToTsMillSecondOrigin = ref('')
const timeToTsMillSecondDist = ref()
const doTimeToTsMillSecond = () => {
  if (!timeToTsMillSecondOrigin.value) {return}
  timeToTsMillSecondDist.value = toTimestampIntl(timeToTsMillSecondOrigin.value, selectedTimezone.value)
}
const copyTimeToTsMillSecond = () => {
  if (!timeToTsMillSecondDist.value) {return}
  navigator.clipboard.writeText(timeToTsMillSecondDist.value).then(() => {
    Message.info('复制成功!')
  }).catch(err => {console.error("Copy failed:", err);});
}
/** 【end】时间转毫秒*/

/** 【start】时间转秒*/
const timeToTsSecondOrigin = ref('')
const timeToTsSecondDist = ref()
const doTimeToTsSecond = () => {
  if (!timeToTsSecondOrigin.value) {return}
  timeToTsSecondDist.value = toTimestampIntl(timeToTsSecondOrigin.value, selectedTimezone.value) / 1000
}
const copyTimeToTsSecond = () => {
  if (!timeToTsSecondDist.value) {return}
  navigator.clipboard.writeText(timeToTsSecondDist.value).then(() => {
    Message.info('复制成功!')
  }).catch(err => {console.error("Copy failed:", err);});
}
/** 【end】时间转秒*/


</script>

<style scoped>
</style>
