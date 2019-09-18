<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{taskProp.title}}</h5>
      <p class="card-text">{{taskProp.body}}</p>
    </div>
    <button class="btn-danger" @click.prevent="deleteTask()">Delete Task</button>
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
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskProp);
    }
  }
};
</script>

<style scoped>
</style>
