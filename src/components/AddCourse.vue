<template>
  <div class="container">
    <h1>Add Course Page</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="exampleInputEmail1">Course Name</label>
        <input
          type="text"
          v-model="name"
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
          v-model="descript"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Descript about course"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Total Time</label>
        <input
          type="text"
          v-model="total_time"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Time to complete Course"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Valid</label>
        <input
          type="text"
          v-model="valid"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Maximum number of participations"
        />
      </div>

      <button type="submit" class="btn btn-primary">Create</button>
    </form>
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
      name: "",
      descript: "",
      total_time: 0,
      valid: 0,
    };
  },

  methods: {
    async handleSubmit() {
      const response = axios.post("/courses", {
        name: this.name,
        descript: this.descript,
        total_time: this.total_time,
        valid: this.valid,
      });
      console.log(response);
      this.$router.push("/admin/courses");
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