<template>
  <div class="bg-login">
    <main class="form-signin">
      <h1 class="app-title">Kanban App</h1>
      <form @submit.prevent="register">
        <h1 class="h3 mb-3 fw-normal">Register</h1>
        <label for="inputEmail" class="visually-hidden">Email address:</label>
        <input
          type="email"
          v-model="inputEmail"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
        />
        <label for="inputPassword" class="visually-hidden">Password:</label>
        <input
          type="password"
          v-model="inputPassword"
          class="form-control"
          placeholder="Password"
          required
        />
        <label for="inputConfirmPassword" class="visually-hidden"
          >Confirm Password:</label
        >
        <input
          type="password"
          v-model="inputConfirmPassword"
          class="form-control"
          placeholder="Confirm password"
          required
        />
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Register
        </button>
        <p>
          Already have an account?
          <a href="#" @click.prevent="changePage('login')">Login Here</a>
        </p>
      </form>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  props: ['changePage'],
  data() {
    return {
      inputEmail: '',
      inputPassword: '',
      inputConfirmPassword: '',
    };
  },

  methods: {
    register() {
      if (this.inputPassword !== this.inputConfirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Password inputs are not matched',
          text: 'Please check your typing',
        });
        this.inputPassword = '';
        this.inputConfirmPassword = '';
      } else {
        axios({
          method: 'POST',
          url: 'https://kanban-nyoman.herokuapp.com/users/register',
          data: {
            email: this.inputEmail,
            password: this.inputPassword,
          },
        })
          .then(() => {
            this.changePage('login');
            Swal.fire({
              icon: 'success',
              title: 'Register Success',
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
            this.inputEmail = '';
            this.inputPassword = '';
            this.inputConfirmPassword = '';
          });
      }
    },
  },
};
</script>

<style></style>
