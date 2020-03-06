<template>
  <!-- <div class="card">
  <div class="card-body">-->
  <p class="commentText">
    <button class="btn btn-danger" @click.prevent="deleteComment()">x</button>
    {{commentProp.body}}
  </p>
  <!-- </div>
    <button class="btn-danger" @click.prevent="deleteComment()">Delete Comment</button>
  </div>-->
</template>


<script>
export default {
  name: "Comment",
  props: ["commentProp"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", this.commentProp);
    }
  },
  components: {}
};
</script>


<style scoped>
.commentText {
  color: black;
  text-align: left;
}

.btn {
  border-radius: 50%;
  height: 2vw;
  width: 2vw;
  padding: 0;
}
</style>