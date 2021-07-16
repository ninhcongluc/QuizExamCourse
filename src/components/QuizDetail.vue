<template>
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <a class="nav-link active" href="/home"><i class="fas fa-hand-point-left"></i> Back Home</a>
      </li>
    </ul>
  <div class="container">
    <h3>Your Test Exam History <i class="fas fa-history"></i></h3>
    <template v-for="rs in results" :key="rs.id">
      <div class="content">
        <p id="date">Date : {{ rs.date }}</p>
        <template v-for="c in courses" :key="c.id"> 
             <p id="course_id" v-if="rs.cId == c.id">Course: {{ c.name }}</p>  
        </template>
    
        <p id="mark">Mark: {{ rs.mark }}/100</p>
        <p class="status" v-if="rs.status == 1">
          Status: <small id="passed">PASSED</small>
        </p>
        <p class="status" v-if="rs.status != 1">
          Status: <small id="not_passed">NOT PASS</small>
        </p>
      </div>
    </template>
    <div class="link">
      <a id="back_link" href="/course">Keep taking the test</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "QuizDetail",
  data() {
    return {
      userID: this.$route.params.id,
      results: null,
      courses : null
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
  },
  async mounted() {
    const datas = await axios.get(`/detail/${this.userID}`);
    this.results = datas.data;
    const courses =  await axios.get(`/courses`);
    this.courses = courses.data
  },
};
</script>

<style scoped>
.content {
  margin-top: 30px;
  width: 700px;
  height: 80px;
  border: 1px solid black;
  background-color: rgb(223, 202, 202);
}
#date {
  color: rgb(20, 20, 230);
}
#course_id {
  color: rgb(190, 82, 142);
}

#back_link {
  color: blueviolet;
}
.link {
  margin-top: 10px;
}

#mark {
  margin-left: 500px;
  margin-top: -80px;
  color: rgb(133, 133, 133);
}
.status {
  margin-left: 500px;
  margin-top: 30px;
}
#passed {
  color: rgb(66, 223, 66);
  font-size: 20px;
  font-style: inherit;
}
#not_passed {
  color: red;
  font-size: 20px;
  font-style: inherit;
}

h3 {
  background-color: beige;
  color: tomato;
}

.nav-link {
  color: rgb(177, 102, 88);
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>