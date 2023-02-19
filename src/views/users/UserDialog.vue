<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import type { VForm } from "vuetify/components";
const form = ref<VForm | null>(null);
const userStore = useUserStore();
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await userStore.saveUser();
  }
}
</script>
<template>
  <v-dialog v-model="userStore.dialog" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">User</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="E-Mail*"
                  required
                  v-model="userStore.editedUser.email"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) =>
                      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      'Email is not valid!!',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Name*"
                  required
                  v-model="userStore.editedUser.name"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v.length >= 3 || 'Length must more than 3',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                  v-model="userStore.editedUser.password"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) =>
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                        v
                      ) || 'Password is not valid!!',
                  ]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="userStore.dialog = false"
        >
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
