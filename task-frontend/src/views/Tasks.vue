<template>
  <div class="container">
    <h1>Task Manager</h1>

    <input v-model="newTask" placeholder="Enter task title" />
    <button @click="addTask">Add</button>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" v-model="task.completed" @change="updateTask(task)" />
        {{ task.title }}
        <button @click="deleteTask(task.id)">🗑️</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const tasks = ref([])
const newTask = ref('')

const fetchTasks = async () => {
  const res = await axios.get('/tasks')
  tasks.value = res.data
}

const addTask = async () => {
  if (!newTask.value.trim()) return
  await axios.post('/tasks', { title: newTask.value })
  newTask.value = ''
  fetchTasks()
}

const updateTask = async (task) => {
  await axios.put(`/tasks/${task.id}`, {
    title: task.title,
    completed: task.completed
  })
}

const deleteTask = async (id) => {
  await axios.delete(`/tasks/${id}`)
  fetchTasks()
}

onMounted(() => {
  fetchTasks()
})
</script>

<style>
.container {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
}
input[type="text"] {
  width: 80%;
  margin-right: 10px;
}
</style>
