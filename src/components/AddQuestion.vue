<template>
  <div class="container">
    <h1>Add Question Page</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="exampleInputPassword1">Type</label>
        <select class="custom-select" id="inputGroupSelect01" v-model="type">
          <option value="multiple choices" selected>multiple choices</option>
          <option value="TF">TF</option>
        </select>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Content</label>
        <input
          type="text"
          v-model="content"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Content"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Correct Answer</label>
        <input
          type="text"
          v-model="correct_answer"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Correct Answer"
        />
      </div>

      <button type="submit" class="btn btn-primary">Create</button>
    </form>
    <a :href="'/admin/qa/' + course_id"
      ><i class="fas fa-backward"></i> Back to QA Page</a
    >
  </div>
</template>
  
  <script>
import axios from "axios";
export default {
  name: "AddQuestion",
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      type: "multiple choices",
      content: "",
      correct_answer: "",
      course_id: this.$route.params.id,
    };
  },

  methods: {
    async handleSubmit() {
      const response = axios.post("/questions", {
        type: this.type,
        content: this.content,
        correct_answer: this.correct_answer,
        course_id: this.course_id,
      });
      console.log(response);
      this.$router.go(`/admin/qa/${this.course_id}`);
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