<template>
  <div>
    <Switch v-model:value="bool" disabled />
    <Switch v-model:value="bool1"  />
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import Switch from "../lib/Switch.vue";
export default {
  components: { Switch },
  setup() {
    const bool = ref(false);
    const bool1 = ref(false);
    return {
      bool,
      bool1
    };
  },
};
</script>