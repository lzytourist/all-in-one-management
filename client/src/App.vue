<template>
  <v-app id="inspire">
    <v-app-bar
        absolute
        class="hidden-lg-and-up"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-sheet
          color="grey darken-4"
          class="pa-4"
      >
        <v-avatar
            class="mb-4"
            color="grey darken-1"
            size="64"
        >
          <img :src="profile" alt="">
        </v-avatar>

        <div class="blue-grey--text">khan@vuetifyjs.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
            v-for="[icon, text, slug] in links"
            :key="icon"
            link
            :to="slug"
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
        <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import profile from './assets/marc.jpg'

export default {
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-view-dashboard-outline', 'Dashboard', '/'],
      ['mdi-shopping-outline', 'Orders', '/orders'],
      ['mdi-notebook-multiple', 'Notes', '/notes'],
      ['mdi-logout', 'Logout', '/logout'],
    ],
    profile
  }),
}
</script>

<style>
.animate {
  animation-name: kick;
  animation-delay: 1s;
  animation-duration: 3s;
}

@keyframes kick {
  0% {
    opacity: 0;
  }
  100% {
    display: 1;
  }
}
</style>