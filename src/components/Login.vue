<template>
  <nav id="navbar_1" class="navbar navbar-expand-lg navbar-light bg-light">
    <a id="title" class="navbar-brand" href="/home">Home</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/"
            >Login<span class="sr-only">(current)</span></a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/register">Sigup</a>
        </li>
      </ul>
    </div>
  </nav>
  <br /><br />

  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="handleSubmit" action="">
        <h3>Login <i id="loginFont" class="fas fa-sign-in-alt"></i></h3>
        <label id="errMess" for=""></label>
        <div class="form-group">
          <label for=""
            >Username <i id="userFont" class="far fa-user"></i
          ></label>
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="username"
          />
          <label id="errUsername" for=""></label>
        </div>

        <div class="form-group">
          <label for=""
            >Password <i id="passFont" class="fas fa-unlock-alt"></i
          ></label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            v-on:keyup.enter="passHandle"
            placeholder="Password"
          />
        </div>
        <label id="errPass" for=""></label>
        <button class="btn btn-primary btn-block">Login</button>
        <button  class="btn btn-primary btn-block" @click="sigUpWithFacebook"><i class="fab fa-facebook"></i> Login with Facebook</button>
        <br />
        <a href="/register"
          ><i class="fas fa-user-plus"></i> Register to become a member</a
        >
        <br>
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      users: null,
      isAdmin : 0
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8000/users");
    this.users = response.data;
  },
  methods: {
    passHandle() {
      let passInvalid = document.getElementById("errPass");
      if (this.password.length < 5) {
        passInvalid.innerHTML = "Pass must be more than 5 characters";
      }
    },
    async handleSubmit() {
      let nameInvalid = document.getElementById("errUsername");
      if (this.username.length < 5) {
        nameInvalid.innerHTML = "Username must be more than 5 characters";
        return;
      } else {
        axios
          .post("login", {
            username: this.username,
            password: this.password,
          })
          .then(
            (res) => {
              //if successfull
              if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("data", res.config.data);
                const username = JSON.parse(res.config.data).username
                for(let i = 0 ; i < this.users.length; i++) {
                  if(this.users[i].username == username) {
                        this.isAdmin = this.users[i].admin
                  }
                }
                if(this.isAdmin == 1) {
                   this.$router.push("/admin");
                }
                else {
                  this.$router.push("/home");
                }
              }
            },
            (err) => {
              let errMessage = document.getElementById("errMess");
              errMessage.innerHTML = "Username or password incorrect";

              this.error = err.response.data.error;
            }
          );
      }
    },
    signUpWithFacebook() {
       

    }
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

#errUsername,
#errMess,
#errPass {
  color: rgb(187, 59, 59);
  font-size: 13px;
  font-style: italic;
}

#userFont,
#passFont,
#loginFont {
  color: pink;
}

#navbarSupportedContent {
  margin-left: 85%;
  margin-right: 0px;
}

#title {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 23px;
  margin-left: 15px;
}
</style>