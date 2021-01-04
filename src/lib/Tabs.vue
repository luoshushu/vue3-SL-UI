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
      <component v-for="(s, index) in defaults" :is="s" :key="index" />
    </div>
  </div>
</template>

<script lang="ts">
import Tab from "./Tab.vue";
import { ref, watchEffect, onMounted } from "vue";
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
    const defaults = context.slots.default();
    defaults.forEach((tag) => {
      if (tag.type !== Tab) {
        throw new Error("Tabs 子标签必须是Tab");
      }
    });
    const titles = defaults.map((tag) => tag.props.title);
    onMounted(() => {
      watchEffect(() => {
        const items = selectedItem.value;
        const { width, left: resultLeft } = items.getBoundingClientRect();
        const { left: containerLeft } = container.value.getBoundingClientRect();
        const left = resultLeft - containerLeft;
        indicator.value.style.width = `${width}px`;
        indicator.value.style.left = `${left}px`;
      });
    });
    const select = (title: string) => {
      context.emit("update:selected", title);
    };
    return { defaults, titles, selectedItem, indicator, select, container };
  },
};
</script>

<style  lang="scss">
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
