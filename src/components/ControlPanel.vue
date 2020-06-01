<template>
   <div class="control-panel">
       <SortingBy
       :allProps="this.allProps"
       :handleProperties="this.handleProperties"
       />
      <Button
      :onHandle="this.openModal"
      :items="this.selectedItems"
      :label="this.selectedItems.length"
      :isDisabled="this.selectedItems.length === 0"
      >
          Delete {{formatLabel}}
      </Button>
       <Dropdown
       :currentValue="this.activeItemProdsPerPage.label">
           <ul>
               <li
                       v-for="prodsPerPageItem in prodsPerPage"
                       :key="prodsPerPageItem.id"
                       :value="prodsPerPageItem.id"
                       @click="handleProdsPerPage(prodsPerPageItem)"
               >
                   {{prodsPerPageItem.label}}
               </li>
           </ul>
       </Dropdown>
       <Navigation/>
       <Dropdown
       :current-value="placedProps.length + ' columns selected'">
           <ul>
               <li class="_bold">
                   <label>
                       <input
                               @change="selectAllProps"
                               type="checkbox"
                               v-model="selectedAll"
                       >
                       SelectAll

                   </label>
               </li>
               <li v-for="prop in seenProperties"
                   :value="prop"
                   :key="prop.id"
                    >
                   <label>
                       <Checkbox
                               v-model="prop.placed"
                               :value="prop.placed"
                       />

                       {{prop.label}}
<!--                       <input type="checkbox" v-model="prop.placed">-->
<!--                       {{prop.label}}-->
                   </label>
               </li>
           </ul>
       </Dropdown>


   </div>

</template>

<script>
    import { mapGetters } from 'vuex';
    import SortingBy from "@/components/SortingBy/SortingBy";
    import Button from "@/components/Button/Button";
    import Dropdown from "@/components/Dropdown/Dropdown";
    import Navigation from "@/components/Navigation/Navigation";
    import Checkbox from "@/components/Checkbox";

    export default {
        name: 'ControlPanel',
        components: {Checkbox, Navigation, Dropdown, Button, SortingBy},
        props:{
            selectedItems: {
                type: Array,
            },
            clearSelectedItems:{
                type: Function
            },
            openModal:{
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
            formatLabel(){
                let label = ''
                if(this.selectedItems.length === 0) {
                    return label
                }
                label = `(${this.selectedItems.length})`
                return label
            },
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
                const isContainsAll =  this.seenProperties.every(val=> this.placedProps.includes(val))
                if(isContainsAll === true){
                    this._data.selectedAll = true
                }
                else {
                    this._data.selectedAll = false
                }
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
            // toggleDropdown(){
            //   this._data.isOpenedDropdown = !this._data.isOpenedDropdown;
            // },
            handleProdsPerPage(newValue){
                this._data.activeItemProdsPerPage = newValue
            },

            // handleSelect(prop){
            //     this.$store.dispatch('setProperty', prop);
            // },

            // removeItems(){
            //     this._props.clearSelectedItems();
            //     this.$root.$emit('eventing', []);
            //     this.$store.dispatch('deleteProds', this._props.selectedItems)
            // },
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
<style lang="scss">
    .control-panel{
        > div {
            margin-right: 8px;
        }
        margin-bottom: 16px;
    }
</style>



