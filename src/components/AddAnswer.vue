<template>
  <div class="container">
    <h1>Add Answer Page</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="exampleInputPassword1">Content</label>
        <input
          type="text"
          v-model="answer.content"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Content"
        />
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>

    <a :href="'/admin/answer/' + answer.questionId"><i class="fas fa-backward"></i> Back to Answers</a>
  </div>
</template>
  
  <script>
import axios from "axios";
export default {
  name: "AddAnswer",
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      answer: {
        content: "",
        questionId: this.$route.params.id,
        courseId: 0,
      },
    };
  },
  async mounted() {
    const response = await axios.get(`/question/${this.answer.questionId}`);
    this.answer.courseId = response.data.course_id;
  },
  methods: {
    async handleSubmit() {
      const response = axios.post("/answers", this.answer);
      console.log(response);
      this.$router.go(`/admin/answer/${this.answer.questionId}`);
    },
  },
};
</script>
  <style scoped>
h1 {
  color: green;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.35);
}
</style>