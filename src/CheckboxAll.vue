<template>
    <input type="checkbox"
           :checked="shouldBeChecked"
           :value="values"
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
            values: {
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
        data(){
          return{
              allValues: []
          }
        },
        computed: {
            shouldBeChecked() {
                // console.log(this.value);
                // console.log(this.modelValue)
                // console.log(this.allValues)
                const filteredArr = this.allValues.filter(val => this.values.includes(val));
                // console.log(filteredArr)
                if(filteredArr.length !== 0) {
                    // this.value.forEach(newItem=>{
                    //     this.modelValue.every(item=>{
                    //
                    //     });
                    // })

                    return this.values
                }

                return false

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

                let bool = event.target.checked;
                console.log(bool)
                let newValues = [];
                // const lengthValues = this.value.length;
                if (bool) {
                    newValues = [...this.values];
                    this.allValues = [...this.allValues, ... newValues];
                }
                else {
                    // newValues.splice(0, lengthValues)
                    // compare(this.allValues, newValues)
                    console.log(this.values)
                    const newArr = this.allValues.filter(val => !this.values.includes(val));
                    console.log(newArr);

                    this.allValues = [ ...newArr]// console.log(newArr)
                }
                newValues = [...this.allValues]
                this.$emit('change', newValues)


            }
        }
    }
</script>