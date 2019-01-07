<template>
  <div class="mz-input">
    <div class="mz-input-prefix"><slot name="prefix"></slot></div>
    <input
      ref="input"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value);"
      @focus="$emit('onFocus');"
      @blur="$emit('onBlur');"
      @keyup.enter="$emit('onEnter');"
    />
    <div class="mz-input-suffix"><slot name="suffix"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'MzInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: '请输入'
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
