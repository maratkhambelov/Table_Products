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

       <select v-model="activeItemProdsPerPage">
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
               {{minCurrent + 1}}
               -
               {{maxCurrent }}
               of
               {{products.length}}
           </span>
           <div
           @click="toNext">
               Next
           </div>
       </span>
       <span>
           <div @click="toggleDropdown">
               {{placedProps.length}} columns selected
           </div>
           <div v-if="isOpenedDropdown">
               <div>
                   <label>
                       <input
                               @change="selectAllProps"
                              type="checkbox"
                              v-model="selectedAll"
                       >
                       SelectAll
                   </label>
               </div>
               <div v-for="prop in seenProperties"
                    :value="prop"
                    :key="prop.id">
                   <label>
                       <input type="checkbox" v-model="prop.placed">
                       {{prop.title}}
                   </label>
               </div>
           </div>


<!--           <select v-model="selectedProps" multiple>-->
<!--               <option>-->
<!--                   Select All-->
<!--               </option>-->
<!--               <option v-for="prop in seenProperties"-->
<!--                       :value="prop"-->
<!--                       :key="prop.id">-->
<!--                   <label>-->
<!--                       <input type="checkbox" v-model="prop.placed">-->
<!--                       {{prop.title}}-->
<!--                   </label>-->
<!--               </option>-->
<!--            </select>-->

<!--             <span>-->
<!--               <template v-for="prop in allProps">-->
<!--                    <label v-if="prop.title !== 'id'"-->
<!--                           :key="prop.id"-->
<!--                           @click="handleSelect(prop)">-->
<!--                           <input type="checkbox" v-model="prop.placed">-->
<!--                           {{prop.title}}-->
<!--                   </label>-->
<!--               </template>-->
<!--            </span>-->
       </span>

   </div>

</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'ControlPanel',
        components: {
        },
        computed: {
            ...mapGetters([
                'prodsPerPage',
                'allProps',
                'products',
                'minCurrent',
                'maxCurrent'
            ]),
            seenProperties() {
                // console.log(this.allProps)
                const seenProps = this.allProps.filter(item => item.title !== 'id')
                // const colSortBy = seenProps.find(item=>item.sortBy === true)
                // if(colSortBy === undefined) {
                //     const found = this.allProps.find(item=> item.placed === true && !item.hidden);
                //     console.log(found)
                //     this.handleProperties(found)
                // }
                    return seenProps
            },
            placedProps() {
                return this.allProps.filter(item => item.placed === true && item.title !== 'id')
            },
            // shouldBeChecked() {
            //
            //     const isContainsAll = this.seenProperties.every(val => this.placedProps.includes(val))
            //
            //     if (isContainsAll === true) {
            //         return true
            //     }
            //
            //     return false
            // },
        },
        props:{
            selectedItems: {
                type: Array,
            },
            clearSelectedItems:{
                type: Function
            },

        },
        data(){
          return{
              activeItemProdsPerPage: 1,
              selectedProps:[],
              isOpenedDropdown: false,
              selectedAll: false,
          }
        },
        watch:{
            activeItemProdsPerPage: function () {
                this.$store.dispatch('setProdsPerPageById', this.activeItemProdsPerPage);
                console.log(this.activeItemProdsPerPage)
            },
            placedProps: function() {
                console.log(this.placedProps)
                const isContainsAll =  this.seenProperties.every(val=> this.placedProps.includes(val))
                if(isContainsAll === true){
                    this._data.selectedAll = true
                }
                else {
                    this._data.selectedAll = false
                }
                // const filteredArr = this.allValues.filter(val => this.values.includes(val));
            }
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
            toggleDropdown(){
              this._data.isOpenedDropdown = !this._data.isOpenedDropdown;
            },
            // handleProdsPerPage(newValue){
            //     this.$store.dispatch('setProdsPerPage', newValue);
            // },
            toBack(){
                this.$store.dispatch('backPage');
            },
            toNext(){
                this.$store.dispatch('nextPage');
            },
            // handleSelect(prop){
            //     this.$store.dispatch('setProperty', prop);
            // },
            removeItems(){
                this._props.clearSelectedItems();
                this.$root.$emit('eventing', []);
                this.$store.dispatch('deleteProds', this._props.selectedItems)
            },
            selectAllProps(event) {

                let bool = event.target.checked;
                let newValues = [];
                const allProperties = this.allProps;

                if (bool) {
                    allProperties.map(item=>item.placed = true)
                    this.$store.dispatch('setPlacedAllProps', allProperties);
                }
                else {
                    allProperties.map(item=>item.placed = false)
                    this.$store.dispatch('setPlacedAllProps', allProperties);
                }
                this.$emit('change', newValues)
            }
        },

    }



</script>



