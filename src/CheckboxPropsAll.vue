<!--<template>-->
<!--    <input type="checkbox"-->
<!--           :value="value"-->
<!--           :class="classInput"-->
<!--           @change="selectAllProps"-->
<!--    />-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "CheckboxPropsAll",-->
<!--        props: {-->
<!--            value: {-->
<!--                type: [Number, Boolean],-->
<!--            },-->
<!--            modelValue: {-->
<!--                default: false-->
<!--            },-->

<!--        },-->
<!--        computed:{-->
<!--            classInput(){-->
<!--                const value =this.$props.value-->
<!--                if(value === true ){-->
<!--                    return '_checked'-->
<!--                }-->
<!--                if(this.modelValue instanceof Array){-->
<!--                    if(this.modelValue.includes(value) === true){-->
<!--                        return '_checked'-->
<!--                    }-->
<!--                }-->
<!--                return ''-->

<!--            }-->
<!--        },-->
<!--        methods:{-->
<!--            selectAllProps(event) {-->

<!--                let bool = event.target.checked;-->
<!--                let newValues = [];-->
<!--                const allProperties = this.allProps;-->

<!--                if (bool) {-->
<!--                    allProperties.map(item=>item.placed = true)-->
<!--                    this.$store.dispatch('setPlacedAllProps', allProperties);-->
<!--                }-->
<!--                else {-->
<!--                    allProperties.map(item=>item.placed = false)-->
<!--                    this.$store.dispatch('setPlacedAllProps', allProperties);-->
<!--                }-->
<!--                this.$emit('change', newValues)-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->


<!--<style scoped>-->

<!--</style>-->