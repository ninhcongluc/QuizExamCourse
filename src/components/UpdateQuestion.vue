<template>
  <div class="auth-wrapper">
    <div  class="auth-inner">
      <form @submit.prevent="handleUpdate" action="">
        <h3>Update Question Page</h3>
        <input type="hidden" id="id" name="id" v-model="id">

        <span><small>Question updated by admintor</small></span>
        <div class="form-group">
          <label for="">Type</label>
          <input type="text" name="type" v-model="question.type" class="form-control" />
        </div>
        <div class="form-group">
          <label for="">Content</label>
          <input type="text" name="content" v-model="question.content"   class="form-control" />
        </div>

        <div class="form-group">
          <label for="">Correct Answer</label>
          <input type="text" name="correct_answer" v-model="question.correct_answer"  class="form-control" />
        </div>

        <div class="form-group">
          <label for="">Course ID</label>
          <input  type="text" name="course_id" v-model="question.course_id" class="form-control"  disabled="disabled" />
        </div>
        <button class="btn btn-primary btn-block">Update</button>
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
      question: {
          id: this.$route.params.id ,
          type: "",
          content: "",
          correct_answer : "",
          course_id : 0,
      },


    };
  },
  async mounted() {
    const response = await axios.get(`/question/${this.question.id}`);
    this.question = response.data
    console.log(response.data)
    
  },
  methods: {
      async handleUpdate() {
        const res = await axios.put('/question/update',   this.question)
        console.log(res)
        this.$router.go(-1)
       
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