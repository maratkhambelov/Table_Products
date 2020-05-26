<template>
    <input type="checkbox"
           :value="val"
           v-model="checked"
           @change="onChange"
           ref="checkbox" />

</template>

<script>
    export default {
        name: 'CustomCheckbox',
        props: [ 'selectedItems', 'val'],
        data () {
            return {
                checkedProxy: false
            }
        },
        computed: {
            checked: {
                get () {
                    return this.value
                },
                set (val) {
                    this.checkedProxy = val
                }
            }
        },
        methods: {
            onChange: function() {
                this.$emit('update', this.checkedProxy)
            }
        }
    }
</script>