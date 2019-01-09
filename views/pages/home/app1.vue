<template>
  <div class="vue1">
    <span>Vue slot 1s2342</span> <span>{{ test }}</span>
    <MzInput class="extra" v-model="text"></MzInput>
  </div>
</template>

<script>
import MzInput from 'components/MzInput/';
export default {
  components: {
    MzInput
  },
  data() {
    return {
      test: 12312,
      text: ''
    };
  }
};
</script>

<style scoped>
input::placeholder {
  color: red;
}
.vue1 {
  display: grid;
  margin-top: 30px;
  background: linear-gradient(to right, white, black);
}
</style>
