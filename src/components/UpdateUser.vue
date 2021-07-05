<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="handleUpdate" action="">
        <h3>Update User Page</h3>
        <input type="hidden" id="id" name="id" v-model="id" />

        <span><small>User updated by admintor</small></span>
        <div class="form-group">
          <label for="">Username</label>
          <input
            type="text"
            name="username"
            v-model="user.username"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="">Password</label>
          <input
            type="password"
            name="password"
            v-model="user.password"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="">Email</label>
          <input
            type="text"
            name="email"
            v-model="user.email"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="">Fullname</label>
          <input
            type="text"
            name="fullname"
            v-model="user.fullname"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="">Admin</label>
          <input
            type="text"
            name="admin"
            v-model="user.admin"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="">Position</label>
          <input
            type="text"
            name="position"
            v-model="user.position"
            class="form-control"
          />
        </div>

        <button class="btn btn-primary btn-block">Update User</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UpdateUser",
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
        email: "",
        fullname: "",
        admin: 0,
        position: "",
      },
      id: this.$route.params.id,
    };
  },
  async mounted() {
    console.log(`id = ${this.id}`);
    const response = await axios.get(`/users/${this.id}`);
    this.user = response.data;
    this.username = this.user.username;
  },
  
  methods: {
    async handleUpdate() {
      const res = await axios.put("/users/update", this.user);
      console.log(res);
      this.$router.push("/admin/users");
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