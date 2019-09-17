<template>
  <div id="create-list-modal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create A List!</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addList()">
            <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Enter a title"
                v-model="newList.title"
                required
              />
            </div>
            <div class="form-group">
              <label for="body">Body</label>
              <input
                type="text"
                class="form-control"
                id="body"
                placeholder="Enter some stuff"
                v-model="newList.body"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">Make List</button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "create-list-modal",
  props: ["board"],
  data() {
    return {
      newList: {}
    };
  },
  methods: {
    addList() {
      this.newList.boardId = board;
      this.$store.dispatch("addList", this.newList);
      this.newList = {};
    }
  },
  computed: {},
  components: {}
};
</script>


<style scoped>
</style>