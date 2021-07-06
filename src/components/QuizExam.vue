<template>
  <div class="container">
    <h1>Quiz Exam</h1>
    {{datas}}
   

    <ul v-for="data in datas" :key="data.id">
      <li>{{data.content}}</li>
    </ul>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "QuizExam",
  data() {
    return {
      courseId: this.$route.params.id,
      datas : null,
      
      
    };
  },
  async mounted() {
     const response = await axios.get(`/questions/${this.courseId}`);
     this.datas = response.data
    
    
  },
  methods : {

  }
};
</script>

<style scoped>
</style>