<template>
  <a-space direction="vertical" :size="16" style="display: block;">
    <a-row :gutter="24">
      <a-col :span="3">
        <div></div>
      </a-col>
      <a-col :span="18">
        <a-card :title="$t('time.current')">
          <a-space align="baseline">
            <a-typography-text strong>{{$t('time.timezone')}}:</a-typography-text>
            <a-select v-model="selectedTimezone" :placeholder="$t('time.timezone.choice')">
              <a-option v-for="tz in timezones" :key="tz" :value="tz">
                {{ tz }}
              </a-option>
            </a-select>
            <a-button @click="currentTz">{{$t('time.timezone.now')}}</a-button>
          </a-space>
          <br/><br/>
          <a-space>
            <a-typography-text strong>{{$t('time.unix')}}:</a-typography-text>
            <a-input :model-value="currentTs" />
            <a-button @click="startCurrentTs">{{$t('time.start')}}</a-button>
            <a-button @click="stopCurrentTs">{{$t('time.stop')}}</a-button>
            <a-button @click="refreshCurrentTs">{{$t('time.refresh')}}</a-button>
          </a-space>
        </a-card>
        <br/>
        <a-card :title="$t('time.convert.unix')">
          <a-space align="baseline">
            <a-typography-text strong>{{$t('time.input.milliseconds')}}:</a-typography-text>
            <a-input v-model="tsToTimeMillSecondOrigin" :placeholder="$t('time.input.datetime')" />
            <a-input v-model="tsToTimeMillSecondDist" :placeholder="$t('time.result.placeholder')" />
            <a-button type="primary" @click="doTsToTimeMillSecond">{{$t('convert')}}</a-button>
            <a-button @click="copyTsToTimeMillSecond">{{$t('copy')}}</a-button>
          </a-space>
          <br/><br/>
          <a-space align="baseline">
            <a-typography-text strong>&nbsp;&nbsp;&nbsp;{{$t('time.input.seconds')}}:</a-typography-text>
            <a-input v-model="tsToTimeSecondOrigin" :placeholder="$t('time.input.datetime')" />
            <a-input v-model="tsToTimeSecondDist" :placeholder="$t('time.result.placeholder')" />
            <a-button type="primary" @click="doTsToTimeSecond">{{$t('convert')}}</a-button>
            <a-button @click="copyTsToTimeSecond">{{$t('copy')}}</a-button>
          </a-space>
        </a-card>
        <br/>
        <a-card :title="$t('time.convert.to.timestamp')">
          <a-space align="baseline">
            <a-typography-text strong>{{$t('time.input.milliseconds')}}:</a-typography-text>
            <a-input v-model="timeToTsMillSecondOrigin" :placeholder="$t('time.input.datetime')" />
            <a-input v-model="timeToTsMillSecondDist" :placeholder="$t('time.result.placeholder')" />
            <a-button type="primary" @click="doTimeToTsMillSecond">{{$t('convert')}}</a-button>
            <a-button @click="copyTimeToTsMillSecond">{{$t('copy')}}</a-button>
          </a-space>
          <br/><br/>
          <a-space align="baseline">
            <a-typography-text strong>&nbsp;&nbsp;&nbsp;{{$t('time.input.seconds')}}:</a-typography-text>
            <a-input v-model="timeToTsSecondOrigin" :placeholder="$t('time.input.datetime')" />
            <a-input v-model="timeToTsSecondDist" :placeholder="$t('time.result.placeholder')" />
            <a-button type="primary" @click="doTimeToTsSecond">{{$t('convert')}}</a-button>
            <a-button @click="copyTimeToTsSecond">{{$t('copy')}}</a-button>
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
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

/** 【start】公共模块*/
onUnmounted(() => {
  stopCurrentTs()
});
dayjs.extend(utc);

const toTimestampIntl = (dateString: string, timeZone:string) => {
  const offset = parseInt(timeZone.replace("UTC", ""), 10);
  return dayjs(dateString).utcOffset(offset * 60).valueOf()
}

const formatDateIntl = (timestamp: number, timeZone : string) => {
  const offset = parseInt(timeZone.replace("UTC", ""), 10);
  return dayjs(Number(timestamp)).utcOffset(offset * 60).format("YYYY-MM-DD HH:mm:ss");
}

const getCurrentTz = () => {
  const offsetMinutes = dayjs().utcOffset();
  const offsetHours = offsetMinutes / 60;
  const timezoneString = `UTC${offsetHours >= 0 ? "+" : ""}${offsetHours}`;
  return timezoneString;
}

/** 【end】公共模块*/

/** 【start】展示和选择时区*/
const timezones = Array.from({ length: 25 }, (_, i) => `UTC${i - 12 >= 0 ? '+' : ''}${i - 12}`);
// 默认时区
const selectedTimezone = ref(getCurrentTz());
const currentTz = () => {
  selectedTimezone.value = getCurrentTz()
}
/** 【end】展示和选择时区*/

/** 【start】刷新当前时间*/
const currentTs = ref(Date.now())
const timer = ref<number | null>(null);
const startCurrentTs = () => {
  stopCurrentTs()
  timer.value = setInterval(() => {
    currentTs.value = Date.now();
  }, 500);
}
const stopCurrentTs = () => {
  if (timer.value != null) {
    clearInterval(timer.value)
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
    Message.info(`${t('copied')}!`)
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
    Message.info(`${t('copied')}!`)
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
    Message.info(`${t('copied')}!`)
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
    Message.info(`${t('copied')}!`)
  }).catch(err => {console.error("Copy failed:", err);});
}
/** 【end】时间转秒*/


</script>

<style scoped>
</style>
