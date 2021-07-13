<template>
  <div class="container">
    <div class="text">
      <h1>Manage Users</h1>
      <span><small class="smallText">To mange users by admin</small></span>
    </div>
    <a href="/admin/add_user"><i class="fas fa-users">Create User</i></a>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">Password</th>
          <th scope="col">Email</th>
          <th scope="col">FullName</th>
          <th scope="col">Admin</th>
          <th scope="col">Position</th>
          <th scope="col">Tools</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" v-bind:key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.username }}</td>
          <td>{{ user.password.slice(4, 10) }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.fullname }}</td>
          <td>{{ user.admin }}</td>
          <td>{{ user.position }}</td>
          <td class="btn">
            <button @click="handleUpdate(user.id)" id="btnUpdate">
              Update
            </button>
            <button @click="handleDelete(user.id)" id="btnDelete">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ManageUser",
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      users: [],
      selectedId: 0,
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8000/users");
    this.users = response.data;
  },
  methods: {
    async handleUpdate(id) {
      this.$router.push(`/admin/update_user/${id}`);
    },

    async handleDelete(id) {
      const res = await axios.delete(`/users/delete/${id}`);
      console.log(res);
      this.$router.push("/admin/courses");
    },
  },
};
</script>

<style scoped>
.text {
  text-align: center;
}
.btn {
  border-radius: 20%;
}

#btnUpdate {
  background-color: green;
  border-radius: 15%;
  color: white;
}

#btnDelete {
  background-color: red;
  border-radius: 15%;
  margin-left: 10px;
  color: white;
}

.smallText {
  font-style: italic;
}

h1 {
  color: rgb(161, 111, 111);
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
</style>