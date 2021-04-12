<template>
  <div>
    <LoginRegister
      v-if="isAuth === false"
      :changeAuth="changeAuth"
    ></LoginRegister>
    <BoardList v-else-if="isAuth === true" :changeAuth="changeAuth"></BoardList>
  </div>
</template>

<script>
import LoginRegister from './views/LoginRegister.vue';
import BoardList from './views/BoardList.vue';
export default {
  data() {
    return {
      isAuth: false,
    };
  },

  components: {
    LoginRegister,
    BoardList,
  },

  methods: {
    changeAuth(value) {
      this.isAuth = value;
    },
  },

  created() {
    if (!localStorage.access_token) {
      this.isAuth = false;
    } else {
      this.isAuth = true;
    }
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
