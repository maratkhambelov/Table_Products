
<template>
  <div id="app">
      <div>
          {{selectedItems}}
      </div>
      <ControlPanel
      :selectedItems="this.selectedItems"
      :clearSelectedItems="this.clearSelectedItems"
      :idxFirstItemCurrent="this.idxFirstItemCurrent"
      :idxLastItemCurrent="this.idxLastItemCurrent"
      />
      <Table  :selectedItems="this.selectedItems"
              :selectAll="this.selectAll"
              :placedProps="this.placedProps"
              :allProducts="this.allProducts"
              :prodsThisPage="this.prodsThisPage"
              :addItem="this.addItem"
              :shownProds="this.shownProds"
              :setOrder="this.setOrder"
              :currentOrder="this.currentOrder"
              :updateSelectedItems="this.updateSelectedItems"
      />


  </div>
</template>

<script>
import { getProducts } from './request.js';
import Table from "@/components/Table";
import {store} from './store/store.js'
import ControlPanel from "@/components/ControlPanel";
import {mapGetters} from "vuex";

export default {
    name: 'App',
    store,

    data() {
        return {
            selectedItems: [],
            currentOrder: 'asc',
        }
    },
    computed: {
        ...mapGetters([
            'prodsPerPage',
            'allProps',
            'products',
            'currentProducts',
        ]),
        placedProps() {
            const allProps = this.$store.state.allProps;
            const placedProps = allProps.filter(item => item.placed === true)
            return placedProps;
        },
        allProducts() {
            const allProducts = this.products;
            const sortedCol = this.placedProps.find((item)=>item.sortBy === true);
            const property = sortedCol.title
            const order = this._data.currentOrder;
            allProducts.sort(dynamicSort(property, order));
            return allProducts;
        },
        activeProdsPerPage(){
            return this.prodsPerPage.find(item=>item.active === true)
        },
        idxFirstItemCurrent(){
            let idxLastShownEl =  this.currentProducts
            let prodsPerPage = this.activeProdsPerPage
            // console.log(prodsPerPage.value)
            // console.log(prodsPerPage)
            let idxFirstShownEl = idxLastShownEl - prodsPerPage.value;
            // console.log(idxFirstShownEl)
            if(idxFirstShownEl < 0 ){
                idxFirstShownEl = 0;
            }
            return idxFirstShownEl;
        },
        idxLastItemCurrent(){
            // let idxLastShownEl =  this.currentProducts.length;
            // console.log(this.currentProducts)
            console.log('THIS CURRENT PRODUCT : ' +  this.currentProducts)

            return this.currentProducts
        },
        prodsThisPage() {
            // let idxLastShownEl =  this.currentProducts.length;
            // console.log(this.idxFirstItemCurrent)
            // console.log(this.idxLastItemCurrent)
            const productsOnePage = [...this.shownProds.slice(this.idxFirstItemCurrent,this.idxLastItemCurrent )]
            // const productsOnePage = this.shownProds
            // console.log(productsOnePage)
            // let idxLastShownEl = this.$store.state.currentProducts;
            // let prodsPerPage = this.prodsPerPage
            // console.log(prodsPerPage)
            // let idxFirstShownEl = idxLastShownEl - prodsPerPage;
            //...shownProducts.slice(idxFirstShownEl, idxLastShownEl)
            return productsOnePage;
        },

        shownProds() {
            const shownProperties = this.placedProps
            const products = this.allProducts;
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

    },
    methods: {
        addItem(id){
            console.log(id);
            this.selectedItems.push(id);
            console.log(this.selectedItems)
        },
        clearSelectedItems(){
            this._data.selectedItems = [];
        },
        selectAll() {
            const ids = this.prodsThisPage.map(item=> item.id)
            this.selectedItems = [...this.selectedItems, ...ids];
            this.selectedItems = Array.from(new Set(this.selectedItems))
        },
        setOrder(){
            const order = this._data.currentOrder;
            if(order === 'asc') {
                this._data.currentOrder = 'desc';
            }
            else {
                this._data.currentOrder = 'asc'
            }
        },
        updateSelectedItems(newItems){
            this.selectedItems = [ ...newItems, ]
            this.selectedItems = Array.from(new Set(this.selectedItems))
        },
    },
    // mounted(){
    //
    // },

    components: {
        Table,
        ControlPanel
    }
}

export function dynamicSort(property, order = 'asc') {
    let sort_order = 1;
    if(order === 'desc'){
        sort_order = -1;
    }
    return function (a, b){
        // a should come before b in the sorted order
        if(a[property] < b[property]){
            return -1 * sort_order;
            // a should come after b in the sorted order
        }else if(a[property] > b[property]){
            return 1 * sort_order;
            // a and b are the same
        }else{
            return 0 * sort_order;
        }
    }
}
export function compare(a1, a2) {
    return a1.length == a2.length && a1.every((v,i)=>v === a2[i])
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