<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";
import UserDialog from "./UserDialog.vue";

const userStore = useUserStore();

onMounted(async () => {
  await userStore.getUsers();
});
</script>
<template>
  <UserDialog></UserDialog>
  <v-btn @click="userStore.dialog = true">Add New</v-btn>
  <v-table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Operations</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item of userStore.users" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>
          <v-btn class="mr-5" @click="userStore.editUser(item)">Edit</v-btn
          ><v-btn @click="userStore.deleteUser(item.id!)">Delete</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
