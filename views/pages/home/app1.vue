<template>
  <div class="vue1">
    <span>Vue slot 1s2342</span>
    <my-input />
    <span>{{test}}</span>
  </div>
</template>

<script>
import MyInput from '../../components/input';

export default {
  components: {
    MyInput,
  },
  data() {
    return {
      test: 12312,
    };
  },
};
</script>

<style scoped>
input::placeholder {
  color: red;
}
.vue1 {
  margin-top: 30px;
  display: grid;
  background: linear-gradient(to right, white, black);
}
</style>
