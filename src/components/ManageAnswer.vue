<template>
<div class="container">
  <h3>Manage Answers Page</h3>
   <p class="smallText">This page to manage answers in question</p>
  <br>
  <a href="/admin/add_answer">Create Answer</a>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Content</th>
      <th scope="col">Tools</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(a,index) in answers" :key="a.id">
      <th scope="row">{{index + 1}}</th>
      <td>{{a.content}}</td>

      <td>
        <button id="editBtn" class="btn"><i class="fas fa-pen"></i></button>
        <button id="deleteBtn" class="btn"><i class="far fa-trash-alt"></i></button>
      </td>
    </tr>
  </tbody>
</table>

</div>

</template>

<script>
import axios from 'axios'
export default {
  name: "ManageQA",
  data() {
    return {
      questionId: this.$route.params.id,
      answers : null

    }
  },
  async mounted() {
      const resAnswers = await axios.get(`/admin/answers/${this.questionId}`);
      this.answers = resAnswers.data

  },
  methods : {
  }
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