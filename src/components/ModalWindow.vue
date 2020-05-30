<template>
    <div  class="modal-window"  v-if="isOpenedModal">
        <div>Are you sure you want to <b>delete item?</b></div>
        <div
        @click="closeModal">Cancel</div>
        <div
        @click="deleteProd">Confirm</div>
    </div>
</template>

<script>
    export default {
        name: 'ModalWindow',
        props: {
            isOpenedModal: Boolean,
            closeModal: Function,
            deleteProd: Function,
        },
        // data(){
        //     return{
        //         isOpened: true
        //     }
        // },
        // methods:{
        //
        // },

    }
</script>
