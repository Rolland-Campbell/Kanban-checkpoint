<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{listProp.title}}</h5>
      <p class="card-text">{{listProp.body}}</p>
      <!-- start of card in card -->
      <div class="col-12 mt-3">
        <button
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#create-task-modal"
        >Create A Task</button>
      </div>
      <TaskModal :listId="listProp._id" />
      <div class="col-12 mt-3">
        <task class="mt-2" v-for="task in tasks" :taskProp="task" :key="task._id" />
      </div>
      <!-- end of card in card -->
    </div>
    <button class="btn-danger" @click.prevent="deleteList()">Delete List</button>
  </div>
</template>

<script>
import task from "../components/Task";
import TaskModal from "../components/TaskModal";
export default {
  name: "List",
  mounted() {
    this.$store.dispatch("getTasks", this.listProp._id);
  },
  props: ["listProp", "listId"],
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listProp);
    }
  },
  data() {
    return {};
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listProp._id]; //filter through array of tasks, show only the ones by listId
    }
  },
  components: { task, TaskModal }
};
</script>

<style scoped>
</style>
