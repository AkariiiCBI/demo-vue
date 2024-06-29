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
      this.editForm.index = index;
      this.editForm.userName = this.list[index].userName;
      this.editForm.age = this.list[index].age;
      this.isEditing = true;
    },
    saveEdit() {
      if (this.editForm.index > -1) {
        const updatedUser = {
          ...this.list[this.editForm.index],
          userName: this.editForm.userName,
          age: this.editForm.age,
        };
        this.list.splice(this.editForm.index, 1, updatedUser);
        this.isEditing = false;
      }
    },
    cancelEdit() {
      this.isEditing = false;
    },
    openAddDialog() {
      this.newUser.id = null;
      this.newUser.userName = '';
      this.newUser.age = null;
      this.isAdding = true;
    },
    saveAdd() {
      const addedUser = { ...this.newUser };
      this.list.unshift(addedUser);
      this.isAdding = false;
    },
    cancelAdd() {
      this.isAdding = false;
    },
    getYourName(id) {
      const student = this.list.find(item => item.id === id);
      alert(student.userName);
    },
  },
  persist: true, // 启用持久化存储
});