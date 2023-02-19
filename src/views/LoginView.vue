<script setup lang="ts">
import { ref } from "vue";
import type { VForm } from "vuetify/components";
import { useLoginStore } from "@/stores/login";
const loginStore = useLoginStore();

const loginName = ref("");
const password = ref("");
const valid = ref(true);
const form = ref<InstanceType<typeof VForm> | null>(null);
const login = async () => {
  const { valid } = await form.value!.validate();
  if (valid) {
    loginStore.login(loginName.value);
  }
};
const reset = () => {
  form.value?.reset();
};
</script>

<template>
  <v-app>
    <v-main class="bg-blue-grey-darken-2 pa-16 bg-">
      <v-card width="400px" class="mx-auto">
        <v-card-title
          primary-title
          class="text-center text-h6 font-weight-bold"
        >
          Login
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              label="Email"
              v-model="loginName"
              :rules="[
                (v) => !!v || 'Email is required',
                (v) =>
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  'Email is not valid!!',
              ]"
              required
            ></v-text-field>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
              :rules="[
                (v) => !!v || 'Password is required',
                (v) =>
                  v.length >= 8 ||
                  'Password must be more than or equal 8 characters',
              ]"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="success" @click="login">Login</v-btn>
          <v-btn color="error" @click="reset">Clear</v-btn>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>
</template>
