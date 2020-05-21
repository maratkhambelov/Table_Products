
<template>
  <div id="app">
<!--      <span >-->
<!--          <span @click="selectProduct({id: 1, title: 'some', selected: false})"> CLICK ME PLEASE</span>-->
<!--          {{selectedProducts}}-->
<!--      </span>-->
      <ControlPanel />
      <Table />

  </div>
</template>

<script>
import { getProducts } from './request.js';
import Table from "@/components/Table";
import {store} from './store/store.js'
import ControlPanel from "@/components/ControlPanel";

export default {
  name: 'App',
    store,
    state:{
      selectedProds:['helloo'],
    },

    data() {
        return {
            selectedProducts: ['hello', 'world'],
            product: {
                id: null,
                selected: false,
                title: null,
            }
        }
    },
    methods:{
      selectProduct: function(product){
          this.selectedProducts.push({...product});
      },
    },
  components: {
      Table,
      ControlPanel
  }
}
getProducts();
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
