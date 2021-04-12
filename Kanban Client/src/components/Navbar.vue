<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Kanban</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#">Dashboard</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              aria-current="page"
              href="#"
              @click.prevent="setting"
              >Setting</a
            >
          </li>
        </ul>
        <button id="logout" class="btn btn-warning" @click.prevent="logout()">
          Log Out
        </button>
        <p id="user">{{ username }}</p>
        <p id="email">{{ email }}</p>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  props: ['changeAuth'],
  data() {
    return {
      username: localStorage.username,
      id: localStorage.id,
      email: localStorage.email,
    };
  },

  methods: {
    logout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('id');
      this.changeAuth(false);
      Swal.fire({
        icon: 'success',
        title: 'Logout Successfull',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      });
    },

    setting() {
      Swal.fire({
        title: 'Change Username',
        input: 'text',
        inputValue: localStorage.username,
        showCancelButton: true,
        confirmButtonText: 'Change',
        showLoaderOnConfirm: true,
        preConfirm: (input) => {
          axios({
            url: `https://kanban-nyoman.herokuapp.com/users/${this.id}`,
            method: 'PATCH',
            headers: {
              access_token: localStorage.access_token,
            },
            data: {
              username: input,
            },
          })
            .then(({ data }) => {
              localStorage.username = data[1][0].username;
              this.username = localStorage.username;
              this.$emit('updateTask');
              Swal.fire('Username changed', '', 'success');
            })
            .catch((err) => {
              Swal.fire(`${err.response.data.msg}`, '', 'error');
            });
        },
      });
    },
  },
};
</script>

<style>
button#logout {
  position: fixed;
  right: 20px;
}

p#user {
  position: fixed;
  right: 130px;
  color: white;
}

p#email {
  position: fixed;
  right: 130px;
  top: 30px;
  color: white;
}
</style>
