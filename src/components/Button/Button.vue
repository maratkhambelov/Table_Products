<template>
    <span>
        <div
        @click="onHandle">
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
            }
        }
    }
</script>

<style scoped>

</style>