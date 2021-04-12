<template>
  <div>
    <Login
      v-if="page === 'login'"
      :changePage="changePage"
      :changeAuth="changeAuth"
    ></Login>
    <Register
      v-else-if="page === 'register'"
      :changePage="changePage"
    ></Register>
  </div>
</template>

<script>
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
export default {
  props: ['changeAuth'],
  data() {
    return {
      page: 'login',
    };
  },

  methods: {
    changePage(page) {
      this.page = page;
    },
  },

  components: {
    Login,
    Register,
  },
};
</script>

<style></style>
