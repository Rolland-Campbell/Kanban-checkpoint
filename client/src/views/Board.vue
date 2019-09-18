<template>
  <div class="container-fluid board">
    <h1 class="text-white">{{board.title}}</h1>
    <div class="row">
      <div class="col-12 mt-3">
        <button
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#create-list-modal"
        >Create A List</button>
      </div>
      <ListModal :boardId="$route.params.boardId" />
    </div>
    <div class="col-12 mt-3">
      <list class="mt-2" v-for="list in lists" :listProp="list" :key="list._id" />
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
  props: ["boardId"],
  components: { list, ListModal }
};
</script>
