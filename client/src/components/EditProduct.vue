<template>
  <v-row>
    <v-col>
      <v-container>
        <v-card elevation="24">
          <v-card-text class="pt-12 pb-12">
            <h1 class="text-center text-uppercase blue--text text--accent-1 py-8">Edit Product: {{
                $route.params.id
              }}</h1>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Name*"
                    v-model="product.name"
                    required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Publisher*"
                    v-model="product.publication"
                    required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                    type="number"
                    v-model="product.price"
                    label="Price*"></v-text-field>
              </v-col>
              <v-col cols="12"><small>*indicates required field</small></v-col>
              <v-col cols="6">
                <v-btn color="grey" block @click="$router.push({name: 'Products'})">Go to Products</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="blue" block @click="insertProduct">Submit</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-col>

    <v-overlay :value="overlay">
      <v-progress-circular
          indeterminate
          color="primary"
          width="10"
          size="80"
      ></v-progress-circular>
    </v-overlay>

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
            color="white"
            text
            v-bind="attrs"
            @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import Api from "@/Api";

export default {
  data: () => ({
    overlay: false,
    product: {
      name: '',
      price: 0,
      publication: ''
    },
    progress: false,
    snackbar: {
      show: false,
      text: ''
    }
  }),
  methods: {
    async insertProduct() {
      this.overlay = true

      const product = await Api.put(`/products/${this.$route.params.id}`, this.product)
      if (!product.data.success) {
        this.showSnackbar(product.data.message, 'red')
      } else {
        this.showSnackbar(product.data.message, 'green')
      }

      this.overlay = false
    },
    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text,
        color
      }
    }
  },
  created() {
    const id = this.$route.params.id
    this.overlay = true

    Api.get(`/products/${id}`).then(res => {
      if (res.data.success) {
        this.product = res.data.product
      }
      this.overlay = false
    }).catch(err => {
      console.log(err)
      this.overlay = false
    })
  }
}
</script>