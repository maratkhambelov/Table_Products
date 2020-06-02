<template>
    <th v-if="property.sortBy !== true"
        :key="property.id">
        {{property.label}}
    </th>
    <th v-else @click="toggleOrder"
    class="_sorted">
        {{property.label}}
        <span class="sort-icon"
        :class="arrIcon">
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
            arrIcon(){
                if(this.$props.currentOrder === 'asc') {
                    return '_asc'
                }
                return '_desc'
            }
        }
    }
</script>

<style scoped lang="scss">
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
        &:hover{
            cursor: pointer;
        }
    }
    .sort-icon{
        margin-left: 6px;
        width: 8px;
        height:12px;
        background-position: center;
        display: inline-block;
        background-repeat: no-repeat;

        &._asc{

            background-image: url("../../assets/up.svg");

         }
        &._desc{
            background-image: url("../../assets/down.svg");

        }
    }
</style>