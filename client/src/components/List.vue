<template>
  <div class="card row p-0">
    <div class="card-body">
      <h5 class="card-title">{{listProp.title}}</h5>
      <p class="card-text">{{listProp.body}}</p>
      <!-- start of card in card -->
      <div class="mt-3">
        <button class="btn btn-danger m-2" @click.prevent="deleteList()">Delete List</button>
        <br />
        <button
          class="btn btn-primary"
          data-toggle="modal"
          :data-target="'#create-task-modal' +listProp._id"
        >Create A Task</button>
      </div>
      <TaskModal :listId="listProp._id" />
      <div class="col mt-3">
        <task class="taskView" v-for="task in tasks" :taskProp="task" :key="task._id" />
      </div>
      <!-- end of card in card -->
    </div>
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
  props: ["listProp"],
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
