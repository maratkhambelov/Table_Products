<template>
    <div>
    <tr v-for="product in products"
        :key="product.id">
        <td>
            <input type="checkbox" v-model="chosenProducts">
        </td>
        <td v-for="(value,name) in product"
        :key="getId(name)">
            {{value}}
        </td>
        <td>
            <button>
                delete
            </button>
        </td>
        </tr>
    </div>
</template>
<!--<button-->
<!--        :disabled="!product.inventory"-->
<!--        @click="addProductToCart(product)">-->
<!--    Add to cart-->
<!--</button>-->
<script>
    // import { mapGetters} from 'vuex'
    export default {
        state: {
            arrChosenProducts: [],
        },
        computed: {

            products() {
                const shownProperties = this.$store.state.properties;

                const productsStore = this.$store.state.products;
                // const shownProducts = [];
                // productsStore.forEach(item=>{
                //     const newItemAsArr = [];
                //     const itemAsArr = Object.entries(item);
                //     itemAsArr.forEach(property => {
                //         const found = shownProperties.find(item => item === property[0]);
                //         if(found !== undefined) {
                //             newItemAsArr.push(property);
                //         }
                //     })
                //     const newItem = Object.fromEntries(newItemAsArr);
                //     shownProducts.push(newItem);
                // });
                const shownProducts = [];
                let idxLastShownEl =  this.$store.state.currentProducts;
                let prodsPerPage = this.$store.state.productsPerPage;
                let idxFirstShownEl = idxLastShownEl - prodsPerPage;
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
                const productsOnePage = [...shownProducts.slice(idxFirstShownEl, idxLastShownEl)];

                return productsOnePage;
                // shownProperties.forEach(currentProperty=>{
                //
                //
                //     // productsStore.forEach(product=>{
                //     //     const newItemAsArr = [];
                //     //     const productAsArr = Object.entries(product);
                //     //     console.log(productAsArr)
                //     //     const foundProp = productAsArr.find(property => property[0] === currentProperty);
                //     //     if(foundProp !== undefined) {
                //     //         // console.log(foundProp);
                //     //         newItemAsArr.push(foundProp);
                //     //     }
                //     //     const newItem = Object.fromEntries(newItemAsArr);
                //     //     shownProducts.push(newItem);
                //     // })
                // })


            },

            shownProducts(){
                // const shownProducts = [...this.$store.state.products];
                // // shownProducts.map(item=> item === item.['id'])
                // console.log(shownProducts);
                // return shownProducts;
                return 'hello';
            },
            // setProperties(){
            //     const shownProperties = [ 'calories', ];
            //     console.log('hey');
            //     console.log(this.$store.state.products[0].keys())
            //     return shownProperties;
            // },
            // productsKeys(){
            //     this.$store.state.products
            // }
            // ...mapState({products: state => state.products.all}),
            // ...mapGetters({products: 'products'})
        },
        methods: {
            chosenProducts(product){
                this.state.arrChosenProducts.push(product);
                console.log(this.state.arrChosenProducts);
            },

        }
        // created () {
        //     this.$store.dispatch('products')
        // }
    }
</script>