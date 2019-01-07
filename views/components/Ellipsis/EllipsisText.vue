<template>
  <span v-if="!text" /> <span v-else-if="ifRenderText">{{ text }}</span>
  <span v-else :title="text"> {{ displayText }} {{ tail }} </span>
</template>

<script>
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
  methods: {
    getStrFullLength(str = '') {
      return str.split('').reduce((pre, cur) => {
        const charCode = cur.charCodeAt(0);
        if (charCode >= 0 && charCode <= 128) {
          return pre + 1;
        }
        return pre + 2;
      }, 0);
    },
    cutStrByFullLength(str = '', maxLength) {
      let showLength = 0;
      return str.split('').reduce((pre, cur) => {
        const charCode = cur.charCodeAt(0);
        if (charCode >= 0 && charCode <= 128) {
          showLength += 1;
        } else {
          showLength += 2;
        }
        if (showLength <= maxLength) {
          return pre + cur;
        }
        return pre;
      }, '');
    }
  },
  computed: {
    ifRenderText() {
      const { text, length, fullWidthRecognition, getStrFullLength } = this;
      const textLength = fullWidthRecognition ? getStrFullLength(text) : text.length;
      return textLength <= length || length < 0;
    },
    displayText() {
      const { text, length, tail, fullWidthRecognition, cutStrByFullLength } = this;
      if (length - tail.length <= 0) {
        return '';
      }
      return fullWidthRecognition ? cutStrByFullLength(text, length) : text.slice(0, length);
    }
  }
};
</script>
