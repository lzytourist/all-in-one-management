<template>
  <v-row>
    <v-col>
      <v-container>
        <v-card elevation="24">
          <v-card-text class="pt-12 pb-12">
            <h1 class="text-center text-uppercase blue--text text--accent-1 py-8">Edit Order: {{ $route.params.id }}</h1>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Name*"
                    v-model="order.customer_name"
                    required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Address*"
                    v-model="order.customer_address"
                    required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Phone*"
                    v-model="order.customer_phone"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-chip
                    class="ma-2"
                    color="teal"
                    text-color="white"
                    v-for="item in order.items" :key="item"
                    @dblclick="removeItem(item)"
                >
                  <v-avatar left>
                    <v-icon>mdi-book-open-variant</v-icon>
                  </v-avatar>
                  {{ item }}
                </v-chip>
                <small v-if="order.items.length">Double click to remove</small>
                <v-divider v-if="order.items.length"></v-divider>
                <v-text-field
                    label="Enter a item and press enter*"
                    @keydown.enter="addToItem"
                    v-model="item"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                    type="number"
                    v-model="order.buying_price"
                    label="Buying price*"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                    type="number"
                    v-model="order.selling_price"
                    label="Selling price"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-menu
                    v-model="menu3"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="order.order_date"
                        label="Order date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="order.delivery_date"
                      @input="menu3 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="order.delivery_date"
                        label="Delivery date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="order.delivery_date"
                      @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-container
                    class="px-0 py-0"
                    fluid
                >
                  <v-checkbox
                      v-model="order.delivered"
                      label="Delivered"
                  ></v-checkbox>
                </v-container>
              </v-col>
              <v-col cols="12"><small>*indicates required field</small></v-col>
              <v-col cols="6">
                <v-btn color="grey" block @click="$router.push({name: 'Orders'})">Go Back</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="blue" block @click="insertOrder">Submit</v-btn>
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
    order: {
      customer_name: '',
      customer_address: '',
      customer_phone: '',
      items: [],
      buying_price: 0,
      selling_price: 0,
      delivered: false,
      delivery_date: new Date().toISOString().substr(0, 10),
      order_date: new Date().toISOString().substr(0, 10),
    },
    item: '',
    modal: false,
    menu2: false,
    menu3: false,
    progress: false,
    snackbar: {
      show: false,
      text: ''
    }
  }),
  methods: {
    addToItem() {
      if (this.item) {
        this.order.items.push(this.item)
        this.item = ''
      }
    },
    removeItem(item) {
      this.order.items = this.order.items.filter(it => {
        return it !== item
      })
    },
    async insertOrder() {
      this.overlay = true

      const order = await Api.put(`/orders/${this.$route.params.id}`, this.order)
      if (!order.data.success) {
        this.showSnackbar(order.data.message, 'red')
      } else {
        this.showSnackbar(order.data.message, 'green')
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

    Api.get(`/orders/${id}`).then(res => {
      if (res.data.success) {
        this.order = res.data.order
      }
      this.overlay = false
    }).catch(err => {
      console.log(err)
      this.overlay = false
    })
  }
}
</script>