<template>
    <input type="checkbox"
           :checked="shouldBeChecked"
           :value="value"
           @change="updateAll"
    />
</template>

<script>
    export default {
        model: {
            prop: 'modelValue',
            event: 'change'
        },
        props: {
            value: {
                type: Array,
            },
            modelValue: {
                default: false
            },
            trueValue: {
                default: true
            },
            falseValue: {
                default: false
            }
        },
        computed: {
            shouldBeChecked() {
                if(this.modelValue.length !== 0) {
                    // this.value.forEach(newItem=>{
                    //     this.modelValue.every(item=>{
                    //
                    //     });
                    // })

                    return this.value
                }
                console.log(this.value)
                return this.value

                // if(this.modelValue.includes(this.value)){
                //     console.log('true')
                //     return true
                // }
                // console.log('false')
                // return false
                // if (this.modelValue instanceof Array) {
                //     console.log(this.value)
                //     console.log(this.modelValue.includes(this.value))
                //     console.log(this.modelValue)
                //     return this.modelValue.includes(this.value)
                // }
                // return this.modelValue === this.trueValue
            }
        },
        methods: {
            updateAll(event) {
                let isChecked = event.target.checked
                // let newValue = [...this.modelValue]
                const lengthValues = this.value.length;
                let newValue = [];
                if (isChecked) {
                    // newValue.push(this.value)
                    newValue = [...this.value];
                } else {
                    newValue.splice(0, lengthValues)
                }
                this.$emit('change', newValue)
            }
        }
    }
</script>