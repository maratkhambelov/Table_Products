<template>
    <td  v-if="name !== 'id'"
         :key="name">
            {{value}}
    </td>
</template>

<script>
    export default {
        name: "TdCell",
        props:{
            name:{
                type: [String, Number]
            },
            value:{
                type: [String, Number]
            }
        }
    }
</script>

<style scoped>

</style>