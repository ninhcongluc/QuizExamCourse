<template>
  <form @submit.prevent="handleSubmit" action="">
    <h3>Sign up</h3>
    <div class="form-group">
      <label for="">First Name</label>
      <input
        type="text"
        v-model="first_name"
        class="form-control"
        placeholder="First name"
      />
    </div>
    <div class="form-group">
      <label for="">Last Name</label>
      <input
        type="text"
        v-model="last_name"
        class="form-control"
        placeholder="Last name"
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
      <label for="">Password</label>
      <input
        type="password"
        class="form-control"
        v-model="passsword"
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
    <button class="btn btn-primary btn-block">Sign up</button>
  </form>
</template>


<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirm: "",
    };
  },
  methods: {
    async handleSubmit() {

     const response = await  axios.post('register',  {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirm: this.password_confirm,
      })
      console.log(response)
      

      this.$router.push('/login')
    },
  },
};
</script>