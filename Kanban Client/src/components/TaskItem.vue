<template>
  <div class="title">
    <p class="title-content">{{ task.title }}</p>
    <p class="modify">
      <a href="#" @click.prevent="editTask()">Edit</a> |
      <a href="#" @click.prevent="changeCategory()">Move</a> |
      <a href="#" @click.prevent="deleteTask()">Delete</a>
    </p>
    <p class="author">{{ task.User.username }} ({{ task.User.email }})</p>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  props: ['task', 'categories'],

  methods: {
    editTask() {
      Swal.fire({
        title: `Edit Title`,
        input: 'text',
        inputValue: this.task.title,
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Edit',
        showLoaderOnConfirm: true,
        preConfirm: (input) => {
          if (input !== '') {
            axios({
              url: `https://kanban-nyoman.herokuapp.com/tasks/${this.task.id}`,
              method: 'PUT',
              headers: {
                access_token: localStorage.access_token,
              },
              data: {
                title: input,
                CategoryId: this.task.CategoryId,
                UserId: this.task.UserId,
              },
            })
              .then(() => {
                Swal.fire('Task Edited', '', 'success');
                this.$emit('updateTask');
              })
              .catch((err) => {
                Swal.fire(`${err.response.data.msg}`, '', 'error');
              });
          } else {
            Swal.showValidationMessage(`Please insert your title`);
          }
        },
      });
    },

    changeCategory() {
      let page = '';
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].name === this.task.Category.name) {
          page += `<option value="${this.categories[i].id}" selected>${this.categories[i].name}</option>`;
        } else {
          page += `<option value="${this.categories[i].id}">${this.categories[i].name}</option>`;
        }
      }
      Swal.fire({
        showCancelButton: true,
        confirmButtonText: 'Change',
        title: 'Change Category',
        html:
          `Category:` +
          `<select id="change-category">` +
          `${page}` +
          `</select>`,
        preConfirm: () => {
          return new Promise((resolve) => {
            resolve([document.getElementById('change-category').value]);
          });
        },
      }).then((result) => {
        axios({
          url: `https://kanban-nyoman.herokuapp.com/tasks/${this.task.id}`,
          method: 'PATCH',
          data: {
            CategoryId: result.value[0],
          },
          headers: {
            access_token: localStorage.access_token,
          },
        })
          .then(() => {
            Swal.fire('Task Moved', '', 'success');
            this.$emit('updateTask');
          })
          .catch((err) => {
            Swal.fire(`${err.response.data.msg}`, '', 'error');
          });
      });
    },

    deleteTask() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            url: `https://kanban-nyoman.herokuapp.com/tasks/${this.task.id}`,
            method: 'DELETE',
            headers: {
              access_token: localStorage.access_token,
            },
          })
            .then(() => {
              Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
              this.$emit('updateTask');
            })
            .catch(() => {
              Swal.fire('Error!', 'Cannot delete other user Task.', 'error');
            });
        }
      });
    },
  },
};
</script>

<style>
.title {
  background-color: #fffacd;
  border: solid 1px black;
  text-align: left;
  margin-top: 10px;
  margin-left: 20px;
  width: 90%;
}

.title-content {
  padding-left: 10px;
  font-size: 25px;
  margin-bottom: 5px;
  word-wrap: break-word;
}

.modify {
  padding-left: 10px;
  font-size: 15px;
  margin-bottom: 5px;
}

.author {
  text-align: right;
  font-size: 13px;
  padding-right: 10px;
  margin-bottom: 3px;
}
</style>
