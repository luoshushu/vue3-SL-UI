<template>
  <button
    class="sl-button"
    :class="{ [`sl-theme-${theme}`]: theme }"
  >
    <slot />
  </button>
</template>
<script lang="ts">
export default {
  // inheritAttrs: false, //默认不继承属性 vue3默认会继承
  /**
   *  props 要先声明才能取值，attrs不用先声明
   *  props 不包含事件，attrs包含事件
   *  props 没有声明的属性，会跑到attrs李
   *  props 支持string以外的类型，attrs只有string类型
   */
  props: {
    theme: {
      type: String,
      default: "button",
    },
  },
};
</script>
<style lang="scss" >
$h: 32px;
$border-color: #d9d9d9;
$color: #333;
$blue: #40a9ff;
$radius: 4px;
.sl-button {
  box-sizing: border-box;
  height: $h;
  padding: 0 12px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  background: white;
  color: $color;
  border: 1px solid $border-color;
  border-radius: $radius;
  box-shadow: 0 1px 0 fade-out(#000, 0.95);
  & + & {
    margin-left: 8px;
  }
  &:hover,
  &:focus {
    color: $blue;
    border-color: $blue;
  }
  &:focus {
    outline: none;
  }
  &::-moz-focus-inner {
    border: 0;
  }
}
</style>