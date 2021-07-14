<template>
  <div class="container">
    <h4>Exam Test Topic: {{ courses.name }}</h4>
    <p id="time">Times: {{ courses.total_time }}'</p>
    <h6>Rest: {{ timerCount }}s</h6>
    <template v-for="(question, index) in questions" :key="question.id">
      <h3 v-if="index + 1 == indexPage">
        Q{{ index + 1 }}. {{ question.content }}
      </h3>
      <template v-for="answer in answers" :key="answer.id">
        <div
          class="answer"
          v-if="answer.questionId == question.id && index + 1 == indexPage"
        >
          <button class="btnAnswer" @click="handleAnswer(answer.content)">
            {{ answer.content }}
          </button>
        </div>
      </template>
    </template>
    <button id="submitBtn" @click="handleSubmitExam">Submit</button>
    <br />
    <div class="tab" v-for="num in numOfQuestion" :key="num">
      <button id="index" @click="handleIndexPage(num)">{{ num }}</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "QuizExam",
  data() {
    return {
      courseId: this.$route.params.id,
      courses: {
        id: 0,
        name: "",
        descript: "",
        total_time: 0,
        valid: 0,
      },
      questions: {
        id: 0,
        type: "",
        content: "",
        correct_answer: "",
        course_id: 0,
      },
      answers: null,
      corrects: [],
      countClick: 0,
      userInformation: {
        username: "",
        password: "",
      },
      result: {
        mark: 0,
        status: 0,
        userID: 0,
        courseID: this.$route.params.id,
      },
      timerCount: 0,
      numOfQuestion: 0,
      indexPage: 0,
    };
  },
  async created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
    this.userInformation = JSON.parse(localStorage.getItem("data"));

    const rs = await axios.get("http://localhost:8000/users");
    const users = rs.data;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === this.userInformation.username) {
        this.result.userID = users[i].id;
      }
    }
    //  console.log(this.userID)
  },
  async mounted() {
    this.indexPage = 1;
    let countQuestion = 0;
    const resQuestion = await axios.get(`/questions/${this.courseId}`);
    this.questions = resQuestion.data;
    this.shuffle(this.questions)
    for (let i = 0; i < resQuestion.data.length; i++) {
      this.corrects.push(resQuestion.data[i].correct_answer);
      countQuestion++;
    }
    this.numOfQuestion = countQuestion;
    const resCourse = await axios.get(`/courses/${this.courseId}`);
    this.courses = resCourse.data;
    this.timerCount = this.courses.total_time * 60;

    const resAnswer = await axios.get(`/answers/${this.courseId}`);
    this.answers = resAnswer.data;
     this.shuffle(this.answers)
  },
  methods: {
    shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    },
    handleAnswer(answer) {
      console.log(answer);
      for (let i = 0; i < this.corrects.length; i++) {
        if (
          this.corrects[i] === answer &&
          this.result.mark <= 100 - 100 / this.numOfQuestion
        ) {
          this.result.mark += Math.round(100 / this.numOfQuestion);
        }
      }
    },
    async handleSubmitExam() {
      if (this.result.mark >= 80) {
        this.result.status = 1;
      }
      const response = await axios.post("results", this.result);
      console.log(response);
      console.log(this.result.courseID);
      this.$router.push("/course/result");
    },
    handleIndexPage(num) {
      this.indexPage = num;
    },
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
            if (this.timerCount == 0) {
              this.handleSubmitExam();
            }
          }, 1000);
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  margin-top: 60px;
  width: 650px;
  height: 520px;
}

.btnAnswer {
  width: 600px;
  margin-top: 20px;
  height: 50px;
  border-radius: 20px;
  letter-spacing: 2px;
  background-color: rgb(255, 248, 238);
}

h3 {
  font-weight: 200;
  font-size: 24px;
  color: rgb(175, 76, 76);
}

.header {
  margin: 20px 20px;
  font-weight: 600;
  color: rgb(40, 40, 194);
}
#time {
  margin-left: 490px;
  margin-top: -20px;
  color: red;
}

h4 {
  color: #925fe4;
  font-family: "Raleway", sans-serif;
  font-size: 21px;
  font-weight: 800;
  line-height: 72px;
  text-transform: uppercase;
}

#submitBtn {
  margin-top: 20px;
  border-radius: 5px;
  background-color: rgb(148, 184, 95);
  color: white;
}

.id_question:active {
  background-color: red;
}

.btnAnswer:hover {
  background-color: rgb(100, 187, 100);
}

.tab {
  display: inline-block;
  margin-top: 10px;
  margin-left: 12px;
}

#index {
  background: cadetblue;
  color: white;
  border-radius: 12px;
  border: white;
  padding: 6px 10px;
}

h6 {
  color: red;
}
</style>