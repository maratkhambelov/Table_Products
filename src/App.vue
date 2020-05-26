
<template>
  <div id="app">
<!--      <span >-->
<!--          <span @click="selectProduct({id: 1, title: 'some', selected: false})"> CLICK ME PLEASE</span>-->
<!--          {{selectedProducts}}-->
<!--      </span>-->
      <div
      @click="this.letsSort">
          hello
          {{selectedItems}}
      </div>
      <ControlPanel />
      <Table  :selectedItems="this.selectedItems"
              :selectAll="this.selectAll"
              :shownProps="this.shownProps"
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
        shownProps() {
            const shownProps = this.$store.state.properties;
            return shownProps;
        },
        seenProps(){
            const allProps = this.$store.state.allProps;
            const seenProps = allProps.filter(item => item.seen === true)
            return seenProps;
        },
        allProds() {
            const allProds = this.$store.state.products;
            return allProds;
        },
        shownProds() {
            const shownProperties = this.shownProps;
            const productsStore = this.allProds;
            const shownProducts = [];
            // let idxLastShownEl =  this.$store.state.currentProducts;
            // let prodsPerPage = this.$store.state.productsPerPage;
            // let idxFirstShownEl = idxLastShownEl - prodsPerPage;
            productsStore.forEach(product => {
                const newItemAsArr = [];
                shownProperties.forEach((currentProperty => {
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
            // productsOnePage.map(item=> item.selected = false);
            // console.log(productsOnePage);
            return productsOnePage;
        },

    },
    methods: {
        addItem(id){
            console.log(id);
            this.selectedItems.push(id);
            console.log(this.selectedItems)
            // this.data_.selectedItems.push(id);
        },
        selectAll() {
            const arrId = [];
            this.prodsThisPage.filter(item => arrId.push(item.id));

            // console.log(arrId);
            // let selectedItems = this._data.selectedItems;
            // selectedItems = [...selectedItems, ...arrId];
            //
            // this._data.selectedItems = Array.from(new Set(selectedItems));
            // console.log(selectedItems);
        },
        letsSort(){
            const firstColumn = this.seenProps[0];
            firstColumn.order = 'desc';
            this.$store.dispatch('sortBy', firstColumn);
        }
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
