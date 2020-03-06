<template>
  <div class="container-fluid board">
    <div class="row text-center">
      <div class="col-4">
        <button class="btn btn-primary mt-4" @click="gotoBoards()">Back to Boards Page</button>
      </div>
      <div class="col-4">
        <h1 class="boardTitle">{{board.title}}</h1>
        <h5 class="boardTitle">{{board.description}}</h5>
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
    <div class="row listRow">
      <ListModal :boardId="$route.params.boardId" />
      <list v-for="list in lists" :listProp="list" :key="list._id" />
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

<style scoped>
.board {
  height: 100vh;
  background-image: url("https://expertvagabond.com/wp-content/uploads/highlands-buachaille-etive-900x600.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  overflow: auto;
}

.cardView {
  display: flex;
  justify-content: space-between;
}

.card {
  width: 30vw;
  background-color: rgba(255, 255, 255, 0.377);
  border-radius: 20px;
}

.boardTitle {
  color: white;
  text-shadow: 1px 1px black;
}

.listRow {
  display: flex;
  justify-content: space-evenly;
  margin-top: 5vh;
}
</style>