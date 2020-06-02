<template>
  <div id="app">
      <div>
          {{selectedItems}}
      </div>
      <ControlPanel
      :openModal="this.openModal"
      :selectedItems="this.selectedItems"
      :clearSelectedItems="this.clearSelectedItems"
      :close-modal="this.closeModal"
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
             :coordsModal="this.coordsModal"
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
// import {Vue} from "vue/types/vue";

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
            isOpenedModal: false,
            deleteData: {},
            coordsModal: {x: 0,y:0}
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
            this.placedProps.map(item=>item.sortBy = false) //
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
            const x = window.event.screenX - 250
            console.log(window.event)
            const y = window.event.screenY - 70
            this.$set(this.coordsModal, 'x',x)
            this.$set(this.coordsModal, 'y',y)
            this.$data.isOpenedModal = true
            this.$data.deleteData = obj;
            console.log(this.coordsModal)
        },
        closeModal(){
            this._data.isOpenedModal = false
        },
        confirmDelete(){
            const deleteData = this._data.deleteData
            console.log(deleteData)

            if(deleteData instanceof Array) {
                this.clearSelectedItems();
                this.$root.$emit('eventing', this._data.selectedItems);
                this.$store.dispatch('deleteProds', deleteData)
            }
            else if(deleteData instanceof Object){
                const newArr = this._data.selectedItems.filter(id=> id !== deleteData.id)
                this._data.selectedItems = newArr
                this.$store.dispatch('deleteProd', deleteData.id)
            }
            this._data.isOpenedModal = false
            this._data.deleteData = {}
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

<style  lang="scss">
#app {
    font-family: 'Source Sans Pro', sans-serif;
    text-align: center;

}
*{
    box-sizing: border-box;
}
    ._bold{
        font-weight: 600;
    }
    ._normal{
        font-weight: normal;
    }

    //checkbox
input{
    visibility: visible;
    position: relative;
    margin:0;

    &._checked{
        visibility: hidden;
        position: relative;
        &:after{
            content: '';
            position: absolute;
            height: 100%;
            width:  100%;
            background-color: #00A11E;
            border-radius:2px;
            visibility: visible;

        }
        &:before{
            content: '';
            background-image: url("./assets/mark.svg");
            background-repeat: no-repeat;
            position: absolute;
            top: 2px;
            left: 1px;
            height: 6px;
            width:  10px;
            z-index: 3;
            visibility: visible;

        }
    }
    &:hover{
        cursor: pointer;
    }
}
</style>
