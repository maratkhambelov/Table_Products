<template>
   <div>
       <SortingBy
       :allProps="this.allProps"
       :handleProperties="this.handleProperties"
       />

      <Button
      :onHandle="this.removeItems"
      :label="this.selectedItems.length"
      />

<!--       <div>-->
<!--           {{activeItemProdsPerPage.label}}-->
<!--       </div>-->
       <Dropdown
       :currentValue="this.activeItemProdsPerPage.label">
           <div
                   v-for="prodsPerPageItem in prodsPerPage"
                   :key="prodsPerPageItem.id"
                   :value="prodsPerPageItem.id"
                   @click="handleProdsPerPage(prodsPerPageItem)"
           >
               {{prodsPerPageItem.label}}
           </div>
       </Dropdown>
       <Navigation/>

<!--       <div>-->
<!--           <div-->
<!--                   v-for="prodsPerPageItem in prodsPerPage"-->
<!--                   :key="prodsPerPageItem.id"-->
<!--                   :value="prodsPerPageItem.id"-->
<!--                   @click="handleProdsPerPage(prodsPerPageItem)"-->
<!--           >-->
<!--               {{prodsPerPageItem.label}}-->
<!--           </div>-->
<!--       </div>-->



<!--       <span>-->
<!--           <div-->
<!--                   @click="toBack">-->
<!--               Back-->
<!--           </div>-->
<!--           <span>-->
<!--               {{minCurrent + 1}}-->
<!--               - -->
<!--               {{maxCurrent }}-->
<!--               of-->
<!--               {{products.length}}-->
<!--           </span>-->
<!--           <div-->
<!--           @click="toNext">-->
<!--               Next-->
<!--           </div>-->
<!--       </span>-->
       <Dropdown
       :current-value="placedProps.length + ' columns selected'">
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
       </Dropdown>
<!--       <span>-->
<!--           <div @click="toggleDropdown">-->
<!--               {{placedProps.length}} columns selected-->
<!--           </div>-->
<!--           <div v-if="isOpenedDropdown">-->

<!--           </div>-->
<!--       </span>-->

   </div>

</template>

<script>
    import { mapGetters } from 'vuex';
    import SortingBy from "@/components/SortingBy/SortingBy";
    import Button from "@/components/Button/Button";
    import Dropdown from "@/components/Dropdown/Dropdown";
    import Navigation from "@/components/Navigation/Navigation";

    export default {
        name: 'ControlPanel',
        components: {Navigation, Dropdown, Button, SortingBy},
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



