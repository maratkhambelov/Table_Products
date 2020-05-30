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

       <div>
           {{activeItemProdsPerPage.label}}
       </div>
       <div>
           <div
                   v-for="prodsPerPageItem in prodsPerPage"
                   :key="prodsPerPageItem.id"
                   :value="prodsPerPageItem.id"
                   @click="handleProdsPerPage(prodsPerPageItem)"
           >
               {{prodsPerPageItem.label}}
           </div>
       </div>
<!--       <select v-model="activeItemProdsPerPage">-->
<!--           <option-->
<!--                   v-for="prodsPerPageItem in prodsPerPage"-->
<!--                   :key="prodsPerPageItem.id"-->
<!--                   :value="prodsPerPageItem.id">-->
<!--               {{prodsPerPageItem.label}}-->
<!--           </option>-->
<!--       </select>-->
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
                activeItemProdsPerPage:   {
                    id:1,
                    value: 10,
                    label: '10 Per Page',
                    active: true
                },
                selectedProps:[],
                isOpenedDropdown: false,
                selectedAll: false,
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
            seenProperties() {
                const seenProps = this.allProps.filter(item => item.title !== 'id')
                return seenProps
            },
            placedProps() {
                return this.allProps.filter(item => item.placed === true && item.title !== 'id')
            },

        },

        watch:{
            activeItemProdsPerPage: function () {
                this.$store.dispatch('setProdsPerPageById', this.activeItemProdsPerPage.id);
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
            handleProdsPerPage(newValue){
                console.log(newValue)
                this._data.activeItemProdsPerPage = newValue
            },
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



