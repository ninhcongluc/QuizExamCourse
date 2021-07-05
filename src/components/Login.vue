<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="handleSubmit" action="">
        <h3>Login <i id = "loginFont"  class="fas fa-sign-in-alt"></i></h3>
        <label id="errMess" for=""></label>
        <div class="form-group">
          <label for="">Username <i id = "userFont" class="far fa-user"></i></label>
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="username"
          />
          <label id="errUsername" for=""></label>
        </div>

        <div class="form-group">
          <label for="">Password <i id = "passFont" class="fas fa-unlock-alt"></i></label>
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
    };
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
                //   console.log(res.config.data.includes("admin"))
                if (res.config.data.includes("admin")) {
                  this.$router.push("/admin");
                } else {
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


#userFont, #passFont , #loginFont { 
    color : pink;
}
</style>