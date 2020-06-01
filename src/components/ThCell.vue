<template>
    <th v-if="property.sortBy !== true"
        :key="property.id">
        {{property.label}}
    </th>
    <th v-else @click="toggleOrder"
    class="_sorted">
        {{property.label}}
        <span class="sort-icon">
            {{toggleArr}}
        </span>
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
        },
        computed:{
            toggleArr(){
                if(this.$props.currentOrder === 'asc') {
                    return 'asc'
                }
                return 'desc'
            }
        }
    }
</script>

<style scoped>
    th {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        color: #282136;
    }
    ._sorted{
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        color: #00A11E;
    }
    .sort-icon{

    }
</style>