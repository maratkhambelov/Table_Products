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

                const isContainsAllItems =  this.values.every(val=> this.modelValue.includes(val))

                const filteredArr = this.allValues.filter(val => this.values.includes(val));
                if(filteredArr.length !== 0 && isContainsAllItems ) {
                    return this.values
                }

                return false

            }
        },
        methods: {
            updateAll(event) {

                let bool = event.target.checked;
                let newValues = [];
                if (bool) {
                    newValues = [...this.values];
                    this.allValues = [...this.allValues, ... newValues];
                }
                else {
                    const newArr = this.allValues.filter(val => !this.values.includes(val));
                    this.allValues = [ ...newArr]
                }
                newValues = [...this.allValues]
                this.$emit('change', newValues)
            }
        },
        mounted() {
            this.$root.$on('eventing', data => {
                this.allValues = [...data];
            });
        }
    }
</script>

