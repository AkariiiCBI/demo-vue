<template>
  <div class="list-comp">
    <h1 class="text-center text-xl font-bold my-4">User List</h1>
    <div class="tool-bar flex justify-end mb-4">
      <button class="add-btn bg-gray-800 text-white py-2 px-4 rounded" @click="openAddDialog">新增</button>
    </div>
    <ul class="list-none pl-0">
      <!-- 表头 -->
      <li class="flex justify-between items-center mb-4 p-4 bg-gray-200">
        <span class="No w-1/12 font-bold">序号</span>
        <span class="study-code w-2/12 font-bold">学号</span>
        <span class="name w-2/12 font-bold">姓名</span>
        <span class="year w-2/12 font-bold">年龄</span>
        <div class="operation flex-grow flex justify-around font-bold">操作</div>
      </li>
      <!-- 列表项 -->
      <li v-for="(item, index) in list" :key="item.id"
        class="flex justify-between items-center mb-4 p-4 border-b border-gray-400">
        <span class="No w-1/12">{{ index + 1 }}.</span>
        <span class="study-code w-2/12">{{ item.id }}</span>
        <span class="name w-2/12">{{ item.userName }}</span>
        <span class="year w-2/12">{{ item.age }}</span>
        <div class="operation flex-grow flex justify-around">
          <button class="bg-gray-700 text-white py-2 px-4 rounded" @click="deleteUser(index)">删除</button>
          <button class="bg-gray-700 text-white py-2 px-4 rounded" @click="openEditDialog(index)">编辑</button>
          <button class="bg-gray-700 text-white py-2 px-4 rounded" @click="getYourName(item.id)">问名字</button>
        </div>
      </li>
    </ul>

    <div v-if="isEditing" class="dialog fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="dialog-content bg-white p-5 rounded-lg flex flex-col items-center">
        <h2 class="mb-5">编辑同学信息</h2>
        <label class="flex flex-col mb-2">
          姓名:
          <input v-model="editForm.userName" class="mt-1 p-2 border border-gray-300 rounded" />
        </label>
        <label class="flex flex-col mb-2">
          年龄:
          <input v-model="editForm.age" type="number" class="mt-1 p-2 border border-gray-300 rounded" />
        </label>
        <button class="mt-2 bg-blue-500 text-white py-2 px-4 rounded" @click="saveEdit">保存</button>
        <button class="mt-2 bg-gray-500 text-white py-2 px-4 rounded" @click="cancelEdit">取消</button>
      </div>
    </div>

    <div v-if="isAdding" class="dialog fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="dialog-content bg-white p-5 rounded-lg flex flex-col items-center">
        <h2 class="mb-5">新增同学</h2>
        <label class="flex flex-col mb-2">
          学号:
          <input v-model="newUser.id" type="number" class="mt-1 p-2 border border-gray-300 rounded" />
        </label>
        <label class="flex flex-col mb-2">
          姓名:
          <input v-model="newUser.userName" class="mt-1 p-2 border border-gray-300 rounded" />
        </label>
        <label class="flex flex-col mb-2">
          年龄:
          <input v-model="newUser.age" type="number" class="mt-1 p-2 border border-gray-300 rounded" />
        </label>
        <button class="mt-2 bg-blue-500 text-white py-2 px-4 rounded" @click="saveAdd">保存</button>
        <button class="mt-2 bg-gray-500 text-white py-2 px-4 rounded" @click="cancelAdd">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const { list, isEditing, editForm, isAdding, newUser } = storeToRefs(userStore);
const { deleteUser, openEditDialog, saveEdit, cancelEdit, openAddDialog, saveAdd, cancelAdd, getYourName } = userStore;
</script>

<style scoped>
.list-comp {
  text-align: left;
}
</style>
