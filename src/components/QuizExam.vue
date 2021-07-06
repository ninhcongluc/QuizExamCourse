<template>
  <div class="container">
    <h1>Quiz Exam</h1>
   
    {{courseId}}

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "QuizExam",
  data() {
    return {
      courseId: this.$route.params.id,
    };
  },
  async mounted() {
    const data = await axios.get(`/questions/${this.courseId}`);
    console.log(data + "day la data")
  },
  methods : {

  }
};
</script>

<style scoped>
</style>