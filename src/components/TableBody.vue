<template>
    <div>
        <span>
            <div
            @click="selectAll">
                clickme
            </div>
  {{selectedItems}}
        </span>
    <tr v-for="product in prodsThisPage"
        :key="product.id">
        <td>
            <Filters v-model="selectedItems" :val="product.id"></Filters>
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
import Filters from './Checkbox';
    export default {
        // props: ['selectedItems'],
        data () {
            return {
                selectedItems: [1,2],
            }
        },
        components:{
            Filters,
        },
        computed: {
            shownProps(){
                const shownProps = this.$store.state.properties;
                return  shownProps;
            },
            allProds(){
              const allProds = this.$store.state.products;
              return allProds;
            },
            shownProds(){
                const shownProperties = this.shownProps;
                const productsStore = this.allProds;
                const shownProducts = [];
                // let idxLastShownEl =  this.$store.state.currentProducts;
                // let prodsPerPage = this.$store.state.productsPerPage;
                // let idxFirstShownEl = idxLastShownEl - prodsPerPage;
                productsStore.forEach(product=>{
                    const newItemAsArr = [];
                    shownProperties.forEach((currentProperty=>{
                        const productAsArr = Object.entries(product);
                        productAsArr.forEach(property => {
                            if(currentProperty === property[0]) {
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
                let idxLastShownEl =  this.$store.state.currentProducts;
                let prodsPerPage = this.$store.state.productsPerPage;
                let idxFirstShownEl = idxLastShownEl - prodsPerPage;
                const shownProducts = this.shownProds;

                const productsOnePage = [...shownProducts.slice(idxFirstShownEl, idxLastShownEl)];
                return productsOnePage;
            },

        },
        methods: {
            deleteProduct(product){
                    this.$store.dispatch('deleteProd', product);
            },
            selectAll(){
                // console.log( this._data.selectedItems);
                const arrId = [];
                this.prodsThisPage.filter(item => arrId.push(item.id));

                console.log(arrId);
                let selectedItems = this._data.selectedItems;
                selectedItems = [...selectedItems, ...arrId];

                console.log(selectedItems);
                this._data.selectedItems = Array.from(new Set(selectedItems));
            }
            // chosenProducts(product){
            //     this.state.arrChosenProducts.push(product);
            //     console.log(this.state.arrChosenProducts);
            // },
        },
        filteredProd(){
            let self = this;
            console.log(self);
            delete self.id;
            return self
        }
        // created () {
        //     this.$store.dispatch('products')
        // }
    }
</script>