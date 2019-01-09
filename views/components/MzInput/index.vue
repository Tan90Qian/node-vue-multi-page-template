<template>
  <span class="mz-input">
    <span v-if="$slots.prefix" class="mz-input-prefix"> <slot name="prefix"></slot> </span>
    <input
      ref="input"
      v-bind="$attrs"
      :type="type"
      :placeholder="placeholder"
      :value="stateValue"
      v-on="listeners"
    />
    <span v-if="$slots.suffix" class="mz-input-suffix"> <slot name="suffix"></slot> </span>
  </span>
</template>

<script>
import { hasProp } from '../_util/prop-util.js';
import { isIE, isIE9 } from '../_util/env.js';

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

export default {
  name: 'MzInput',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: String,
    defaultValue: String,
    autoFocus: Boolean,
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  model: {
    prop: 'value',
    event: 'change.value'
  },
  data() {
    const { value, defaultValue } = this.$props;
    return {
      stateValue: fixControlledValue(!hasProp(this, 'value') ? defaultValue : value)
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.autoFocus) {
        this.$refs.input.focus();
      }
    });
  },
  watch: {
    value(val) {
      this.stateValue = fixControlledValue(val);
    }
  },
  methods: {
    handleKeyDown(e) {
      if (e.keyCode === 13) {
        this.$emit('onEnter', e);
      }
      this.$emit('keydown', e);
    },
    handleChange(e) {
      if (isIE && !isIE9 && this.stateValue === e.target.value) {
        return;
      }
      if (!hasProp(this, 'value')) {
        this.stateValue = e.target.value;
      } else {
        // this.$forceUpdate();
        if (!e.target.composing) {
          this.$emit('change.value', e.target.value);
        }
        this.$emit('change', e);
        this.$emit('input', e);
      }
    },
    handleFocus() {
      this.$emit('onFocus');
    },
    handleBlur() {
      this.$emit('onBlur');
    }
  },
  computed: {
    listeners() {
      const { $listeners, handleChange, handleKeyDown, handleFocus, handleBlur } = this;
      return {
        ...$listeners,
        focus: handleFocus,
        blur: handleBlur,
        input: handleChange,
        keydown: handleKeyDown
      };
    }
  }
};
</script>

<style lang="scss">
.mz-input {
  position: relative;
  input {
    border: 0;
    outline: none;
  }
  .mz-input-prefix,
  .mz-input-suffix {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .mz-input-prefix {
    left: 0;
  }
  .mz-input-suffix {
    right: 0;
  }
}
</style>
