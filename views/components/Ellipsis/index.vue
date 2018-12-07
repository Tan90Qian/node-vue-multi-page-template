<script>
import EllipsisNoWebkit from './EllipsisNoWebkit';
const isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;

const EllipsisText = {
  props: ['cls', 'text', 'length', 'other'],
  render(h) {
    const { cls, text, length, other } = this;
    if (!text) {
      return <span />;
    }
    if (typeof text !== 'string') {
      throw new Error('Ellipsis children must be string.');
    }
    const textLength = text.length;
    if (textLength <= length || length < 0) {
      return <span {...other}>{text}</span>;
    }
    const tail = '...';
    let displayText;
    if (length - tail.length <= 0) {
      displayText = '';
    } else {
      displayText = text.slice(0, length);
    }

    return (
      <span class={cls} {...other}>
        {displayText}
        {tail}
      </span>
    );
  },
};

export default {
  props: {
    lines: {
      type: Number,
    },
    length: {
      type: Number,
    },
    restProps: {
      type: Object,
    },
  },
  components: {
    EllipsisText,
    EllipsisNoWebkit,
  },
  render() {
    const { cls, showText, lines, length, restProps } = this;
    const children = this.$slots.default;

    if (!lines && !length) {
      return (
        <span class={cls} {...restProps}>
          {children}
        </span>
      );
    }
    const childrenText = children[0].text;
    if (!lines) {
      return <EllipsisText cls={cls} length={length} text={childrenText || ''} {...restProps} />;
    }

    if (isSupportLineClamp) {
      return (
        <div
          class={cls}
          {...restProps}
          style={{
            '-webkit-line-clamp': lines,
            '-webkit-box-orient': 'vertical',
          }}
        >
          {children}
        </div>
      );
    }

    return <EllipsisNoWebkit cls={cls} lines={lines} children={childrenText} />;
  },
  computed: {
    cls() {
      const { lines } = this;
      return {
        ellipsis: true,
        lines: lines && !isSupportLineClamp,
        lineClamp: lines && isSupportLineClamp,
      };
    },
  },
};
</script>

<style lang="scss">
.ellipsis {
  overflow: hidden;
  display: inline-block;
  word-break: break-all;
  width: 100%;

  &.lines {
    position: relative;
    .shadow {
      display: block;
      position: relative;
      color: transparent;
      opacity: 0;
      z-index: -999;
    }
  }

  &.lineClamp {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
  }
}
</style>
