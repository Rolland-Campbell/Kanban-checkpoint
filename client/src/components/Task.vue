<template>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">Task: {{taskProp.title}}</h3>
    </div>
    <!-- comment card in card -->
    <div class="col-12">
      <button class="btn btn-danger" @click.prevent="deleteTask()">Delete Task</button>
      <br />
      <button
        class="btn btn-primary mt-3"
        data-toggle="modal"
        :data-target="'#create-comment-modal' + taskProp._id"
      >Add a comment</button>
    </div>
    <hr />
    <commentModal :taskId="taskProp._id" :listId="taskProp.listId" />
    <div class="col-12">
      <comment class="m-2" v-for="comment in comments" :commentProp="comment" :key="comment._id" />
      <!-- end of comment card -->
      <!-- dropdown for list select -->
      <select class="dropdown" v-model="selected">
        <option disabled>Move task to selected list</option>
        <option v-for="list in lists" :key="list._id" :value="list._id">{{list.title}}</option>
      </select>
      <button class="btn btn-warning ml-1" @click="moveTask()">Move Task</button>
    </div>
  </div>
</template>

<script>
import comment from "../components/Comment";
import commentModal from "../components/CommentModal";
export default {
  name: "Task",
  props: ["taskProp"],
  mounted() {
    this.$store.dispatch("getComments", this.taskProp._id);
  },
  data() {
    return {
      selected: ""
    };
  },
  methods: {
    data() {
      return {};
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskProp);
    },
    moveTask() {
      this.$store.dispatch("moveTask", {
        taskId: this.taskProp._id,
        listId: this.selected,
        oldListId: this.taskProp.listId
      });
    }
  },
  computed: {
    comments() {
      return this.$store.state.comments[this.taskProp._id]; //filter through array of tasks, show only the ones by listId
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  components: { comment, commentModal }
};
</script>

<style scoped>
.card {
  background-color: rgba(255, 255, 255, 0.548);
  color: black;
  border-color: rgba(0, 0, 0, 0.479);
  border-style: solid;
  padding-bottom: 3vh;
  margin-bottom: 1vh;
}

.dropdown {
  margin-top: 3vh;
  height: 4vh;
  background-color: rgba(255, 248, 220, 0.459);
}
</style>
