<template>
    <div class="control-panel_sorting">
        <span class="_bold">Sorting by:</span>
        <div v-for="prop in allProps"
             :key="prop.id"
             class="control-panel_sorting_block"
             :class="{_active: prop.sortBy  , _disabled: !prop.placed }"
             @click="handleProperties(prop.title)"
        >
            <span
                    class="control-panel_sorting_property">
               {{prop.label}}
           </span>
       </div>
    </div>
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
        computed:{
            // setClass(prop){
            //     if(prop.sortBy === true && prop.placed){
            //         return '_active'
            //     }
            //     else if(prop.placed === false){
            //         return '_disabled'
            //     }
            //     return ''
            // }
        },

    }
</script>

<style scoped  lang="scss">
    .control-panel_sorting{
        display: inline-block;
    }
    .control-panel_sorting_block {
        padding: 4px 5px 4px 5px;
        margin-left: 8px;

        display: inline-block;
        &._active{
            background-color: #00A11E;
            border-radius: 2px;
            .control-panel_sorting_property {
                color: #FFFFFF;
            }
        }
        &._disabled{
            /*border: 1px solid #C6CBD4;*/
            border-radius: 2px;
            background-color:#C6CBD4;
            opacity: 0.3;
            .control-panel_sorting_property {
                color: #3D374A;
            }
            &:hover{
                cursor: default;
            }
        }
        &:hover{
            cursor: pointer;
        }
    }

    .control-panel_sorting_property {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: #3D374A;
    }
</style>