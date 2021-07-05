<template>
  <div class="container">
    <h1>Quiz Exam</h1>
    <ul v-for="quiz in quizs" :key="quiz.id">
      <h4>{{ quiz.question }}</h4>
      <li v-for="answer in quiz.answers" :key="answer">
        {{ answer }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "QuizExam",
  data() {
    return {
      quizs: [
        {
          id: 1,
          question: "What color is this?",
          answers: ["A. Red", "B. Blue", "C. Green"],
          correct_answer: "A",
        },
        {
          id: 2,
          question: "What animal do u have?",
          answers: ["A. Dog", "B. Cat", "C. Pig"],
          correct_answer: "B",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>