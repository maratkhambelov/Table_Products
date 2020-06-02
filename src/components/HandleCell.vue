<template>
    <td>
        <div
                class="handle-cell"
                @click="onHandle(item)">
            <slot>
            </slot>
        </div>
    </td>
</template>
<!--v-click-outside="vHandle"-->

<script>
    export default {
        name: "HandleCell",
        props:{
            onHandle:{
                type: Function,
            },
            item:{
                type: Object,
            },
            // vHandle:{
            //     type: Function
            // }
        },
        // directives: {
        //     clickOutside
        // },
    }
</script>

<style scoped>

</style>