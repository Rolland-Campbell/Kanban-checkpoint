<template>
  <div class="row">
    <div class="col">
      <div class="boards text-white">
        <h1>WELCOME TO THE BOARDS, {{this.$store.state.user.name}}!!!</h1>
        <button class="btn btn-success" @click="logout()">Logout</button>
        <form class="mt-3" @submit.prevent="addBoard()">
          <input type="text" placeholder="title" v-model="newBoard.title" required />
          <input type="text" placeholder="description" v-model="newBoard.description" />
          <button type="submit">Create Board</button>
        </form>
        <div class="mt-5" v-for="board in boards" :key="board._id">
          <router-link :to="{name: 'board', params: {boardId: board._id}}">
            <h1>
              <i class="far fa-address-book"></i>
              {{board.title}}
            </h1>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../AuthService";

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
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>