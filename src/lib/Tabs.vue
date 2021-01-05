<template>
  <div class="sl-tabs">
    <div class="sl-tabs-nav" ref="container">
      <div
        class="sl-tabs-nav-item"
        v-for="(t, index) in titles"
        :key="index"
        :ref="
          (el) => {
            if (t === selected) selectedItem = el;
          }
        "
        @click="select(t)"
        :class="{ selected: t === selected }"
      >
        {{ t }}
      </div>
      <div class="sl-tabs-nav-indicator" ref="indicator"></div>
    </div>
    <div class="sl-tabs-content">
      <component :is="current" :key="current.props.title" />
    </div>
  </div>
</template>

<script lang="ts">
import Tab from "./Tab.vue";
import { ref, watchEffect, onMounted, computed } from "vue";
export default {
  name: "Tabs",
  props: {
    selected: {
      type: String,
    },
  },
  setup(props, context) {
    const selectedItem = ref<HTMLDivElement>(null);
    const indicator = ref<HTMLDivElement>(null);
    const container = ref<HTMLDivElement>(null);
    const defaults = context.slots.default(); // 获取插槽
    defaults.forEach((tag) => {
      if (tag.type !== Tab) {
        throw new Error("Tabs 子标签必须是Tab");
      }
    });
    const titles = defaults.map((tag) => tag.props.title);
    onMounted(() => {
      watchEffect(() => {
        const item = selectedItem.value;
        const { width, left: resultLeft } = item.getBoundingClientRect();
        const { left: containerLeft } = container.value.getBoundingClientRect();
        const left = resultLeft - containerLeft; // 左边的left - 父级的left
        indicator.value.style.width = `${width}px`;
        indicator.value.style.left = `${left}px`;
      });
    });
    const select = (title: string) => {
      context.emit("update:selected", title);
    };
    // 计算属性来获取变更内容
    const current = computed(() => {
      return defaults.find((tag) => tag.props.title === props.selected);
    });
    return {
      defaults,
      titles,
      selectedItem,
      indicator,
      select,
      container,
      current,
    };
  },
};
</script>

<style lang="scss">
$blue: #40a9ff;
$color: #333;
$border-color: #d9d9d9;
.sl-tabs {
  &-nav {
    display: flex;
    color: $color;
    border-bottom: 1px solid $border-color;
    position: relative;
    &-item {
      padding: 8px 0;
      margin: 0 16px;
      cursor: pointer;
      &:first-child {
        margin-left: 0;
      }
      &.selected {
        color: $blue;
      }
    }
    &-indicator {
      position: absolute;
      height: 3px;
      background: $blue;
      left: 0;
      bottom: -1px;
      width: 100px;
      transition: all 250ms;
    }
  }
  &-content {
    padding: 8px 0;
  }
}
</style>
