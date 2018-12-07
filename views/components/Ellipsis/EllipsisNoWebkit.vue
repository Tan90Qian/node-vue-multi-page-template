<template>
  <div ref="root" :class="cls">
    <div ref="content">
      <span ref="node">{{ childText }}</span>
      <div class="shadow" ref="shadowChildren">{{ children }}</div>
      <div class="shadow" ref="shadow">
        <span>{{ text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cls', 'children', 'lines'],
  data() {
    return {
      text: '',
      targetCount: 0,
    };
  },
  mounted() {
    if (this.$refs.node) {
      this.computeLine();
    }
  },
  watch: {
    lines(val, oldVal) {
      if (val !== oldVal) {
        this.computeLine();
      }
    },
  },
  methods: {
    computeLine() {
      const { lines } = this;
      const text = this.$refs.shadowChildren.innerText;
      const lineHeight = parseInt(getComputedStyle(this.$refs.root).lineHeight, 10);
      const targetHeight = lines * lineHeight;
      this.$refs.content.style.height = `${targetHeight}px`;
      const totalHeight = this.$refs.shadowChildren.offsetHeight;
      const shadowNode = this.$refs.shadow.firstChild;

      if (totalHeight <= targetHeight) {
        this.text = text;
        this.targetCount = text.length;
        return;
      }

      // bisection
      const len = text.length;
      const mid = Math.ceil(len / 2);

      const count = this.bisection(targetHeight, mid, 0, len, text, shadowNode);

      this.text = text;
      this.targetCount = count;
    },
    bisection(th, m, b, e, text, shadowNode) {
      const suffix = '...';
      let mid = m;
      let end = e;
      let begin = b;
      shadowNode.innerHTML = text.substring(0, mid) + suffix;
      let sh = shadowNode.offsetHeight;

      if (sh <= th) {
        shadowNode.innerHTML = text.substring(0, mid + 1) + suffix;
        sh = shadowNode.offsetHeight;
        if (sh > th || mid === begin) {
          return mid;
        } else {
          begin = mid;
          if (end - begin === 1) {
            mid = 1 + begin;
          } else {
            mid = Math.floor((end - begin) / 2) + begin;
          }
          return this.bisection(th, mid, begin, end, text, shadowNode);
        }
      } else {
        if (mid - 1 < 0) {
          return mid;
        }
        shadowNode.innerHTML = text.substring(0, mid - 1) + suffix;
        sh = shadowNode.offsetHeight;
        if (sh <= th) {
          return mid - 1;
        } else {
          end = mid;
          mid = Math.floor((end - begin) / 2) + begin;
          return this.bisection(th, mid, begin, end, text, shadowNode);
        }
      }
    },
  },
  computed: {
    childText() {
      const { text, targetCount } = this;
      return `${targetCount > 0 && text.substring(0, targetCount)}${
        targetCount > 0 && targetCount < text.length ? '...' : ''
      }`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
