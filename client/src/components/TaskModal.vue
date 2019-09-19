<template>
  <div :id="'create-task-modal' + listId" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create a task for your list!</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addTask(event)">
            <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Enter a task title"
                v-model="newTask.title"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">Make a Task</button>
          </form>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "create-task-modal",
  props: ["listId"],
  data() {
    return {
      newTask: {
        title: "",
        listId: this.listId,
        boardId: this.$route.params.boardId
      }
    };
  },
  methods: {
    addTask(e) {
      this.$store.dispatch("addTask", this.newTask);
      e.target.reset();
    }
  },
  computed: {},
  components: {}
};
</script>


<style scoped>
</style>