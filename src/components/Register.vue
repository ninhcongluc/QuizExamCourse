<template>
  <form @submit.prevent="handleSubmit" action="">
    <h3>Sign up</h3>
    <div class="form-group">
      <label for="">Username</label>
      <input
        type="text"
        v-model="username"
        class="form-control"
        placeholder="Username"
      />
    </div>
    <div class="form-group">
      <label for="">Password</label>
      <input
        type="password"
        v-model="password"
        class="form-control"
        placeholder="Password"
      />
    </div>
    <div class="form-group">
      <label for="">Confirm Password</label>
      <input
        type="password"
        class="form-control"
        v-model="password_confirm"
        placeholder="Confirm Password"
      />
    </div>

    <div class="form-group">
      <label for="">Email</label>
      <input
        type="text"
        v-model="email"
        class="form-control"
        placeholder="Email"
      />
    </div>

    <div class="form-group">
      <label for="">Fullname</label>
      <input
        type="text"
        class="form-control"
        v-model="full_name"
        placeholder="Full Name"
      />
    </div>
    <div class="form-group">
      <label for="">Admin</label>
      <input type="text" class="form-control" v-model="admin" placeholder="0" />
    </div>
    <div class="form-group">
      <label for="">Position</label>
      <input
        type="text"
        class="form-control"
        v-model="position"
        placeholder="Dev"
      />
    </div>

    <button class="btn btn-primary btn-block">Sign up</button>
  </form>
</template>


<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      email: "",
      full_name: "",
      admin: 0,
      position: "",
    };
  },
  methods: {
    async handleSubmit() {
      const response = await axios.post("register", {
        username: this.username,
        password: this.password,
        email: this.email,
        full_name: this.full_name,
        admin: this.admin,
        position: this.position,
      });
      console.log(response);
 
    },
  },
};
</script>