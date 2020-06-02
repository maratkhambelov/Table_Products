<template>
    <input type="checkbox"
           :checked="shouldBeChecked"
           :class="{_checked: shouldBeChecked}"
           @change="updateAll"
    />
</template>

<script>
    export default {
        name: "CheckboxAll",

        props: {
            values: {
                type: Array,
            },
            modelValue: {
                default: false
            },
            nameEvent:{
                type: String,
            },
        },
        computed: {
            shouldBeChecked() {

                const isContainsAllItems =  this.values.every(val=> this.modelValue.includes(val))
                if( isContainsAllItems === true) {
                    return true
                }

                return false

            }
        },
        methods: {
            updateAll(event) {
                let isChecked = event.target.checked;
                let newValues = [];

                if(isChecked){
                    newValues = [...this.values]
                }
                else{
                    newValues = this.modelValue.filter(val=> !this.values.includes(val))
                }
                this.$root.$emit(this.nameEvent, newValues)

            }
        },


    }
</script>

<style scoped lang="scss">
    @import "checkbox";
</style>

