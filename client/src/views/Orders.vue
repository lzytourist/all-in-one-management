<template>
  <v-container>
    <v-card elevation="24">
      <v-card-text class="pt-12 pb-12">
        <h1 class="text-center text-uppercase blue--text text--accent-1 pb-8">Orders List</h1>
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
                Delivery Date
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
              <td>{{ order.delivery_date }}</td>
              <td class="table-actions">
                <ViewOrder :order="order" />
                <v-icon color="deep-orange" @click="$router.push({name: 'EditOrder', params: {id: order._id}})">mdi-circle-edit-outline</v-icon>
                <v-icon color="red" @click="deleteConfirm(order._id)">mdi-trash-can</v-icon>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div v-if="total > 1">
          <template>
            <div class="text-center py-8">
              <v-pagination
                  v-model="page"
                  :length="total"
                  :total-visible="7"
                  @input="getOrders"
              ></v-pagination>
            </div>
          </template>
        </div>
        <template>
          <v-row justify="center">
            <v-dialog
                v-model="dialog"
                persistent
                max-width="290"
            >
              <v-card>
                <v-card-title class="headline">
                  Are you sure?
                </v-card-title>
                <v-card-text>Please confirm if you are trying to delete an order. Bear in mind that this action is undoable, data will be deleted for forever!</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="green darken-1"
                      text
                      @click="dialog = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      color="red darken-1"
                      text
                      @click="deleteOrder"
                  >
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </template>
        <v-overlay :value="overlay">
          <v-progress-circular
              indeterminate
              color="primary"
              width="10"
              size="80"
          ></v-progress-circular>
        </v-overlay>
      </v-card-text>
    </v-card>
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
      orders: [],
      page: 1,
      total: 0,
      perpage: 12,
      overlay: false,
      orderIdToDelete: '',
      snackbar: {
        show: false,
        text: '',
        color: 'green'
      }
    }
  },
  methods: {
    getOrders() {
      this.overlay = true

      Api.get(`/orders?limit=${this.perpage}&skip=${(this.page - 1) * this.perpage}`).then(res => {
        if (res.data.success) {
          this.orders = res.data.orders
          this.total = Math.ceil(res.data.total / this.perpage)
        }
        this.overlay = false
      }).catch(err => {
        console.log(err)
        this.overlay = false
      })
    },
    deleteConfirm(id) {
      this.orderIdToDelete = id
      this.dialog = true
    },
    async deleteOrder() {
      this.dialog = false
      this.overlay = true
      const del = await Api.delete(`/orders/` + this.orderIdToDelete)
      if (del.data.success) {
        this.getOrders()

        this.snackbar = {
          show: true,
          text: del.data.message,
          color: 'green'
        }
      } else {
        this.snackbar = {
          show: true,
          text: del.data.message,
          color: 'red'
        }
      }

      this.overlay = false
    }
  },
  created() {
    this.getOrders()
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