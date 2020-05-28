<template>
    <div>
        <span>

            <div
            @click="selectEveryItem">
                clickme
            </div>
            {{sellProds}}
        </span>
    <tr v-for="product in prodsThisPage"
        :key="product.id">
        <td>
            <CustomCheckbox
                    :value="product.id"
                    v-model="sellProds"
            />
        </td>
        <template v-for="(value,name) in product">
            <td v-if="name !== 'id'" :key="name">
                {{value}}
            </td>
        </template>
        <td>
            <button
            @click="deleteProduct(product)">
                delete
            </button>
        </td>
        </tr>
    </div>
</template>

<script>
import CustomCheckbox from './Checkbox';
    export default {
        props: {
            selectedItems: {
                type:  Array,
            },
            selectAll: {
                type: Function,
            },
            shownProps: {
                type: Array,
            },
            allProducts: {
                type: Array,
            },
            placedProps: {
                type: Array,
            },
            prodsThisPage: {
                type: Array,
            },
            addItem:{
                type: Function
            },
            updateSelectedItems:{
                type: Function
            },
        },
        data () {
          return{
              sellProds: [],
          }
        },
        components:{
            CustomCheckbox,
        },
        watch: {
            sellProds: function(){
                this._props.updateSelectedItems(this._data.sellProds)
            },
            // selectedItems: function () {
            //     this._data.sellProds = this._props.selectedItems
            // }
        },
        computed:{
            idsCurrentPage(){
                const ids = this._props.prodsThisPage.map(item=> item.id)
                return ids
            },
        },
        methods: {
            deleteProduct(product){
                console.log(product)
                const newProds = this._data.sellProds.filter(item=> item !== product.id)
                console.log(newProds)
                this._data.sellProds = newProds
                this.$store.dispatch('deleteProd', product);
            },
            selectEveryItem() {
                const ids = this.idsCurrentPage;
                this._data.sellProds = [...this._data.sellProds, ...ids];
                this._data.sellProds = Array.from(new Set(this._data.sellProds));
            },

            // selectAll(){
            //     // console.log( this._data.selectedItems);
            //     const arrId = [];
            //     this.prodsThisPage.filter(item => arrId.push(item.id));
            //
            //     console.log(arrId);
            //     let selectedItems = this._data.selectedItems;
            //     selectedItems = [...selectedItems, ...arrId];
            //
            //     console.log(selectedItems);
            //     this._data.selectedItems = Array.from(new Set(selectedItems));
            // }

        },

    }
</script>