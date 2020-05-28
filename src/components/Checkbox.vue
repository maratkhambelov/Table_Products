<template>
    <input type="checkbox"
           :checked="shouldBeChecked"
           :value="value"
           @change="updateInput"
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
                type: Number,
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
                if (this.modelValue instanceof Array) {
                    return this.modelValue.includes(this.value)
                }
                return this.modelValue === this.trueValue
            }
        },
        methods: {
            updateInput(event) {
                let isChecked = event.target.checked

                if (this.modelValue instanceof Array) {
                    let newValue = [...this.modelValue]

                    if (isChecked) {
                        newValue.push(this.value)
                    } else {
                        newValue.splice(newValue.indexOf(this.value), 1)
                    }
                    this.$emit('change', newValue)
                } else {

                    this.$emit('change', isChecked ? this.trueValue : this.falseValue)
                }
            }
        }
    }
</script>















<!--<template>-->
<!--    <input type="checkbox"-->
<!--           :value="val"-->
<!--           v-model="checked"-->
<!--           v-on:change="onChange"-->
<!--           ref="checkbox" />-->

<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: 'CustomCheckbox',-->
<!--        props: [ 'selectedItems', 'val'],-->
<!--        data () {-->
<!--            return {-->
<!--                checkedProxy: false-->
<!--            }-->
<!--        },-->
<!--        computed: {-->
<!--            checked: {-->
<!--                get () {-->
<!--                    return this.value-->
<!--                },-->
<!--                set (val) {-->
<!--                    this.checkedProxy = val-->
<!--                }-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            onChange: function(e) {-->
<!--                console.log(this.checkedProxy)-->
<!--                console.log(this.value);-->
<!--                console.log(this.val)-->
<!--                console.log(e);-->
<!--                this.$emit('change', this.checkedProxy)-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->