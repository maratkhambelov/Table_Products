
<template>
  <div id="app">
      <div>
          {{selectedItems}}
      </div>
      <ControlPanel
      :openModal="this.openModal"
      :selectedItems="this.selectedItems"
      :clearSelectedItems="this.clearSelectedItems"
      />
      <Table  :selectedItems="this.selectedItems"
              :placedProps="this.placedProps"
              :allProducts="this.allProducts"
              :prodsThisPage="this.prodsThisPage"
              :setOrder="this.setOrder"
              :currentOrder="this.currentOrder"
              :updateSelectedItems="this.updateSelectedItems"
              :openModal="this.openModal"
      />
<!--      :selectAll="this.selectAll"-->
     <ModalWindow
             :onConfirm="this.confirmDelete"
             :closeModal="this.closeModal"
             :deleteData="this.deleteData"
             :isOpenedModal="this.isOpenedModal"
     />
  </div>
</template>

<script>
// import { getProducts } from './request.js';
import Table from "@/components/Table";
import {store} from './store/store.js'
import ControlPanel from "@/components/ControlPanel";
import {mapGetters} from "vuex";
import ModalWindow from "@/components/ModalWindow";

export default {
    name: 'App',
    store,
    components: {
        Table,
        ControlPanel,
        ModalWindow
    },
    data() {
        return {
            selectedItems: [],
            currentOrder: 'asc',
            // shouldDeleteId: 0,
            isOpenedModal: false,
            deleteData: {}
        }
    },
    computed: {
        ...mapGetters([
            'prodsPerPage',
            'allProps',
            'products',
            'minCurrent',
            'maxCurrent'
        ]),
        placedProps() {
            const allProps = this.allProps
            const placedProps = allProps.filter(item => item.placed === true)
            return placedProps;
        },
        allProducts() {
            if(this.placedProps.length === 0) {
                return []
            }
            const allProducts = this.products;
            const filteredPlacedProps = this.placedProps.filter(item=> !item.hidden && item.placed)
            let sortedCol = this.placedProps.find((item)=>item.sortBy === true);
            const order = this._data.currentOrder;
            if(sortedCol === undefined) {
                sortedCol = filteredPlacedProps.find(item=> item)
                if(filteredPlacedProps.length === 0) {
                    return allProducts
                }

            }
            const property = sortedCol.title
            sortedCol.sortBy = true
            allProducts.sort(dynamicSort(property, order));

            return allProducts;
        },

        prodsThisPage() {

            const min = this.minCurrent;
            const max = this.maxCurrent
            const productsOnePage = [...this.shownProds.slice(min,max)]
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
        // addItem(id){
        //     this.selectedItems.push(id);
        // },
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
        openModal(obj){
            this._data.isOpenedModal = true
            this._data.deleteData = obj;
        },
        closeModal(){
            this._data.isOpenedModal = false
        },
        // deleteProd(){
        //     const newProds = this._data.selectedItems.filter(item=> item.id !== this._data.shouldDeleteId)
        //     this._data.selectedItems = newProds
        //     this._data.isOpenedModal = false
        //     this.$store.dispatch('deleteProd', this._data.shouldDeleteId);
        //     this._data.shouldDeleteId = 0
        // },
        confirmDelete(){
            const deleteData = this._data.deleteData
            if(deleteData instanceof Array) {
                this.clearSelectedItems();
                this.$store.dispatch('deleteProds', deleteData)
            }
            else if(deleteData instanceof Object){
                this._data.selectedItems.map(item=> item.id !== deleteData.id)
                this.$store.dispatch('deleteProd', deleteData.id)
            }
            this._data.isOpenedModal = false
            this._data.deleteData = {}
            // const newProds = this._data.selectedItems.filter(item=> item.id !== this._data.shouldDeleteId)
            // this._data.selectedItems = newProds
            // this.$store.dispatch('deleteProd', this._data.shouldDeleteId);
            // this._data.shouldDeleteId = 0
        }
    },



    created() {
        this.$store.dispatch('fetchProducts')
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
