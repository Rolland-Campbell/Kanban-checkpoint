<template>
  <div :id="'create-comment-modal' + taskId" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add a task comment</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addComment()">
            <div class="form-group">
              <label for="body">Body</label>
              <input
                type="text"
                class="form-control"
                id="body"
                placeholder="Enter your comment"
                v-model="newComment.body"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">Create Comment</button>
          </form>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "create-comment-modal",
  props: ["taskId", "listId"],
  data() {
    return {
      newComment: {
        taskId: this.taskId,
        listId: this.listId,
        boardId: this.$route.params.boardId
      }
    };
  },
  computed: {},
  methods: {
    addComment() {
      this.$store.dispatch("addComment", this.newComment);
      this.newComment = {};
    }
  },
  components: {}
};
</script>


<style scoped>
</style>