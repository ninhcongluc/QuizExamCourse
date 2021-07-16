<template>
  <div class="container" v-if="isAdmin == 0">
    <h3>Page for admin only, you are user</h3>
    <a href="/home"><i class="fas fa-backward"></i>Back Home</a>
  </div>
  <div class="container" v-if="isAdmin != 0">
      <a href="/home"><i class="fas fa-home"></i> Home</a>
    <div class="tittle">
      <h2>Admin Page</h2>
    </div>
    <div id="manageUser">
      <a href="/admin/users">Click here to manage users</a>
    </div>
    <div id="manageCourse">
      <a href="/admin/courses">Click here to manage courses</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Admin",
  data() {
    return {
      users: null,
      isAdmin: 0,
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
  },
  async mounted() {
    const response = await axios.get("http://localhost:8000/users");
    this.users = response.data;
    const username = JSON.parse(localStorage.getItem("data")).username;
    console.log(username);
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username == username) {
        this.isAdmin = this.users[i].admin;
      }
    }
    console.log(this.isAdmin);
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  width: 50%;
  margin: auto;
}
h2 {
  margin-top: 30px;
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(185, 115, 129);
}
#manageUser {
  margin-top: 30px;
  width: 100%;
  height: 50px;
  background-color: cadetblue;
}
#manageCourse {
  margin-top: 30px;
  width: 100%;
  height: 50px;
  background-color: cadetblue;
}

a {
  padding: 1em;
  text-align: center;
  display: inline-block;
  text-decoration: none !important;
  margin: 0 auto;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  color: darkblue;
}
</style>