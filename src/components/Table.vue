
<template>
    <table>
        <div>
        </div>
        <TableTrHead
                :prodsThisPage="this.prodsThisPage"
                :placedProps="this.placedProps"/>
        <TableBody  :selectedItems="selectedItems"
                    :selectAll="this.selectAll"
                    :placedProps="this.placedProps"
                    :allProds="this.allProds"
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
            selectedItems: {
                type:  Array,
            },
            selectAll: {
                type: Function,
            },
            placedProps: {
                type: Array,
            },
            allProds: {
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