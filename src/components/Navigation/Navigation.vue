<template>
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
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Navigation",
        computed: {
            ...mapGetters([
                'products',
                'minCurrent',
                'maxCurrent'
            ]),
        },
        methods:{
            toBack(){
                this.$store.dispatch('backPage');
            },
            toNext(){
                this.$store.dispatch('nextPage');
            },
        }
    }
</script>

<style scoped>

</style>