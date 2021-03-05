<template>
  <v-row>
    <v-col>
      <v-container>
        <h2>Add Order</h2>
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
            <v-btn color="grey" block @click="$router.push({name: 'Orders'})">Cancel</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn color="blue" block @click="insertOrder">Submit</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <v-overlay :value="overlay">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
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
      delivery_date: new Date().toISOString().substr(0, 10)
    },
    item: '',
    modal: false,
    menu2: false,
    progress: false
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
    insertOrder() {
      console.log(this.order)
      this.overlay = true

      if (!this.order.customer_name || !this.order.customer_address || !this.customer_phone || !this.order.items.length) {
        this.overlay = false
        return
      }

      Api.post('orders', this.order).then(res => {
        console.log(res)
        this.overlay = false
      }).catch(err => {
        console.log('Error')
        console.log(err)
        this.overlay = false
      })
    }
  }
}
</script>

<style>
.center {
  position: fixed;
  top: calc(40% - 25px);
  left: calc(50% - 25px);
}
</style>