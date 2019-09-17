<template>
  <div class="row">
    <button type="submit">Create Board</button>
    <div class="col">
      <div class="boards">
        WELCOME TO THE BOARDS!!!
        <form @submit.prevent="addBoard">
          <input type="text" placeholder="title" v-model="newBoard.title" required />
          <input type="text" placeholder="description" v-model="newBoard.description" />
        </form>
        <div v-for="board in boards" :key="board._id">
          <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards"); //which board has the lists
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    }
  }
};
</script>