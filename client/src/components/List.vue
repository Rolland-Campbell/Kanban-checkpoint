<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{listProp.title}}</h5>
      <p class="card-text">{{listProp.body}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: ["listProp"]
};
</script>

<style scoped>
</style>
