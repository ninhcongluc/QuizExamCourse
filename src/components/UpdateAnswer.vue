<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="handleUpdate" action="">
        <h3>Update Answer Page</h3>
        <div class="form-group">
          <label for="">Content</label>
          <input
            type="text"
            name="content"
            v-model="answer.content"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="">Q.ID</label>
          <input
            type="text"
            name="questionId"
            v-model="answer.questionId"
            class="form-control"
            disabled = "disabled"
          />
        </div>
        <div class="form-group">
          <label for="">C.ID</label>
          <input
            type="text"
            name="courseId"
            v-model="answer.courseId"
            class="form-control"
            disabled = "disabled"
          />
        </div>
        <button class="btn btn-primary btn-block">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UpdateAnswer",
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      answer: {
        id: this.$route.params.id,
        content: "",
        questionId: 0,
        courseId: 0
      },
    };
  },
  async mounted() {
    const response = await axios.get(`/answer/${this.answer.id}`);
    this.answer = response.data;
    console.log(response.data);
  },
  methods: {
    async handleUpdate() {
      const res = await axios.put("/answer/update", this.answer);
      console.log(res);
      this.$router.go(-1);
    },
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