<template>
  <div class="auth-wrapper">
    <div  class="auth-inner">
      <form @submit.prevent="handleUpdate" action="">
        <h3>Update Course Page</h3>
        <input type="hidden" id="id" name="id" v-model="id">

        <span><small>Course updated by admintor</small></span>
        <div class="form-group">
          <label for="">Name</label>
          <input type="text" name="name" v-model="course.name" class="form-control" />
        </div>
        <div class="form-group">
          <label for="">Descript</label>
          <input type="text" name="descript" v-model="course.descript"   class="form-control" />
        </div>

        <div class="form-group">
          <label for="">Total Time</label>
          <input type="text" name="total_time" v-model="course.total_time"  class="form-control" />
        </div>

        <div class="form-group">
          <label for="">Valid</label>
          <input type="text" name="valid" v-model="course.valid" class="form-control"   />
        </div>
        <div class="form-group">
        <label for="exampleInputPassword1">Status</label>
        <select class="custom-select" id="inputGroupSelect01" v-model="course.status">
          <option value="0" >Close</option>
          <option value="1" :selected = "course.status == 1" >Open</option>
        </select>
      </div>
        <button class="btn btn-primary btn-block">Update Course</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UpdateCourse",
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      course: {
          name: "",
          descript: "",
          total_time : 0,
          valid : 0,
          status: 0
      },
      id: this.$route.params.id ,

    };
  },
  async mounted() {
    console.log(`id = ${this.id}`);
    const response = await axios.get(`/courses/${this.id}`);
    this.course = response.data
    
  
  },
  methods: {
      async handleUpdate() {
        const res = await axios.put('/courses/update',   this.course)
        console.log(res)
        this.$router.push("/admin/courses");
       
      }

  },
};
</script>

<style scoped>
.auth-wrapper .form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}
.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}
</style>