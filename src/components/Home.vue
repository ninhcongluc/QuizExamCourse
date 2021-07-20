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

  <div id="award">
    <h4>
      <i class="fas fa-trophy"></i> Ranking of members with high achievements<i class="fas fa-trophy"></i>
    </h4>
    <br />
    <select
      id="select_tag"
      name="listCourse"
      @change="onChange($event)"
      v-model="course_id"
    >
      <template v-for="course in courses" :key="course.id">
        <option
          class="select_value"
          v-if="course.status == 1"
          :value="course.id"
        >
          {{ course.name }}
        </option>
      </template>
    </select>
    <table id="table_data" class="table">
      <thead class="table_header">
        <tr>
         
         <th scope="col">Full Name</th>
          <th scope="col">Date</th>
          <th scope="col">Mark</th>
          <th scope="col">Completed Time</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="result in results" :key="result.id">
          <tr v-if="course_id == result.cId">
            
            <template v-for="user in users" :key="user.id">
              <td v-if="user.id == result.uId"><i class="fas fa-medal"></i> {{ user.fullname }}</td>
            </template>
            <td>{{ result.date.substr(0, 10) }}</td>
            <td>{{ result.mark }} Đ</td>
            <td>
              {{ new Date(result.time * 1000).toISOString().substr(11, 8) }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
   
<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      courses: null,
      results: null,
      users: null,
      userInformation: {
        username: "",
        password: "",
      },
      userID: 0,
      course_id: 0,
      count_index: 1,
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
  async mounted() {
    // get all courses
    const listCourses = await axios.get("/courses");
    this.courses = listCourses.data;
    this.course_id = this.courses[0].id;
    // get result by des
    const listResults = await axios.get("/results");
    this.results = listResults.data;
    // get all users
    const listUser = await axios.get("/users");
    this.users = listUser.data;
    // if equal mark, sort by time 
    this.sortArrByTime(this.results)
  },
  methods: {
    async handleLogout() {
      localStorage.clear();
      this.$router.push("/");
    },
    onChange(event) {
      console.log(event.target.value);
      this.count_index = 1;
    },
    sortArrByTime(arr) {
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          if (arr[j].time > arr[j+1].time && arr[j].mark == arr[j+1].mark) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }
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
  top: 115px;
  font-size: 35px;
  color: white;
  padding: 6px 12px;
  transition: all 0.5s;
  position: fixed;
}
label #cancel {
  z-index: 1111;
  left: -195px;
  top: 110px;
  font-size: 30px;
  color: rgb(120, 184, 214);
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

#award {
  width: 50%;
  height: 600px;
  margin-left: 30%;
  text-align: center;
}

#table_data {
  margin-top: 20px;
}

#select_tag {
  width: 100px;
  height: 30px;
  background: rgb(120, 184, 214);
  color: rgb(187, 34, 105);
  border-radius: 5px;
}

h4 {
  letter-spacing: 1.2px;
  color: rgb(120, 184, 214);
}
.table_header {
  background-color:rgb(120, 184, 214) ;
}
</style>