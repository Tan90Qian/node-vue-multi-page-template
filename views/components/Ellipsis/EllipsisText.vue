<template>
  <span v-if="!text"></span> <span v-else-if="ifRenderText">{{ text }}</span>
  <span v-else :title="text">{{ displayText }} {{ tail }}</span>
</template>

<script>
import { getStrFullLength, cutStrByFullLength } from './utilFnc.js';
export default {
  name: 'EllipsisText',
  props: ['text', 'length'],
  data() {
    return {
      tail: '...'
    };
  },
  mounted() {
    const { text } = this;
    if (typeof text !== 'string') {
      throw new Error('Ellipsis children must be string.');
    }
  },
  computed: {
    ifRenderText() {
      const { text, length } = this;
      const textLength = fullWidthRecognition ? getStrFullLength(text) : text.length;
      return textLength <= length || length < 0;
    },
    displayText() {
      const { text, length, tail } = this;
      if (length - tail.length <= 0) {
        return '';
      }
      return fullWidthRecognition ? cutStrByFullLength(text, length) : text.slice(0, length);
    }
  }
};
</script>
