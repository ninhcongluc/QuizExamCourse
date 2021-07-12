<template>
  <span
    ><small
      ><i class="fas fa-users-cog"></i> {{ userInformation.username }}</small
    ></span
  >
  <div class="home">
    <input type="checkbox" id="check" />
    <label for="check">
      <i class="fas fa-bars" id="bar"></i>
      <i class="fas fa-times" id="cancel"></i>
    </label>

    <div class="sidebar">
      <header>My Course</header>
      <ul>
        <li>
          <a href="/course"><i class="fas fa-quran"> Course</i></a>
        </li>
        <li>
          <a :href="'/detail/' + userID"
            ><i class="fas fa-question-circle"> Quiz Detail</i></a
          >
        </li>
        <li>
          <a @click="handleLogout"><i class="fas fa-sign-in-alt"> Logout</i></a>
        </li>
      </ul>
    </div>
  </div>

  <img src="../assets/doraemon.jpg" alt="img" />
</template>


 
 
    


<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      courses: [],
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
    } else {
      // console.log(localStorage.getItem('data'))
      this.userInformation = JSON.parse(localStorage.getItem("data"));

      const rs = await axios.get("http://localhost:8000/users");
      const users = rs.data;
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === this.userInformation.username) {
          this.userID = users[i].id;
        }
      }
    }
  },
  methods: {
    async handleLogout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
.sidebar {
  position: fixed;
  left: -250px;
  width: 250px;
  height: 100%;
  background: #042331;
  transition: all 0.5s ease;
}
.sidebar header {
  font-size: 22px;
  color: white;
  text-align: center;
  line-height: 70px;
  background: #063146;
  user-select: none;
}

.sidebar ul a {
  display: block;
  height: 100%;
  width: 100%;
  line-height: 65px;
  font-size: 25px;
  color: white;
  padding-left: 40px;
  box-sizing: border-box;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid black;
  transition: 0.4s;
}

ul li:hover a {
  padding-left: 50px;
}
.sidebar ul a i {
  margin-right: 16px;
}

#check {
  display: none;
}
label #bar,
label #cancel {
  position: absolute;
  cursor: pointer;
  background: #042331;
}
label #bar {
  left: 35px;
  top: 155px;
  font-size: 35px;
  color: white;
  padding: 6px 12px;
  transition: all 0.5s;
  position: fixed;
}
label #cancel {
  z-index: 1111;
  left: -195px;
  top: 180px;
  font-size: 30px;
  color: #0a5275;
  padding: 4px 9px;
  transition: all 0.5s ease;
  position: fixed;
}

#check:checked ~ .sidebar {
  left: 0;
}

#check:checked ~ label #bar {
  left: 250px;
  opacity: 0;
  pointer-events: none;
}
#check:checked ~ label #cancel {
  left: 195px;
}

small {
  margin-left: 80%;
  font-style: bold;
  font-size: 24px;
  color: transparent;
  text-shadow: 0 0 0.5px rgba(223, 26, 26, 0.5);
}
img {
  width: 640px;
  height: 360px;
  margin-left: 30%
}
</style>