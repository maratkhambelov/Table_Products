<template>
    <div id="app">
        <ControlPanel
                :openModal="this.openModal"
                :selectedItems="this.selectedItems"
                :selectedProps="this.selectedProps"
        />
        <Table  :selectedItems="this.selectedItems"
                :setOrder="this.setOrder"
                :currentOrder="this.currentOrder"
                :openModal="this.openModal"
                :placed-props="this.placedProperties"
                :allProducts="this.sortedProducts"
                :prods-this-page="this.prodsThisPage"

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
                selectedProps:[],
                currentOrder: 'asc',
                isOpenedModal: false,
                deleteData: {},
                coordsModal: {x: 0,y:0}
            }
        },
        watch:{
            selectedProps: function () {

                let newProps = this.properties
                let propSortingBy = this.properties.find(item=> item.sortBy === true )
                const isContainsSortBy = this.selectedProps.includes(propSortingBy.id)

                // проверяем удалена ли первая колонка, если да, то
                // удаляем у предыдущего элемента sortBy
                // определяем новую колонку, по которой делать сортировку, новый sortBy
                if(isContainsSortBy === false){
                    newProps = this.properties.map(item=>{
                        if(item.id === propSortingBy.id){
                            item.sortBy = false;
                            item.placed = false
                        }
                        return item
                    })
                    const idxNewSortBy = newProps.findIndex(item=> !item.hidden && item.placed === true)
                    newProps[idxNewSortBy].sortBy = true;
                }

                // установить помещаемые элементы в таблицу, новый placed для элементов
                newProps =  this.properties.map((item)=> {
                    item.placed = false
                    if(this.selectedProps.includes(item.id) === true) {
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
                'properties',
                'products',
                'minCurrent',
                'maxCurrent',
                'placedProperties',
                'idsPlacedProperties',
            ]),
            sortedProducts() {
                const products = this.products
                let firstCol = this.placedProperties.find((item)=>item.sortBy === true);
                if(firstCol === undefined){
                    return []
                }
                const order = this.$data.currentOrder;
                products.sort(dynamicSort(firstCol.title, order));
                return products

            },
            productsPlacedSorted(){

                const placedProps = this.placedProperties;
                const products = this.sortedProducts
                let productsPlacedSorted = [];
                let newArrProps = [];
                const sortingProperty = placedProps.filter(item=> item.sortBy === true).map(item=> item.title);
                const othersPlacedProps =  placedProps.filter(item=> item.sortBy === false).map(item=>item.title)
                newArrProps = [...sortingProperty, ...othersPlacedProps]; // устанавливаем порядок формирования таблицы по порядку.
                                                                        // первым идет колонка по которой установилась сортировка, затем остальные
                Array.from(products).forEach(product=>{
                    const newItemAsArr = [];
                    newArrProps.forEach((currentProperty=>{
                        const productAsArr = Object.entries(product);
                        productAsArr.forEach(property => {
                            if (currentProperty === property[0]) {
                                newItemAsArr.push(property);
                            }
                        })
                    }))
                    const newItem = Object.fromEntries(newItemAsArr);
                    productsPlacedSorted.push(newItem);
                })

                return productsPlacedSorted
            },
            prodsThisPage() {
                const min = this.minCurrent;
                const max = this.maxCurrent
                const prodsThisPage = [...this.productsPlacedSorted.slice(min,max)]
                return prodsThisPage;
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
            this.selectedProps = this.idsPlacedProperties
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
        },
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
