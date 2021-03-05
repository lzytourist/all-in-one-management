<template>
  <v-container>
    <h2>Orders List</h2>
    <v-simple-table
        fixed-header
    >
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            # Order ID
          </th>
          <th class="text-left">
            Customer Name
          </th>
          <th class="text-left">
            Delivery Status
          </th>
          <th class="text-left">
            Actions
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="order in orders"
            :key="order._id"
        >
          <td>{{ order._id }}</td>
          <td>{{ order.customer_name }}</td>
          <td>
            <v-icon color="green" v-if="order.delivered">mdi-check-underline-circle</v-icon>
            <v-icon color="yellow" v-if="!order.delivered">mdi-alert-remove</v-icon>
          </td>
          <td class="table-actions">
            <ViewOrder :order="order" />
            <v-icon color="deep-orange">mdi-circle-edit-outline</v-icon>
            <v-icon color="red">mdi-trash-can</v-icon>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-btn
        fab
        color="indigo accent-2"
        bottom
        right
        fixed
        @click="$router.push({name: 'AddOrder'})"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import ViewOrder from "@/components/ViewOrder";
import Api from "@/Api";

export default {
  name: "Orders",
  components: {ViewOrder},
  data() {
    return {
      dialog: false,
      orders: []
    }
  },
  created() {
    Api.get('orders').then(res => {
      this.orders = res.data
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>
.table-actions .v-icon {
  display: inline-block;
  cursor: pointer;
  padding: 5px 10px;
  transition: all .3s;
}

.table-actions .v-icon:active {
  background-color: rgba(0, 0, 0, .3);
}
</style>