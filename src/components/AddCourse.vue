<template>
  <div class="container">
    <h1>Add Course Page</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="exampleInputEmail1">Course Name</label>
        <input
          type="text"
          v-model="course.name"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter name"
        />
        <small id="emailHelp" class="form-text text-muted"
          >name can not duplicate</small
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Description</label>
        <input
          type="text"
          v-model="course.descript"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Descript about course"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Total Time</label>
        <input
          type="text"
          v-model="course.total_time"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Time to complete Course"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Valid</label>
        <input
          type="text"
          v-model="course.valid"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Maximum number of participations"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Status</label>
        <select class="custom-select" id="inputGroupSelect01" v-model="course.status">
          <option value="0" selected>Close</option>
          <option value="1">Open</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Create</button>
    </form>

    <a href="/admin/courses"><i class="fas fa-backward"></i> Back to Course</a>
  </div>
</template>
  
  <script>
import axios from "axios";
export default {
  name: "AddCourse",
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      course : {
        name : "",
        descript : "",
        total_time : 0,
        valid: 0,
        status : 0
      }
    };
  },

  methods: {
    async handleSubmit() {
      console.log(this.course.status)
      const response = axios.post("/courses", this.course);
      console.log(response);
      this.$router.go("/admin/add_course");
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