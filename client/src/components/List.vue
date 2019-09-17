<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{listProp.title}}</h5>
      <p class="card-text">{{listProp.body}}</p>
    </div>
    <button class="btn-danger" @click.prevent="deleteList()">Delete List</button>
  </div>
</template>

<script>
export default {
  name: "List",
  props: ["listProp"],
  methods: {
    data() {
      return {};
    },
    deleteList() {
      this.$store.dispatch("deleteList", this.listProp._id);
    }
  }
};
</script>

<style scoped>
</style>
