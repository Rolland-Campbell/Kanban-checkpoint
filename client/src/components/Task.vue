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
    <!-- dropdown for list select -->
    <select v-model="selected">
      <option disabled>Move task to selected list</option>
      <option v-for="list in lists" :key="list._id" :value="list._id">{{list.title}}</option>
    </select>
    <button class="btn btn-warning" @click="moveTask()">Move it</button>
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
