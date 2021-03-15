<template>
  <v-app id="inspire">
    <div v-if="loggedIn">
      <v-app-bar
          absolute
          class="hidden-lg-and-up blue accent-3"
      >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>All In One</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer
          v-model="drawer"
          app
      >
        <v-sheet
            class="pa-4 text-center white--text blue accent-3"
        >
          <v-avatar
              class="mb-4"
              size="64"
          >
            <img :src="profile" alt="">
          </v-avatar>

          <div class="text-uppercase">{{ user.name }}</div>
          <div class="">{{ user.email }}</div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
              v-for="[icon, text, slug] in links"
              :key="icon"
              link
              :to="slug"
              exact-active-class="my-active"
          >
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container class="hidden-lg-and-up mb-8"></v-container>
          <router-view></router-view>
      </v-main>
    </div>
    <Login v-if="!loggedIn" />
  </v-app>
</template>

<script>
import profile from './assets/marc.jpg'
import Login from "@/views/Login";
import Api from "@/Api";

export default {
  components: {Login},
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-view-dashboard-outline', 'Dashboard', '/'],
      ['mdi-shopping-outline', 'Orders', '/orders'],
      ['mdi-notebook-multiple', 'Products', '/products'],
      ['mdi-logout', 'Logout', '/logout'],
    ],
    profile,
    loggedIn: false,
    user: {
      name: '',
      email: ''
    }
  }),
  created() {
    Api.post('/auth').then(res => {
      if (res.data.success) {
        if (res.data.user) {
          this.loggedIn = true
          this.user = {
            ...res.data.user
          }
        }
      }
    }).catch(err => {
      console.log('error')
      console.log(err)
    })
  }
}
</script>

<style>
.my-active {
  background-color: #448AFF;
  border-radius: 60px 45px 30px 15px/15px 30px 45px 60px;
}
.v-list-item--link:before {
  background-color: unset !important;
}
.overlay-center {
  position: fixed;
  top: calc(40% - 25px);
  left: calc(50% - 25px);
}
</style>