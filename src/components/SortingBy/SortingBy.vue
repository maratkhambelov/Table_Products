<template>
    <span>
        <span>Sorting by:</span>
        <span v-for="prop in allProps"
              :key="prop.id">
           <span v-if="prop.title !== 'id'"
                 @click="handleProperties(prop.title)">
               {{prop.title}}
           </span>
       </span>
    </span>
</template>

<script>
    export default {
        name: "SortingBy",
        props: {
            allProps: {
                type: Array,
            },
            handleProperties:{
                type: Function,
            }
        },
    }
</script>

<style scoped>

</style>