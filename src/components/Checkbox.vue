<template>
    <div class="my-check-box">
        <input type="checkbox" :value="val" v-model="checked" @change="onChange" ref="checkbox"/>
    </div>
</template>

<script>
    export default {
        name: 'Filters',
        props: ['value', 'val', 'label'],
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
                this.$emit('input', this.checkedProxy)
            }
        }
    }
</script>