<template>
  <v-main class="blue-grey login-page" :style="{'background-image': 'url(' + background + ')'}">
    <v-row class="d-flex justify-center align-center" style="height: 90%">
      <v-col cols="12" md="8" lg="5">
        <v-card class="pt-12 pb-12 text-center">
          <v-card-title class="d-inline-block">Welcome! Login To Your Account</v-card-title>
          <v-card-text>
            <v-text-field
                label="Enter your email"
                type="email"
                required
                v-model="user.email"
                prepend-icon="mdi-email"
            ></v-text-field>
            <v-text-field
                label="Enter your password"
                type="password"
                required
                v-model="user.password"
                prepend-icon="mdi-key"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn block large outlined color="green" :loading="loading" :disabled="loading" @click="login">Submit
              <v-icon
                  right
                  dark
              >
                mdi-send
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
        v-model="snackbar.show"
        timeout="2000"
        :color="snackbar.color"
        elevation="24"
        top
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script>
import background from '../assets/login-background.jpg'
import Api from "@/Api";

export default {
  name: "Login",
  data: () => ({
    background,
    user: {
      email: '',
      password: ''
    },
    loading: false,
    snackbar: {
      show: false,
      text: '',
      color: 'deep-purple accent-4'
    }
  }),
  methods: {
    async login() {
      this.loading = true
      let log = await Api.post('/auth/login', this.user)
      log = log.data
      if (log.success) {
        localStorage.setItem('token', log.token)
        this.snackbar = {
          color: 'green accent-4',
          show: true,
          text: log.message
        }
        window.location.href = '/'
      } else {
        this.snackbar = {
          color: 'red accent-4',
          show: true,
          text: log.message
        }
      }
      this.loading= false
    }
  }
}
</script>

<style scoped>
.login-page {
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 95vh;
  overflow: hidden;
}
</style>