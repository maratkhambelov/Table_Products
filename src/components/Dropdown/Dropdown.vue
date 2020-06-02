<template>
    <div
    class="dropdown_wrapper">
        <div
        @click="toggleDropdown"
        class="dropdown"
        >
<!--            v-click-outside="closeDropdown"-->
            <span class="dropdown_label">
            {{currentValue}}
            </span>
            <div
                    class="dropdown_icon"
            :class="toggleArrow">
            </div>
        </div>
        <div v-if="isOpenedDropdown===true">
            <div class="dropdown_content">
                <slot>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>

    // import clickOutside from "@/components/clickOutside";
    export default {
        name: "Dropdown",
        // directives: {
        //     clickOutside
        // },
        props:{
            currentValue: {
                type: [String, Number]
            }
        },
        data(){
          return{
              isOpenedDropdown: false,
          }
        },
        computed:{
          toggleArrow(){
              if(this.$data.isOpenedDropdown === true ){
                  return 'dropdown_icon _up'
              }
              return 'dropdown_icon'
          }
        },
        methods:{
            toggleDropdown(){
                this._data.isOpenedDropdown = !this._data.isOpenedDropdown;
            },
            closeDropdown(){
                this._data.isOpenedDropdown = false
            },
        }
    }


</script>

<style scoped lang="scss">
    .dropdown{
        padding: 3px 13px;
        border: 1px solid #D5DAE0;
        box-sizing: border-box;
        border-radius: 2px;
        display: inline-block;
        &:hover{
            cursor: pointer;
        }
    }
    .dropdown_label{
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: #5B5E77;
        margin-right: 6px;
    }
    .dropdown_icon{
        width: 10px;
        height:10px;
        background-image: url("../../assets/arrow.svg");
        background-position: center;
        display: inline-block;
        background-repeat: no-repeat;

        &._up{
            transform: rotate(180deg);
        }

    }
    .dropdown_content{
        position: absolute;
        max-height: 200px;
        background: #FFFFFF;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
        border-radius: 4px;
        margin-top: 8px;
        /*width: 100%;*/
        padding: 15px;
        overflow-y: scroll;
        z-index: 1;
        box-sizing: content-box;

    }
    .dropdown_wrapper{
        position: relative;
        display: inline-block;
    }
    ul{
        list-style: none;
        padding-left: 0;
        li{
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
            color: #282136;
            text-align: left;
            white-space: nowrap;

            &:hover{
                cursor: pointer;

                *{
                    cursor: pointer;
                }
            }


        }
        li+li{
            margin-top: 8px;
        }

    }

</style>