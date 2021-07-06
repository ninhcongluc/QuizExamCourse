<template>
  <div class="container">
    <h1>Add Answer Page</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="exampleInputPassword1">Content</label>
        <input
          type="text"
          v-model="answers.content"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Content"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Question ID</label>
        <input
          type="text"
          v-model="answers.questionId"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="QuestionID"
        />
      </div>

      <button type="submit" class="btn btn-primary">Create</button>
    </form>
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
      answers: {
        content: "",
        questionId: 0,
      },
    };
  },

  methods: {
    async handleSubmit() {
      const response = axios.post("/answers", this.answers);
      console.log(response);
      this.$router.push("/admin/add_answer");
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