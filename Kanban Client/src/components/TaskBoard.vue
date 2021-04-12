<template>
  <div class="box">
    <h1 class="category">{{ this.categoryName }}</h1>
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      :categories="categories"
      @updateTask="updateTask"
    ></TaskItem>
  </div>
</template>

<script>
import axios from 'axios';
import TaskItem from '../components/TaskItem.vue';
export default {
  props: ['categoryName', 'categories'],
  data() {
    return {
      tasks: [],
    };
  },

  methods: {
    fetchTasks() {
      axios({
        url: 'https://kanban-nyoman.herokuapp.com/tasks',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          this.tasks = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].Category.name === this.categoryName) {
              this.tasks.push(data[i]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateTask() {
      this.$emit('updateTask');
    },
  },

  components: {
    TaskItem,
  },

  created() {
    this.fetchTasks();
    this.$parent.$on('update', this.fetchTasks);
  },
};
</script>

<style>
.box {
  display: inline;
  text-align: center;
  height: 90%;
  width: 21.5%;
  margin-left: 35px;
  margin-right: 35px;
  background-color: white;
  overflow-y: scroll;
}

.box::-webkit-scrollbar {
  display: none;
}

h1.category {
  border-bottom: 1px dashed black;
}
</style>
