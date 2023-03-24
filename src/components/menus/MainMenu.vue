<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

const authStore = useAuthStore();
const drawer = ref(true);
const rail = ref(true);
</script>
<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      title="John Leider"
      nav
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home-city"
        title="Home"
        value="home"
        to="/"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-food"
        title="Product"
        value="product"
        to="/product"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        title="User"
        value="user"
        to="/user"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-exit-to-app"
        title="logout"
        value="logout"
        @click="authStore.logout"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
