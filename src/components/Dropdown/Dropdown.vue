<template>
    <div>
        <div
        @click="toggleDropdown"
        >
            {{currentValue}}
        </div>
        <div v-if="isOpenedDropdown===true">
            <slot>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Dropdown",
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
        methods:{
            toggleDropdown(){
                this._data.isOpenedDropdown = !this._data.isOpenedDropdown;
            },
        }
    }
</script>

<style scoped>

</style>