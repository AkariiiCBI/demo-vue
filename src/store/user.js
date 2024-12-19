import { defineStore } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';

export const useUserStore = defineStore('user', {
  state: () => ({
    list: [
      { id: 220812022, userName: '刘淑文', age: 18 },
      { id: 220812008, userName: '蔡欣怡', age: 18 },
      { id: 220812030, userName: '龙依', age: 18 },
    ],
    isEditing: false,
    editForm: {
      index: -1,
      id: null,
      userName: '',
      age: null,
    },
    isAdding: false,
    newUser: {
      id: null,
      userName: '',
      age: null,
    },
  }),
  actions: {
    deleteUser(index) {
      this.list.splice(index, 1);
    },
    openEditDialog(index) {
      const user = this.list[index];
      this.editForm.index = index;
      this.editForm.id = user.id;
      this.editForm.userName = user.userName;
      this.editForm.age = user.age;
      this.isEditing = true;
    },
    saveEdit() {
      if (this.editForm.index > -1) {
        const updatedUser = {
          id: this.editForm.id,
          userName: this.editForm.userName,
          age: this.editForm.age,
        };
        this.list.splice(this.editForm.index, 1, updatedUser);
        this.isEditing = false;
        this.editForm = { index: -1, id: null, userName: '', age: null };
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.editForm = { index: -1, id: null, userName: '', age: null };
    },
    openAddDialog() {
      this.newUser.id = null;
      this.newUser.userName = '';
      this.newUser.age = null;
      this.isAdding = true;
    },
    saveAdd() {
      const { id, userName, age } = this.newUser;
      if (id !== null && userName && age !== null) {
        const addedUser = { id, userName, age };
        this.list.unshift(addedUser);
        this.isAdding = false;
        this.newUser = { id: null, userName: '', age: null };
      } else {
        alert('所有字段都是必填的');
      }
    },
    cancelAdd() {
      this.isAdding = false;
      this.newUser = { id: null, userName: '', age: null };
    },
    getYourName(id) {
      const student = this.list.find(item => item.id === id);
      if (student) {
        alert(student.userName);
      } else {
        alert('找不到该学号的学生');
      }
    },
  },
  persist: true,
});
