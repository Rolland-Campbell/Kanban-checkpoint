<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{taskProp.title}}</h5>
      <p class="card-text">{{taskProp.body}}</p>
    </div>
    <button class="btn-danger" @click.prevent="deleteTask()">Delete Task</button>
    <!-- comment card in card -->
    <div class="col-12 mt-3">
      <button
        class="btn btn-primary"
        data-toggle="modal"
        :data-target="'#create-comment-modal' + taskProp._id"
      >Add a comment</button>
    </div>
    <commentModal :taskId="taskProp._id" :listId="taskProp.listId" />
    <div class="col-12 mt-3">
      <comment class="mt-2" v-for="comment in comments" :commentProp="comment" :key="comment._id" />
    </div>
    <!-- end of comment card -->
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
  methods: {
    data() {
      return {};
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskProp);
    }
  },
  computed: {
    comments() {
      return this.$store.state.comments[this.taskProp._id]; //filter through array of tasks, show only the ones by listId
    }
  },
  components: { comment, commentModal }
};
</script>

<style scoped>
</style>
