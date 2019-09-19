<template>
  <div class="card">
    <div class="card-body">
      <p class="card-text">{{commentProp.body}}</p>
    </div>
    <button class="btn-danger" @click.prevent="deleteComment()">Delete Comment</button>
  </div>
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
</style>