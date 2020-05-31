<template>
    <div  class="modal-window"  v-if="isOpenedModal">
        <div>Are you sure you want to <b>delete item?</b></div>
        <div
        @click="closeModal">Cancel</div>
        <div
        @click="onConfirm(deleteData)">Confirm</div>
    </div>
</template>

<script>
    export default {
        name: 'ModalWindow',
        props: {
            obj: Object,
            isOpenedModal: Boolean,
            closeModal: Function,
            onConfirm: Function,
            deleteData: {
                type: [Array, Object]
            }
        },


    }
</script>
