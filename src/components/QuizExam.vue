<template>
  <div class="container">
    <h1>Quiz Exam</h1>
   
    {{courseId}}
    {{data}}

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "QuizExam",
  data() {
    return {
      courseId: this.$route.params.id,
      data : []
    };
  },
  async mounted() {
     this.data = await axios.get(`/questions/${this.courseId}`);
    
  },
  methods : {

  }
};
</script>

<style scoped>
</style>