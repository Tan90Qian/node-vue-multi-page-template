<template>
  <span v-if="!lines && !length" :class="cls"> <slot></slot> </span>
  <EllipsisText
    v-else-if="!lines"
    :class="cls"
    :length="length"
    :text="childrenText"
    :fullWidthRecognition="fullWidthRecognition"
  ></EllipsisText>
  <div
    v-else-if="isSupportLineClamp"
    :class="cls"
    :style="{
      '-webkit-line-clamp': lines,
      '-webkit-box-orient': 'vertical'
    }"
  >
    <slot></slot>
  </div>
  <EllipsisNoWebkit v-else :class="cls" :lines="lines" :children="childrenText"></EllipsisNoWebkit>
</template>

<script>
import EllipsisNoWebkit from './EllipsisNoWebkit';
import EllipsisText from './EllipsisText';
export default {
  name: 'Ellipsis',
  props: {
    lines: {
      type: Number
    },
    length: {
      type: Number
    }
  },
  components: {
    EllipsisNoWebkit,
    EllipsisText
  },
  computed: {
    isSupportLineClamp() {
      return document.body.style.webkitLineClamp !== undefined;
    },
    cls() {
      const { lines, isSupportLineClamp } = this;
      return {
        ellipsis: true,
        lines: lines && !isSupportLineClamp,
        lineClamp: lines && isSupportLineClamp
      };
    },
    childrenText() {
      const children = this.$slots.default;
      return children ? children[0].text : '';
    }
  }
};
</script>

<style lang="scss">
.ellipsis {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  word-break: break-all;

  &.lines {
    position: relative;
    .shadow {
      position: relative;
      display: block;
      color: transparent;
      opacity: 0;
      z-index: -999;
    }
  }

  &.lineClamp {
    position: relative;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
