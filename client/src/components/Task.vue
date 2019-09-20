<template>
  <div class="card mt-1 ml-0 mr-0 p-1">
    <div class="card-body">
      <h3 class="card-title text-white">Task: {{taskProp.title}}</h3>
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
      <select class="mt-3" v-model="selected">
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
</style>
