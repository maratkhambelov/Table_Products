
<template>
  <div id="app">
<!--      <span >-->
<!--          <span @click="selectProduct({id: 1, title: 'some', selected: false})"> CLICK ME PLEASE</span>-->
<!--          {{selectedProducts}}-->
<!--      </span>-->
      <div
     >
<!--          @click="this.letsSort"-->
          hello
          {{selectedItems}}
      </div>
      <ControlPanel />
      <Table  :selectedItems="this.selectedItems"
              :selectAll="this.selectAll"
              :placedProps="this.placedProps"
              :allProds="this.allProds"
              :prodsThisPage="this.prodsThisPage"
              :addItem="this.addItem"
              :shownProds="this.shownProds"
      />


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

    // data() {
    //     return {
    //         selectedItems: [1, 2],
    //     }
    // },
    computed: {
        selectedItems(){
            const selectedItems = [1,2];
            return selectedItems;
            // console.log(this.prodsThisPage.filter(i => i.selected).map(i => i.id))
            // return this.prodsThisPage.filter(i => i.selected).map(i => i.id)
        },
        placedProps() {
            const allProps = this.$store.state.allProps;
            const placedProps = allProps.filter(item => item.placed === true)
            return placedProps;
        },

        allProds() {
            const allProds = this.$store.state.products;
            return allProds;
        },
        shownProds() {
            const shownProperties = this.placedProps
            const products = this.allProds;
            const shownProducts = [];
            let newArrProps = shownProperties.filter(item => item.sortBy === true).map(item=> item.title);
            const selectedProps = shownProperties.filter(item=>item.sortBy === false).map(item=>item.title)
            newArrProps = [...newArrProps, ...selectedProps]
            products.forEach(product => {
                const newItemAsArr = [];
                newArrProps.forEach((currentProperty => {
                    const productAsArr = Object.entries(product);
                    productAsArr.forEach(property => {
                        if (currentProperty === property[0]) {
                            newItemAsArr.push(property);
                        }
                    })

                }))
                const newItem = Object.fromEntries(newItemAsArr);
                shownProducts.push(newItem);
            })
            return shownProducts;
        },
        prodsThisPage() {
            let idxLastShownEl = this.$store.state.currentProducts;
            let prodsPerPage = this.$store.state.productsPerPage;
            let idxFirstShownEl = idxLastShownEl - prodsPerPage;
            const shownProducts = this.shownProds;
            const productsOnePage = [...shownProducts.slice(idxFirstShownEl, idxLastShownEl)];
            return productsOnePage;
        },

    },
    methods: {
        addItem(id){
            console.log(id);
            this.selectedItems.push(id);
            console.log(this.selectedItems)
        },
        selectAll() {
            const arrId = [];
            this.prodsThisPage.filter(item => arrId.push(item.id));

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
<!--seenProps(){-->
<!--const allProps = this.$store.state.allProps;-->
<!--const seenProps = allProps.filter(item => item.seen === true)-->
<!--return seenProps;-->
<!--},-->