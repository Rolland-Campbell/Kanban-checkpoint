<template>
  <div class="container-fluid board">
    <div class="row text-center">
      <div class="col-4">
        <button class="btn btn-primary mt-4" @click="gotoBoards()">Back to Boards Page</button>
      </div>
      <div class="col-4">
        <h1 class="text-white">{{board.title}} Board</h1>
        <h5 class="text-white">{{board.description}}</h5>
      </div>
      <div class="col-4">
        <button class="btn btn-danger mt-4" @click="deleteBoard()">Delete Board</button>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-4"></div>
      <div class="col-4">
        <button
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#create-list-modal"
        >Create A List</button>
      </div>
      <div class="col-4"></div>
    </div>
    <div class="row m-2">
      <ListModal :boardId="$route.params.boardId" />
      <list class="m-3" v-for="list in lists" :listProp="list" :key="list._id" />
    </div>
  </div>
</template>

<script>
import list from "../components/List";
import ListModal from "../components/ListModal";

export default {
  name: "board",
  mounted() {
    this.$store.dispatch("getLists", this.boardId); //which board has the lists
    this.$store.dispatch("getBoards");
  },
  computed: {
    board() {
      return (
        //FIXME This does not work on page reload because the boards array is empty in the store
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.boardId);
    },
    gotoBoards() {
      this.$router.push("/boards");
    }
  },
  props: ["boardId"],
  components: { list, ListModal }
};
</script>
