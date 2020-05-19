<template>
   <div>
       <span>Sorting by:</span>
       <span>
           <span v-for="prop in allProps"
                 :key="prop.id"
                 @click="handleProperties(prop)">
               {{prop.title}}
           </span>
       </span>
       <span>
           <span v-for="valueProdsPerPage in valuesProdsPerPage"
           :key="valueProdsPerPage"
           @click="handleProdsPerPage(valueProdsPerPage)">
               {{valueProdsPerPage}}
           </span>
       </span>
       <span>
           <div
                   @click="toBack">
               Back
           </div>
           <span>
               {{firstProduct + 1}}
               -
               {{lastProduct}}
               of
               {{products.length}}
           </span>
           <div
           @click="toNext">
               Next
           </div>
       </span>
       <span>
            <label v-for="prop in allProps"
                   :key="prop.id"
                   @click="handleSelect(prop)">
                   <input type="checkbox" v-model="prop.seen">
                   {{prop.title}}
               </label>
       </span>
<!--       <select multiple>-->
<!--           <option>-->
<!--              -->
<!--&lt;!&ndash;               <span></span>&ndash;&gt;-->
<!--           </option>-->

<!--       </select>-->
   </div>

</template>

<script>
    export default {
        name: 'ControlPanel',
        components: {
        },
        computed: {
            allProps(){
                return this.$store.state.allProps;
            },
            properties(){

                return this.$store.state.allProperties;
            },
            products() {
                const productsStore = this.$store.state.products;
                return productsStore;
            },
            firstProduct(){
                let idxLastShownEl =  this.$store.state.currentProducts;
                let prodsPerPage = this.$store.state.productsPerPage;
                // if(idxLastShownEl < prodsPerPage) {
                //
                // }
                let idxFirstShownEl = idxLastShownEl - prodsPerPage;
                return idxFirstShownEl;
            },
            lastProduct(){
                return this.$store.state.currentProducts;
            },
            // checkedProps() {
                // const properties = this.$store.state.properties;
                // const allProps = this.$store.state.allProperties;

                // const foundProps = properties.map(item=>{
                //     allProps.forEach(item=>{
                //         if()
                //     })
                // })
            // },
            // setChecked(prop){
            //     const properties = this.$store.state.properties;
            //     const found = properties.find(item=> item === prop);
            //     if(found !== undefined) {
            //         return true
            //     }
            //     return false;
            // },
            valuesProdsPerPage(){
                // const initialValue = this.$store.state.productsPerPage;
                const valuesProds = this.$store.state.allValuesProdsPerPage;
                return valuesProds;
                // return this.$store.state.productsPerPage;

            }
        },
        methods: {
            handleProperties(property){
                this.$store.dispatch('setFirstProperty', property.title);
            },
            handleProdsPerPage(newValue){
                this.$store.dispatch('setProdsPerPage', newValue);
            },
            toBack(){
                this.$store.dispatch('backPage');
            },
            toNext(){
                this.$store.dispatch('nextPage');
            },
            handleSelect(prop){

                this.$store.dispatch('setProperty', prop.title);
            },
        },
        created () {
        }
    }
</script>