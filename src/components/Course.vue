<template>
  <div>
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <a class="nav-link active" href="/home"
          ><i class="fas fa-hand-point-left"></i> Back Home</a
        >
      </li>
    </ul>
    <table id="courses">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Descript</th>
        <th>Time</th>
        <th>Valid</th>
        <th>Exam</th>
      </tr>
      <template v-for="(course, index) in courses" :key="course.id">
        <tr v-if="course.status == 1">
          <td>{{ index + 1 }}</td>
          <td>{{ course.name }}</td>
          <td>{{ course.descript }}</td>
          <td>{{ course.total_time }} phút</td>
          <td>{{ course.valid }}</td>
          <td id="exam">
            <button @click="handleStart(course.id)">Start</button>
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Course",
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      courses: [],
    };
  },
  methods: {
    handleStart(id) {
      this.$router.push(`/course/quiz/${id}`);
    },
  },
  mounted() {
    axios
      .get("/courses")
      .then((response) => {
        this.courses = response.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>


<style scoped>
#courses {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#courses td,
#courses th {
  border: 1px solid #ddd;
  padding: 8px;
}

#courses tr {
  background-color: #f2f2f2;
}

#courses tr:hover {
  background-color: #ddd;
}

#courses th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}

button {
  border-radius: 0.3rem;
  width: 50px;
  background-color: rgb(94, 94, 173);
  color: white;
}

button:hover {
  background-color: rgb(182, 74, 74);
}
#exam {
  text-align: center;
}

.nav-link {
  color: #04aa6d;
}
</style>