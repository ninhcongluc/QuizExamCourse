<template>
  <div class="container">
    <h4>Exam Test Topic: {{ courses.name }}</h4>
    <p id="time">Times: {{ courses.total_time }}'</p>

    <template v-for="(question, index) in questions" :key="question.id">
      <h3 v-if="question.id == questionId">
        Q{{ index + 1 }}. {{ question.content }}
      </h3>
    </template>
    <template v-for="answer in answers" :key="answer.id">
      <div class="answer" v-if="answer.questionId == questionId">
        <button class="btnAnswer" @click="handleAnswer(answer.content)">
          {{ answer.content }}
        </button>
      </div>
    </template>
    <button id="submitBtn" @click="handleSubmitExam" v-if="questionId % 5 == 0">Submit</button>
    <div class="tab">
      <button class="id_question" @click="handleQ1">1</button>
      <button class="id_question" @click="handleQ2">2</button>
      <button class="id_question" @click="handleQ3">3</button>
      <button class="id_question" @click="handleQ4">4</button>
      <button class="id_question" @click="handleQ5">5</button>
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
      questionId: this.courseId * 5 - 4,
      corrects: [],
      mark: 0,
      countClick: 0,
      userInformation : {
        username : "",
        password : ""
      },
      result: {
        mark : 0,
        status: 0,
        userID: 0,
        courseID: this.$route.params.id
      }
    };
  },
  async created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
    this.userInformation = JSON.parse(localStorage.getItem('data'))

     const rs = await axios.get("http://localhost:8000/users");
     const users = rs.data
     for(let i = 0; i < users.length; i++ ) {
       if(users[i].username === this.userInformation.username) {
         this.result.userID = users[i].id
       }

     }
    //  console.log(this.userID)


  },
  async mounted() {
    this.questionId = this.courseId * 5 - 4;
    const resQuestion = await axios.get(`/questions/${this.courseId}`);
    this.questions = resQuestion.data;
    for (let i = 0; i < resQuestion.data.length; i++) {
      this.corrects.push(resQuestion.data[i].correct_answer);
    }
    const resCourse = await axios.get(`/courses/${this.courseId}`);
    this.courses = resCourse.data;

    const resAnswer = await axios.get(`/answers/${this.courseId}`);
    this.answers = resAnswer.data;
  },
  methods: {
    handleQ1() {
      this.questionId = this.courseId * 5 - 4;
    },
    handleQ2() {
      this.questionId = this.courseId * 5 - 4 + 1;
    },
    handleQ3() {
      this.questionId = this.courseId * 5 - 4 + 2;
    },
    handleQ4() {
      this.questionId = this.courseId * 5 - 4 + 3;
    },
    handleQ5() {
      this.questionId = this.courseId * 5 - 4 + 4;
    },
    handleAnswer(answer) {
      console.log(answer);
      for (let i = 0; i < this.corrects.length; i++) {
        if (this.corrects[i] === answer && this.result.mark <= 80) {
          this.result.mark += 20;
        }
      }
    },

    async handleSubmitExam() {
      if(this.result.mark >= 80) {
        this.result.status = 1
      }
      const response = await axios.post("results", this.result);
      console.log(response);
      console.log(this.result.courseID)
      this.$router.push("/course/result");
    }
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

.tab {
  margin-top: 25px;
  margin-left: 15px;
}

.id_question {
  margin-left: 7px;
  border-radius: 20px;
  background-color: rgb(110, 94, 167);
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
</style>