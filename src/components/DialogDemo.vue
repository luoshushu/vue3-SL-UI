<template>
  <div>
    <div>Dialog示例</div>
    <Button @click="xxx">打开</Button>
    <Dialog
      v-model:visible="x"
      :closeOnClickOverlay="false"
      :ok="f1"
      :cancel="f2"
    >
      <template v-slot:content>
        <strong>hi</strong>
        <div>hi2</div>
      </template>
      <template v-slot:title>
        <strong>提示</strong>
      </template>
    </Dialog>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import Dialog from "../lib/Dialog.vue";
import Button from "../lib/Button.vue";
import { openDialog } from "../lib/openDialog";
export default {
  components: { Dialog, Button },
  setup() {
    const x = ref(false);
    const xxx = () => {
      x.value = !x.value;
    };
    const f1 = () => {
      return false;
    };
    const f2 = () => {};
    return {
      x,
      xxx,
      f1,
      f2,
    };
  },
};
</script>