<template>
  <a-tabs default-active-key="1">
    <a-tab-pane key="1" title="Json序列">
      <Json/>
    </a-tab-pane>
    <a-tab-pane key="2" title="时间戳转换">
      <timestamp/>
    </a-tab-pane>
    <a-tab-pane key="3" title="随机密码">
      <Ramdompwd/>
    </a-tab-pane>
<!--    <a-tab-pane key="4" title="Json转Bean">Json转Bean</a-tab-pane>-->
  </a-tabs>
</template>
<script setup lang="ts">
import Json from "./json.vue";
import Timestamp from "./timestamp.vue";
import Ramdompwd from "./ramdompwd.vue";
</script>
