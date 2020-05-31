<template>
    <th v-if="property.sortBy !== true"
        :key="property.id">
        {{property.title}}
    </th>
    <th v-else @click="toggleOrder">
        {{property.title}}
        <div v-if="currentOrder === 'asc'">
            asc
        </div>
        <div v-else>
            desc
        </div>
    </th>
</template>

<script>
    export default {
        name: "ThCell",
        props:{
            currentOrder:{
                type: String,
            },
            toggleOrder:{
                type: Function,
            },
            property:{
                type: Object,
            }
        }
    }
</script>

<style scoped>

</style>