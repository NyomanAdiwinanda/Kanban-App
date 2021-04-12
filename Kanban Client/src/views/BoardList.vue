<template>
  <div>
    <Navbar :changeAuth="changeAuth" @updateTask="fetchTaskAgain"></Navbar>
    <div id="button-action">
      <button class="btn btn-primary" @click.prevent="addTask">Add Task</button>
      <button class="btn btn-success" @click.prevent="createCategory">
        Create Category
      </button>
      <button class="btn btn-danger" @click.prevent="deleteCategory">
        Delete Category
      </button>
    </div>
    <div id="task-board">
      <TaskBoard
        v-for="category in categories"
        :key="category.id"
        :categoryName="category.name"
        :categories="categories"
        @updateTask="fetchTaskAgain"
      ></TaskBoard>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar.vue';
import TaskBoard from '../components/TaskBoard.vue';
export default {
  props: ['changeAuth'],
  data() {
    return {
      categories: [],
    };
  },

  methods: {
    fetchCategories() {
      axios({
        url: 'https://kanban-nyoman.herokuapp.com/categories',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          this.categories = [];
          this.categories = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchTaskAgain() {
      this.$emit('update');
    },

    addTask() {
      let page = '';
      for (let i = 0; i < this.categories.length; i++) {
        page += `<option value="${this.categories[i].id}">${this.categories[i].name}</option>`;
      }
      Swal.fire({
        showCancelButton: true,
        confirmButtonText: 'Add',
        title: 'Add Task',
        html:
          `Title: <input type="text" id="input-title"/>` +
          '<br />' +
          '<br />' +
          `Category:` +
          `<select id="input-category">` +
          `${page}` +
          `</select>`,
        preConfirm: () => {
          return new Promise((resolve) => {
            resolve([
              document.getElementById('input-title').value,
              document.getElementById('input-category').value,
            ]);
          });
        },
      }).then((result) => {
        axios({
          url: 'https://kanban-nyoman.herokuapp.com/tasks',
          method: 'POST',
          data: {
            title: result.value[0],
            CategoryId: result.value[1],
          },
          headers: {
            access_token: localStorage.access_token,
          },
        })
          .then(() => {
            Swal.fire('Successfully Created', '', 'success');
            this.$emit('update');
          })
          .catch((err) => {
            Swal.fire(`${err.response.data.msg}`, '', 'error');
          });
      });
    },

    createCategory() {
      Swal.fire({
        title: 'Create Category',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Create',
        showLoaderOnConfirm: true,
        preConfirm: (input) => {
          axios({
            url: `https://kanban-nyoman.herokuapp.com/categories`,
            method: 'POST',
            headers: {
              access_token: localStorage.access_token,
            },
            data: {
              name: input,
            },
          })
            .then(() => {
              Swal.fire('Successfully Created', '', 'success');
              this.fetchCategories();
            })
            .catch((err) => {
              Swal.fire(`${err.response.data.msg}`, '', 'error');
            });
        },
      });
    },

    deleteCategory() {
      let page = '';
      for (let i = 0; i < this.categories.length; i++) {
        page += `<option value="${this.categories[i].id}">${this.categories[i].name}</option>`;
      }
      Swal.fire({
        showCancelButton: true,
        confirmButtonText: 'Delete',
        title: 'Delete Category',
        html:
          `Category:` +
          `<select id="delete-category">` +
          `${page}` +
          `</select>`,
        preConfirm: () => {
          return new Promise((resolve) => {
            resolve([document.getElementById('delete-category').value]);
          });
        },
      }).then((result) => {
        let id = result.value[0];
        axios({
          url: `https://kanban-nyoman.herokuapp.com/categories/${id}`,
          method: 'DELETE',
          headers: {
            access_token: localStorage.access_token,
          },
        })
          .then(() => {
            Swal.fire('Category Deleted', '', 'success');
            this.fetchCategories();
          })
          .catch((err) => {
            Swal.fire(`${err.response.data.msg}`, '', 'error');
          });
      });
    },
  },

  components: {
    Navbar,
    TaskBoard,
  },

  created() {
    this.fetchCategories();
  },
};
</script>

<style>
#task-board {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  top: 120px;
  height: 92vh;
}

#button-action {
  position: fixed;
  margin-top: 67px;
  left: 40%;
  width: 50%;
}
</style>
