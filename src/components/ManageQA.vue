<template>
  <div class="container">
    <h3>QA Manager Page</h3>
    <p class="smallText">This page to manage question in course</p>
    <a :href="'/admin/add_question/' + courseID">Create Question</a>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Type</th>
          <th scope="col">Content</th>
          <th scope="col">Correct Answer</th>
          <th scope="col">Tools</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(q, index) in questions" :key="q.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ q.type }}</td>
          <td>{{ q.content }}</td>
          <td>{{ q.correct_answer }}</td>
          <td>
            <button id="editBtn" @click="handleUpdate(q.id)" class="brn">
              <i class="fas fa-pencil-alt"></i>
            </button>
            <button @click="handleDelete(q.id)" id="deleteBtn" class="btn">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button id="answer_manage" class="btn" @click="manageAnswer(q.id)">
              Answer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <a href="/admin/courses"><i class="fas fa-backward"></i> Back to Course Page</a>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ManageQA",
  data() {
    return {
      courseID: this.$route.params.id,
      questions: null,
    };
  },

  async created() {
    const resQuestion = await axios.get(`/questions/${this.courseID}`);
    this.questions = resQuestion.data;
  },
  methods: {
    manageAnswer(id) {
      this.$router.push(`/admin/answer/${id}`);
    },
    handleUpdate(id) {
      this.$router.push(`/admin/update_question/${id}`);
    },

    async handleDelete(id) {
      await axios.delete(`/admin/delete_question/${id}`);
      await axios.delete(`/admin/delete_answers/${id}`);
      this.$router.go(`/admin/qa/${this.courseID}`);
    },
  },
};
</script>
<style scoped>
.btn {
  margin-left: 5px;
  border: 1px solid rgb(119, 70, 70);
  margin-top: 5px;
}

#editBtn {
  background: rgb(106, 207, 106);
}

#deleteBtn {
  background: rgb(241, 86, 86);
}

#answer_manage {
  background: rgb(16, 16, 218);
  color: white;
  font-size: 15px;
}

h3 {
  color: rgb(83, 163, 168);
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  text-align: center;
}
.smallText {
  font-style: italic;
  text-align: center;
  font-size: 14px;
}
</style>