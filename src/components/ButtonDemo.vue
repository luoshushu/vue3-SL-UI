<template>
  <div>
    <Button @click="onClick" theme="button">1111</Button>
    <Button @click="onClick" theme="link">2222</Button>
    <Button @click="onClick" theme="text">3333</Button>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import Button from "../lib/Button.vue";
export default {
  components: { Button },
  setup() {
    const onClick = () => {
      console.log(1111);
    };
    return {
      onClick,
    };
  },
};
</script>