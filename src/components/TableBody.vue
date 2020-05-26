<template>
    <div>
        <span>

            <div
            @click="selectAll">
                clickme
            </div>
            {{selItems}}
        </span>
    <tr v-for="product in prodsThisPage"
        :key="product.id">
        <td>
            <CustomCheckbox
                    :val="product.id"
                    v-model="selItems"
            />
        </td>
        <template v-for="(value,name) in product">
            <td v-if="name !== 'id'" :key="value">
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
            allProds: {
                type: Array,
            },
            shownProds: {
                type: Array,
            },
            prodsThisPage: {
                type: Array,
            },
            addItem:{
                type: Function
            },
        },
        data () {
          return{
              selItems: [3,4]
          }
        },
        components:{
            CustomCheckbox,
        },
        methods: {

            deleteProduct(product){
                    this.$store.dispatch('deleteProd', product);
            },
            handleSelItems(id){
                // this._data.selItems.push(id);
                console.log(id);
                console.log(this._props);
                this._props.addItem(id);
            },
            // ascDescSort(){
            //     this.$store.dispatch('sortBy');
            // },
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