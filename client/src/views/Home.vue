<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-card
            class="mt-8"
            elevation="12"
        >
          <v-sheet
              class="v-sheet--offset mx-auto"
              color="cyan"
              elevation="12"
              max-width="calc(100% - 32px)"
          >
            <h1 class="text-center py-8 white--text">{{ products }}</h1>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
              Products
            </div>
            <div class="subheading font-weight-light grey--text">
              Total products on the list
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
                class="mr-2"
                small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">sometimes data could take time to update</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card
            class="mt-8"
            
            elevation="12"
        >
          <v-sheet
              class="v-sheet--offset mx-auto"
              color="orange"
              elevation="12"
              max-width="calc(100% - 32px)"
          >
            <h1 class="text-center py-8 white--text">{{ pending_orders + delivered_orders }}</h1>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
              Orders
            </div>
            <div class="subheading font-weight-light grey--text">
              Total orders
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
                class="mr-2"
                small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">last order 26 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card
            class="mt-8"
            elevation="12"
        >
          <v-sheet
              class="v-sheet--offset mx-auto"
              color="green"
              elevation="12"
              max-width="calc(100% - 32px)"
          >
            <h1 class="text-center py-8 white--text">{{ delivered_orders ? delivered_orders : 0 }}</h1>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
              Delivered Orders
            </div>
            <div class="subheading font-weight-light grey--text">
              Total delivered orders
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
                class="mr-2"
                small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">sometimes data could take time to update</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card
            class="mt-8"
            
            elevation="12"
        >
          <v-sheet
              class="v-sheet--offset mx-auto"
              color="yellow"
              elevation="12"
              max-width="calc(100% - 32px)"
          >
            <h1 class="text-center py-8">{{ pending_orders ? pending_orders : 0 }}</h1>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
              Pending Orders
            </div>
            <div class="subheading font-weight-light grey--text">
              Total pending orders
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
                class="mr-2"
                small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">sometimes data could take time to update</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card
            class="mt-8"
            elevation="12"
        >
          <v-sheet
              class="v-sheet--offset mx-auto"
              color="cyan"
              elevation="12"
              max-width="calc(100% - 32px)"
          >
            <h1 class="text-center py-8">{{ total_sell ? total_sell : 0 }} BDT</h1>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
              Total Sell
            </div>
            <div class="subheading font-weight-light grey--text">
              Total pending orders
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
                class="mr-2"
                small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">sometimes data could take time to update</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card
            class="mt-8"
            elevation="12"
        >
          <v-sheet
              class="v-sheet--offset mx-auto"
              color="orange accent-4"
              elevation="12"
              max-width="calc(100% - 32px)"
          >
            <h1 class="text-center py-8">{{ pending_sell }} BDT</h1>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
              Total Pending Sell
            </div>
            <div class="subheading font-weight-light grey--text">
              Total pending orders
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
                class="mr-2"
                small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">sometimes data could take time to update</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card
            class="mt-8"
            elevation="12"
        >
          <v-sheet
              class="v-sheet--offset mx-auto"
              color="green accent-4"
              elevation="12"
              max-width="calc(100% - 32px)"
          >
            <h1 class="text-center py-8">{{ earning ? earning : 0 }} BDT</h1>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
              Total Earning
            </div>
            <div class="subheading font-weight-light grey--text">
              Total pending orders
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
                class="mr-2"
                small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">sometimes data could take time to update</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card
            class="mt-8"
            elevation="12"
        >
          <v-sheet
              class="v-sheet--offset mx-auto"
              color="deep-orange accent-4"
              elevation="12"
              max-width="calc(100% - 32px)"
          >
            <h1 class="text-center py-8">{{ pending_earning ? pending_earning : 0 }} BDT</h1>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
              Total Earning (Pending)
            </div>
            <div class="subheading font-weight-light grey--text">
              Total pending earning
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
                class="mr-2"
                small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">sometimes data could take time to update</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Api from "@/Api";

export default {
  name: 'Home',
  data: () => ({
    products: 0,
    pending_orders: 0,
    delivered_orders: 0,
    total_sell: 0,
    pending_sell: 0,
    earning: 0,
    pending_earning: 0
  }),
  created() {
    Api.get('/dashboard').then(res => {
      this.products = res.data.productCount
      this.delivered_orders = res.data.orderDeliveredCount
      this.pending_orders = res.data.orderPendingCount
      this.total_sell = res.data.selling_price.pending + res.data.selling_price.delivered
      this.pending_sell = res.data.selling_price.pending
      this.earning = res.data.selling_price.delivered - res.data.buying_price.delivered
      this.pending_earning = res.data.selling_price.pending - res.data.buying_price.pending
    })
  }
}
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>