<template>
  <div class="vue1">
    <span>Vue slot 1s2342</span> <span>{{ test }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: 12312
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
