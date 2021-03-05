<template>
  <span>
    <v-icon color="blue" @click="showOrder">mdi-magnify</v-icon>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Order Detail #{{ order._id }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-simple-table>
              <tbody>
              <tr>
                <td><strong>Customer Name</strong></td>
                <td>{{ order.customer_name }}</td>
              </tr>
              <tr>
                <td><strong>Customer Address</strong></td>
                <td>{{ order.customer_address }}</td>
              </tr>
              <tr>
                <td><strong>Customer Phone</strong></td>
                <td>{{ order.customer_phone }}</td>
              </tr>
              <tr>
                <td><strong>Items</strong></td>
                <td>
                  <v-chip v-for="item in order.items" :key="item">{{ item }}</v-chip>
                </td>
              </tr>
              <tr>
                <td><strong>Buying Price</strong></td>
                <td>{{ order.buying_price }}</td>
              </tr>
              <tr>
                <td><strong>Selling Price</strong></td>
                <td>{{ order.selling_price }}</td>
              </tr>
              <tr>
                <td><strong>Status</strong></td>
                <td>{{ order.delivered ? 'Delivered' : 'Pending' }}</td>
              </tr>
              <tr v-if="order.delivered">
                <td><strong>Delivery Date</strong></td>
                <td>{{ order.delivery_date }}</td>
              </tr>
              </tbody>
            </v-simple-table>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
export default {
  props: {
    order: Object
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    showOrder() {
      this.dialog = true
    }
  }
}
</script>