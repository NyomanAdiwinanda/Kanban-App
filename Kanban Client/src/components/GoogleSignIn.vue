<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError"
    type="button"
  >
    Sign in with Google
  </g-signin-button>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  props: ['changeAuth'],
  data() {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id:
          '345132227923-vku254ds2onk8ajv652t93o1cf30v87q.apps.googleusercontent.com',
      },
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      var id_token = googleUser.getAuthResponse().id_token; // etc etc
      axios({
        url: 'https://kanban-nyoman.herokuapp.com/users/googlelogin',
        method: 'POST',
        data: {
          googleToken: id_token,
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
          console.log(err);
        });
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log('google sign in failed', error);
    },
  },
};
</script>

<style>
.g-signin-button {
  box-shadow: inset 0px 1px 0px 0px #fff6af;
  background: linear-gradient(to bottom, #ffec64 5%, #ffab23 100%);
  background-color: #ffec64;
  border-radius: 6px;
  border: 1px solid #ffaa22;
  display: inline-block;
  cursor: pointer;
  color: #333333;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffee66;
}
.g-signin-button:hover {
  background: linear-gradient(to bottom, #ffab23 5%, #ffec64 100%);
  background-color: #ffab23;
}
.g-signin-button:active {
  position: relative;
  top: 1px;
}
</style>
