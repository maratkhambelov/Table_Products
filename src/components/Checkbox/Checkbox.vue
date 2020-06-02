<template>
    <input type="checkbox"
           :checked="shouldBeChecked"
           :class="{_checked: shouldBeChecked}"
           @change="updateInput"
    />
</template>

<script>

    export default {
        name: "Checkbox",

        props: {
            value: {
                type: [Number],
            },
            nameEvent:{
                type: String,
            },
            modelValue: {
                default: false
            },
        },
        data(){
            return{
                currentId: 0,
            }
        },
        computed: {
            shouldBeChecked() {
                if(this.modelValue.includes(this.value)){
                    return true
                }
                return false
            }
        },

        methods: {
            updateInput(event){

                let isChecked = event.target.checked
                let newValues = [];

                if(isChecked){
                    newValues = [...this.modelValue]
                    newValues.push(this.value)
                }
                else{
                    newValues = this.modelValue.filter(val=> val !== this.value)
                }
                this.$root.$emit(this.nameEvent, newValues)
            }
        }
    }
</script>

<style scoped lang="scss">
@import "checkbox";
</style>