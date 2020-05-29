<template>
   <div>
       <span>Sorting by:</span>
       <span>
           <template v-for="prop in allProps">
               <span v-if="prop.title !== 'id'"
                       :key="prop.id"
                       @click="handleProperties(prop.title)">
                   {{prop.title}}
               </span>
           </template>
       </span>
       <span>
           <div
           @click="removeItems">
               {{selectedItems.length}}
           </div>
       </span>

       <select v-model="currentItemProdsPerPage">
           <option
                   v-for="prodsPerPageItem in prodsPerPage"
                   :key="prodsPerPageItem.id"
                   :value="prodsPerPageItem.id">
               {{prodsPerPageItem.label}}
           </option>
       </select>
<!--       @click="handleProdsPerPage(prodPerPage.value)"-->
<!--       <span>-->
<!--           <span v-for="valueProdsPerPage in valuesProdsPerPage"-->
<!--           :key="valueProdsPerPage"-->
<!--           @click="handleProdsPerPage(valueProdsPerPage)">-->
<!--               {{valueProdsPerPage}}-->
<!--           </span>-->
<!--       </span>-->



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
           <template v-for="prop in allProps">
            <label v-if="prop.title !== 'id'"
                   :key="prop.id"
                   @click="handleSelect(prop)">
                   <input type="checkbox" v-model="prop.placed">
                   {{prop.title}}
           </label>
           </template>
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
    import { mapGetters } from 'vuex';

    export default {
        name: 'ControlPanel',
        components: {
        },
        props:{
            selectedItems: {
                type: Array,
            },
            clearSelectedItems:{
                type: Function
            }
        },
        data(){
          return{
              currentItemProdsPerPage: 1,
          }
        },
        watch:{
            currentItemProdsPerPage: function () {
                this.$store.dispatch('setProdsPerPageById', this.currentItemProdsPerPage);
                console.log(this.currentItemProdsPerPage)
            }
        },
        computed: {
            ...mapGetters([
                'prodsPerPage',
                'allProps',
                'products',
            ]),

            firstProduct(){
                let idxLastShownEl =  this.$store.state.currentProducts;
                let prodsPerPage = this.$store.state.productsPerPage;
                let idxFirstShownEl = idxLastShownEl - prodsPerPage;
                return idxFirstShownEl;
            },
            lastProduct(){
                return this.$store.state.currentProducts;
            },

            // prodsPerPage(){
            //
            // }
        },

        methods: {
            handleProperties(property){
                const props = this.allProps;
                console.log(property)

                const found = props.find(item=> item.placed === true && !item.hidden && item.title === property);
                if(found !== undefined) {
                    this.$store.dispatch('setFirstProperty', property);
                }
                return
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
                this.$store.dispatch('setProperty', prop);
            },
            removeItems(){
                this._props.clearSelectedItems();
                this.$root.$emit('eventing', []);
                this.$store.dispatch('deleteProds', this._props.selectedItems)
            }
        },
        created () {
        }
    }


    // allProps(){
    //     return this.$store.state.allProps;
    // },
    // properties(){
    //
    //     return this.$store.state.allProperties;
    // },
    // products() {
    //     const productsStore = this.$store.state.products;
    //     return productsStore;
    // },
</script>



