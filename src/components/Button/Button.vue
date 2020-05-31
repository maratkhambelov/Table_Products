<template>
    <span>
        <div
        @click="onHandle(items)">
            {{label}}
        </div>
    </span>
</template>

<script>
    export default {
        name: "Button",
        props:{
            onHandle:{
                type: Function,
            },
            label: {
                type: [String, Number]
            },
            items:{
                type: Array
            }
        }
    }
</script>

<style scoped>

</style>