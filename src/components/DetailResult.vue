<template>
  <div class="container">
    <p>
      Thankiu, you have done your test. Click here to see your result
      <i class="far fa-smile-wink"></i>
    </p>
    <button @click="showPageResult">Show Result</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DetailResult",
  data() {
    return {
      userInformation: {
        username: "",
        password: "",
      },
      userID: 0,
    };
  },
  async created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }

    this.userInformation = JSON.parse(localStorage.getItem("data"));

    const rs = await axios.get("http://localhost:8000/users");
    const users = rs.data;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === this.userInformation.username) {
        this.userID = users[i].id;
      }
    }
  },
  methods: {
    showPageResult() {
      this.$router.push(`/detail/${this.userID}`);
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}

p {
  color: rgb(137, 137, 199);
  font-size: 24px;
}

button {
  color: white;
  border-radius: 5px;
  background-color: greenyellow;
}
</style>