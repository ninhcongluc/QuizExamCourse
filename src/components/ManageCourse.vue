<template>
  <div class="container">
    <div class="text">
      <h1>Manage Courses</h1>
      <span><small class="smallText">To mange courses by admin</small></span>
    </div>
    <a href="/admin/add_course"><i class="fas fa-book"> Create Course</i></a>
    <table class="table table-bordered table">
      <thead >
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Descript</th>
          <th scope="col">Total Time</th>
          <th scope="col">Valid</th>
          <th scope="col">Tools</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses" :key="course.id">
          <th scope="row">{{ course.id }}</th>
          <td>{{ course.name }}</td>
          <td>{{ course.descript }}</td>
          <td>{{ course.total_time }}</td>
          <td>{{ course.valid }}</td>
          <td class="btn">
            <button @click="handleUpdate(course.id)" id="btnUpdate">
              Update
            </button>
            <button @click="handleDelete(course.id)" id="btnDelete">
              Delete
            </button>
            <button @click="manageQuestion(course.id)" id="btnQA">
              Q/A
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ManageCourse",
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
    async handleUpdate(id) {
      this.$router.push(`/admin/update_course/${id}`);
    },

    async handleDelete(id) {
      await axios.delete(`/courses/delete/${id}`);
      this.$router.push("/admin/courses");
    },
    manageQuestion(id) {
      this.$router.push(`/admin/qa/${id}`);
    }
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
.text {
  text-align: center;
}
.btn {
  border-radius: 20%;
}

#btnUpdate {
  background-color: green;
  border-radius: 15%;
  color: white;
}

#btnDelete {
  background-color: red;
  border-radius: 15%;
  margin-left: 10px;
  color: white;
}

#btnQA {
  background-color: #bf7d78;
  border-radius: 15%;
  margin-left: 10px;
  color: white;

}

.smallText {
  font-style: italic;

}

h1 {
  color: rgb(172, 72, 133);
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
thead th {
  color: rgb(172, 72, 133);
}
</style>