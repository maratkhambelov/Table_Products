<template>

    <input type="checkbox"
           :checked="shouldBeChecked"
           :value="value"
           :class="className"
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
                type: [Number, Boolean],
            },
            modelValue: {
                default: false
            },
            // trueValue: {
            //     default: true
            // },
            // falseValue: {
            //     default: false
            // }
        },
        data(){
            return{
                className: ''
            }
        },
        computed: {
            shouldBeChecked() {
                if (this.modelValue instanceof Array) {
                    return this.modelValue.includes(this.value)
                }
                return this.modelValue === true
                // return this.modelValue === this.trueValue

            },

        },
        methods: {
            updateInput(event) {
                let isChecked = event.target.checked

                if (this.modelValue instanceof Array) {
                    let newValue = [...this.modelValue]

                    if (isChecked) {
                        newValue.push(this.value)
                        this._data.className = '_checked';
                    } else {
                        newValue.splice(newValue.indexOf(this.value), 1)
                        this._data.className = '';
                    }
                    this.$emit('change', newValue)
                } else {
                    this.$emit('change', isChecked ? true : false)
                    // this.$emit('change', isChecked ? this.trueValue : this.falseValue)

                }
            }
        }
    }
</script>
<style lang="scss">
    input{
        visibility: visible;
        position: relative;
        margin:0;

        &._checked{
            visibility: hidden;
            position: relative;
            &:after{
                content: '';
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 12.67px;
                width:  12.67px;
                background-color: #00A11E;
                border-radius:2px;
                visibility: visible;

            }
            &:before{
                content: 'v';
                position: absolute;
                visibility: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 12.67px;
                width:  12.67px;
                color: #ffff;
                z-index: 3;
                visibility: visible;

            }
        }
    }
</style>















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