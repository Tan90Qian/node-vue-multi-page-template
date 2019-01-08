<template>
  <span v-if="!text"></span> <span v-else-if="ifRenderText">{{ text }}</span>
  <span v-else>{{ displayText }}{{ tail }}</span>
</template>

<script>
export const getStrFullLength = (str = '') => {
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1;
    }
    return pre + 2;
  }, 0);
};

export const cutStrByFullLength = (str = '', maxLength) => {
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
};

export default {
  name: 'EllipsisText',
  props: {
    text: String,
    length: Number,
    fullWidthRecognition: Boolean
  },
  data() {
    return {
      tail: '...'
    };
  },
  computed: {
    ifRenderText() {
      const { text, length, fullWidthRecognition } = this;
      const textLength = fullWidthRecognition ? getStrFullLength(text) : text.length;
      return textLength <= length || length < 0;
    },
    displayText() {
      const { text, length, fullWidthRecognition, tail } = this;
      if (length - tail.length <= 0) {
        return '';
      }
      return fullWidthRecognition ? cutStrByFullLength(text, length) : text.slice(0, length);
    }
  }
};
</script>
