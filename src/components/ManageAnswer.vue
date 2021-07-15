<template>
  <div class="container">
    <h3>Manage Answers Page</h3>
    <p class="smallText">This page to manage answers in question</p>
    <br />
    <a :href="'/admin/add_answer/' + questionId">Create Answer</a>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Content</th>
          <th scope="col">Tools</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(a, index) in answers" :key="a.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ a.content }}</td>
          <td>
            <button @click="handleUpdate(a.id)" id="editBtn" class="btn">
              <i class="fas fa-pen"></i>
            </button>
            <button @click="handleDelete(a.id)" id="deleteBtn" class="btn">
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <a :href="'/admin/qa/' + courseId"
      ><i class="fas fa-backward"></i> Back to QA Page</a
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ManageQA",
  data() {
    return {
      questionId: this.$route.params.id,
      answers: null,
      courseId: 0,
    };
  },
  async mounted() {
    const resAnswers = await axios.get(`/admin/answers/${this.questionId}`);
    this.answers = resAnswers.data;
    this.courseId = this.answers[0].courseId;
  },
  methods: {
    handleUpdate(id) {
      this.$router.push(`/admin/update_answer/${id}`);
    },

    async handleDelete(id) {
      let isDelete = confirm(
        "Are you sure to delete? (Can lose a lot of data)"
      );
      if (isDelete) {
        await axios.delete(`/admin/delete_answer/${id}`);
        this.$router.go(`/admin/answer/${this.questionId}`);
      } else {
        this.$router.go(`/admin/answer/${this.questionId}`);
      }
    },
  },
};
</script>
<style scoped>
.btn {
  margin-left: 5px;
  border: 1px solid rgb(119, 70, 70);
}

#editBtn {
  background: rgb(106, 207, 106);
}

#deleteBtn {
  background: rgb(241, 86, 86);
}

h3 {
  color: rgb(236, 101, 77);
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  text-align: center;
}
.smallText {
  font-style: italic;
  text-align: center;
  font-size: 14px;
}
</style>