
<template>
    <table>
        <div>
        </div>
        <TableTrHead
                :updateSelectedItems="this.updateSelectedItems"
                :setOrder="this.setOrder"
                :currentOrder="this.currentOrder"
                :prodsThisPage="this.prodsThisPage"
                :placedProps="this.placedProps"/>
        <TableBody
                :updateSelectedItems="this.updateSelectedItems"
                :selectedItems="this.selectedItems"
                    :selectAll="this.selectAll"
                    :placedProps="this.placedProps"
                    :allProducts="this.allProducts"
                    :prodsThisPage="this.prodsThisPage"
                    :addItem="this.addItem"/>
    </table>
</template>

<script>
    import TableBody from "@/components/TableBody";
    import TableTrHead from "@/components/TableTrHead";
    export default {
        name: 'Table',
        props: {
            setOrder:{
                type: Function
            },
            updateSelectedItems:{
              type: Function
            },
            currentOrder: {
                type: String
            },
            selectedItems: {
                type:  Array,
            },
            selectAll: {
                type: Function,
            },

            placedProps: {
                type: Array,
            },
            allProducts: {
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
        // data () {
        //     return {
        //         selectedItems: [1,2],
        //     }
        // },
        components: {
            TableBody,
            TableTrHead
        },
        // computed:{
        //     asc(){
        //         return true;
        //     }
        // },
        // methods: {
        //     setAscDescSort() {
        //         this.asc = !this.asc;
        //     },
        // },
        created () {
            // this.$store.dispatch('setAllProducts')
        }
    }
</script>