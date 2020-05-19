<template>
    <table>
        <div @click="sortBy('id')">
        </div>
       <TableTrHead/>
        <TableBody/>
    </table>
</template>

<script>
    import TableBody from "@/components/TableBody";
    import { mapState } from 'vuex'
    import TableTrHead from "@/components/TableTrHead";
    export default {
        name: 'Table',
        components: {
            TableBody,
            TableTrHead
        },
        computed: mapState({
            products: state => state.products.all
        }),
        methods: {
            // sortBy: function(keySorted){
            //     this.$store.state.products.map(item=>{
            //         // console.log(Object.keys(item).find(item=> item === key))
            //         for (const [key, value] of Object.entries(item)) {
            //             if(key === keySorted) {
            //                 console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
            //             }
            //         }
            //     })
            // }
        },
        created () {
            // this.$store.dispatch('setAllProducts')
        }
    }
</script>