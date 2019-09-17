<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{taskProp.title}}</h5>
      <p class="card-text">{{taskProp.body}}</p>
    </div>
    <button class="btn-danger" @click.prevent="deleteTask()">Delete List</button>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["taskProp"],
  methods: {
    data() {
      return {};
    },
    deleteList() {
      this.$store.dispatch("deleteList", this.listProp);
    }
  }
};
</script>

<style scoped>
</style>
