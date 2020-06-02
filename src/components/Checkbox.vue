<template>

    <input type="checkbox"
           :checked="shouldBeChecked"
           :value="value"
           :class="classInput"
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

        },
        // data(){
        //     return{
        //         className: ''
        //     }
        // },
        computed: {
            shouldBeChecked() {

                if (this.modelValue instanceof Array) {
                    return this.modelValue.includes(this.value)
                }
                return this.modelValue === true
            },
            classInput(){
                const value =this.$props.value
                if(value === true ){
                    return '_checked'
                }
                if(this.modelValue instanceof Array){
                    if(this.modelValue.includes(value) === true){
                        return '_checked'
                    }
                }
                return ''
                // if( typeof(value) === "boolean"){
                //     if(value === true){
                //         return '_checked'
                //     }
                //         return ''
                // }
                // else  if (this.modelValue instanceof Array) {
                //    if(this.modelValue.includes(this.value)){
                //        return '_checked'
                //    }
                //     return ''
                // }
                //
                // return ''
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
                    this.$emit('change', isChecked ? true : false)

                }
            }
        }
    }
    //
</script>
<style lang="scss">
    /*input{*/
    /*    visibility: visible;*/
    /*    position: relative;*/
    /*    margin:0;*/

    /*    &._checked{*/
    /*        visibility: hidden;*/
    /*        position: relative;*/
    /*        &:after{*/
    /*            content: '';*/
    /*            position: absolute;*/
    /*            display: flex;*/
    /*            align-items: center;*/
    /*            justify-content: center;*/
    /*            height: 12.67px;*/
    /*            width:  12.67px;*/
    /*            background-color: #00A11E;*/
    /*            border-radius:2px;*/
    /*            visibility: visible;*/

    /*        }*/
    /*        &:before{*/
    /*            content: 'v';*/
    /*            position: absolute;*/
    /*            visibility: hidden;*/
    /*            display: flex;*/
    /*            align-items: center;*/
    /*            justify-content: center;*/
    /*            height: 12.67px;*/
    /*            width:  12.67px;*/
    /*            color: #ffff;*/
    /*            z-index: 3;*/
    /*            visibility: visible;*/

    /*        }*/
    /*    }*/
    /*}*/
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