<template>
    <div
    @click="this.handle"
    class="button"
    :class="[{'_disabled': isDisabled },className]">
        <span
                class="button_label"
        >
        <slot >
        </slot>
        </span>

    </div>
</template>
<!--v-click-outside="vHandle"-->

<script>
    // import clickOutside from "@/components/clickOutside";

    export default {
        name: "Button",
        props:{
            onHandle:{
                type: Function,
            },
            label: {
                type: [String, Number]
            },
            items:{
                type: [Array, Object]
            },
            isDisabled:{
                type: Boolean,
            },
            className:{
                type: String,
            },
            vHandle:{
                type: Function
            }
        },

        methods:{
            handle(){
                if(this.items === undefined){
                    return this.onHandle()
                }

                return this.onHandle(this.items)
            }
        },

    }
</script>

<style lang="scss">
    .button{
        box-sizing: border-box;
        border-radius: 2px;
        padding: 4px 15px;
        display: inline-block;
        background: #00A11E;

        &._disabled{
            border: 1px solid #C6CBD4;
            box-sizing: border-box;
            background: #FFFFFF;
            border-radius: 2px;
            pointer-events: none;
            .button_label{
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 24px;
                color: #5B5E77;
            }
            &:hover{
                cursor: default;
            }
        }
        &._secondary{
            background-color: white;
            .button_label{
                color: #5B5E77;
            }
        }
        &_label{
            color: #FFFFFF;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
        }
        &:hover{
            cursor: pointer;
        }
    }
</style>