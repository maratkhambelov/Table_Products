<template>
   <div class="control-panel">
       <SortingBy
       :allProps="this.seenProperties"
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
                       <CheckboxAll
                               :values="idPlacedProps"
                               :model-value="selectedProps"
                               :name-event="'changeAllProps'"
                       />
                       SelectAll
                   </label>
               </li>
               <li v-for="prop in seenProperties"
                   :key="prop.id"
                    >
                   <label>
                       <Checkbox
                           :model-value="selectedProps"
                           :value="prop.id"
                           :name-event="'changeProperty'"
                               />
                       {{prop.label}}
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
    import Checkbox from "@/components/Checkbox/Checkbox";
    import CheckboxAll from "@/components/Checkbox/CheckboxAll";

    export default {
        name: 'ControlPanel',
        components: {
            CheckboxAll,
            Checkbox,
            Navigation, Dropdown, Button, SortingBy},
        props:{
            selectedItems: {
                type: Array,
            },
            selectedProps:{
                type: Array
            },
            openModal:{
                type: Function
            },
            closeModal:{
                type: Function
            }

        },
        data(){
            return{
                activeItemProdsPerPage:   {
                    id:1,
                    value: 10,
                    label: '10 Per Page',
                    active: true
                },
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
            idPlacedProps(){
                return this.seenProperties.map(item=>item.id)
            }

        },

        watch:{
            activeItemProdsPerPage: function () {
                this.$store.dispatch('setProdsPerPageById', this.activeItemProdsPerPage.id);
            },
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

            handleProdsPerPage(newValue){
                this._data.activeItemProdsPerPage = newValue
            },

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



