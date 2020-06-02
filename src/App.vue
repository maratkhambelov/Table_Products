<template>
    <div id="app">
<!--        <div>-->
<!--            {{selectedItems}}-->
<!--        </div>-->
<!--        <div>-->
<!--            {{selectedProps}}-->
<!--        </div>-->
        <ControlPanel
                :openModal="this.openModal"
                :selectedItems="this.selectedItems"
                :selectedProps="this.selectedProps"
        />
        <Table  :selectedItems="this.selectedItems"
                :placedProps="this.placedProps"
                :allProducts="this.allProducts"
                :prodsThisPage="this.prodsThisPage"
                :setOrder="this.setOrder"
                :currentOrder="this.currentOrder"
                :openModal="this.openModal"
        />
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
    import Table from "@/components/Table/Table";
    import ControlPanel from "@/components/ControlPanel/ControlPanel";
    import {mapGetters} from "vuex";
    import ModalWindow from "@/components/ModalWindow/ModalWindow";

    export default {
        name: 'App',
        components: {
            Table,
            ControlPanel,
            ModalWindow
        },
        data() {
            return {
                selectedItems: [],
                selectedProps:[1,2,3,4,5,6],
                currentOrder: 'asc',
                isOpenedModal: false,
                deleteData: {},
                coordsModal: {x: 0,y:0}
            }
        },
        watch:{
            selectedProps: function () {
                let newProps =  this.properties.map(item=> {
                    item.placed = false
                    if(this.selectedProps.includes(item.id)) {
                        item.placed = true
                    }
                    return item
                })
                this.$store.dispatch('setProperties', newProps);
            },
        },
        computed: {
            ...mapGetters([
                'prodsPerPage',
                'allProps',
                'properties',
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

            shownProds() {
                const shownProperties = this.allProps
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
            prodsThisPage() {
                const min = this.minCurrent;
                const max = this.maxCurrent
                const productsOnePage = [...this.shownProds.slice(min,max)]
                return productsOnePage;
            },
        },

        methods: {
            setOrder(){
                const order = this._data.currentOrder;
                if(order === 'asc') {
                    this._data.currentOrder = 'desc';
                }
                else {
                    this._data.currentOrder = 'asc'
                }
            },

            openModal(obj){
                const x = window.event.screenX - 250
                const y = window.event.screenY - 70
                this.$set(this.coordsModal, 'x',x)
                this.$set(this.coordsModal, 'y',y)
                this.$data.isOpenedModal = true
                this.$data.deleteData = obj;
            },
            closeModal(){
                this._data.isOpenedModal = false
            },
            confirmDelete(){
                const deleteData = this._data.deleteData

                if(deleteData instanceof Array) {
                    this._data.selectedItems = [];
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
        mounted() {
            this.$root.$on('changeProduct', newValues => {
                const isEqual =  newValues.every(val=> this.selectedItems.includes(val))
                if(isEqual === false) {
                    this._data.selectedItems = [ ...newValues]
                }
                else{
                    this._data.selectedItems = this._data.selectedItems.filter(val => newValues.includes(val));
                }
            });
            this.$root.$on('changeProperty', newValues => {
                const isEqual =  newValues.every(val=> this.selectedProps.includes(val))
                if(isEqual === false) {
                    this._data.selectedProps = [ ...newValues]
                }
                else{
                    this._data.selectedProps = this._data.selectedProps.filter(val => newValues.includes(val));
                }
            });
            this.$root.$on('changeAllProducts', newValues => {
                const isContainsAllItems =   newValues.every(val=> this.selectedItems.includes(val))
                if(isContainsAllItems === true) {
                    const removedDuplItems = this.selectedItems.filter(val => newValues.includes(val));
                    this._data.selectedItems = [...removedDuplItems]
                }
                else{
                    const filteredArr = this.selectedItems.filter(val => !newValues.includes(val));
                    this.selectedItems = [...filteredArr, ...newValues]
                }
            });
            this.$root.$on('changeAllProps', newValues => {
                const isContainsAllItems = newValues.every(val=> this.selectedProps.includes(val))
                if(isContainsAllItems === true) {
                    const removedDuplItems = this.selectedProps.filter(val => newValues.includes(val));
                    this._data.selectedProps = [...removedDuplItems]
                }
                else{
                    const filteredArr = this.selectedProps.filter(val => !newValues.includes(val));
                    this.selectedProps = [...filteredArr, ...newValues]
                }
            });
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
            if(a[property] < b[property]){
                return -1 * sort_order;
            }else if(a[property] > b[property]){
                return 1 * sort_order;
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
</style>
