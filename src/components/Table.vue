
<template>
    <table>
        <div>
        </div>
        <TableTrHead/>
        <TableBody />
<!--        :selectedItems="this._data.selectedItems"-->
    </table>
</template>

<script>
    import TableBody from "@/components/TableBody";
    import TableTrHead from "@/components/TableTrHead";
    export default {
        name: 'Table',
        props: {
            selectedProducts: {
                type:  Array,
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
        computed:{
            productsS(){

                return 'some'
            }
        },
        // computed: mapState({
        //     products: state => state.products.all
        // }),
        // methods: {
        //
        //
        // },
        created () {
            // this.$store.dispatch('setAllProducts')
        }
    }
</script>