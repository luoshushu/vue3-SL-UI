<template>
  <div class="sl-tabs">
    <div class="sl-tabs-nav" ref="container">
      <div class="sl-tabs-nav-item" v-for="(t, index) in titles" :key="index">
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
export default {
  name: "Tabs",
  setup(props, context) {
    // console.log({ ...context });
    // console.log({ ...context.slots });
    // console.log({ ...context.slots.default });
    // console.log({ ...context.slots.default() });
    const defaults = context.slots.default();
    defaults.forEach((tag) => {
      if (tag.type !== Tab) {
        throw new Error("Tabs 子标签必须是Tab");
      }
    });
    const titles = defaults.map((tag) => tag.props.title);

    return { defaults, titles };
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
