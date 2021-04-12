<template>
  <div class="bg-login">
    <main class="form-signin">
      <h1 class="app-title">Kanban App</h1>
      <form @submit.prevent="login()">
        <h1 class="h3 mb-3 fw-normal">Login</h1>
        <label for="inputemail" class="visually-hidden">email address:</label>
        <input
          type="email"
          v-model="inputEmail"
          class="form-control"
          placeholder="email address"
          required
          autofocus
        />
        <label for="inputpassword" class="visually-hidden">password:</label>
        <input
          type="password"
          v-model="inputPassword"
          class="form-control"
          placeholder="password"
          required
        />
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Login
        </button>
        <p>
          don't have account?
          <a href="#" @click.prevent="changePage('register')">Register Here</a>
        </p>
      </form>
      <GoogleSignIn id="googleButton" :changeAuth="changeAuth"></GoogleSignIn>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import GoogleSignIn from './GoogleSignIn.vue';
export default {
  props: ['changePage', 'changeAuth'],
  data() {
    return {
      inputEmail: '',
      inputPassword: '',
    };
  },

  components: {
    GoogleSignIn,
  },

  methods: {
    login() {
      axios({
        method: 'POST',
        url: 'https://kanban-nyoman.herokuapp.com/users/login',
        data: {
          email: this.inputEmail,
          password: this.inputPassword,
        },
      })
        .then(({ data }) => {
          localStorage.access_token = data.access_token;
          localStorage.username = data.username;
          localStorage.email = data.email;
          localStorage.id = data.id;
          this.changeAuth(true);
          Swal.fire({
            icon: 'success',
            title: `Welcome, ${data.username}`,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: `${err.response.data.msg}`,
          });
        })
        .then(() => {
          (this.inputEmail = ''), (this.inputPassword = '');
        });
    },
  },
};
</script>

<style>
.bg-login {
  height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.bg-login p {
  font-size: 15px;
}

.bg-login .app-title {
  text-align: center;
  margin-bottom: 20px;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

#googleButton {
  margin-left: 17%;
}
</style>
