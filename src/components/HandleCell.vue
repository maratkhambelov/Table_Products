<template>
    <td>
        <div
                @click="onHandle(item)">
            <slot>
            </slot>
        </div>
    </td>
</template>

<script>
    export default {
        name: "HandleCell",
        props:{
            onHandle:{
                type: Function,
            },
            item:{
                type: Object,
            }
        }
    }
</script>

<style scoped>

</style>