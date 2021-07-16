<template>
<nav id="navbar_1" class="navbar navbar-expand-lg navbar-light bg-light">
  <a id="title" class="navbar-brand" href="/home">Home</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Login<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/register">Sigup</a>
      </li>
    </ul>


  </div>

</nav>
  <div class="auth-wrapper">
    <div class="auth-inner">
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
            v-model="fullName"
            placeholder="Full Name"
          />
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
    </div>
  </div>
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
      fullName: "",
      position: "",
    };
  },
  methods: {
    async handleSubmit() {
      const response = await axios.post("register", {
        username: this.username,
        password: this.password,
        email: this.email,
        fullName: this.fullName,
        position: this.position,
      });
      console.log(response);
      this.$router.push("/");
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

#navbarSupportedContent {
  margin-left: 85% ;
  margin-right: 0px;
}

#title { 
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 23px;
  margin-left:15px ;
}
</style>