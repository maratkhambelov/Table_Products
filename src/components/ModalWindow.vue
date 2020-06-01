<template>
    <div
            class="modal-window"
            v-if="isOpenedModal"
            :style="{top: this.coords.y + 'px', left: this.coords.x + 'px'}">
        <div
                class="modal-window_title">
            Are you sure you want to <b>delete item?</b>
        </div>
        <Button
                :on-handle="closeModal"
                :class-name="'_secondary modal-window_cancel'">
            Cancel
        </Button>
        <Button
                :on-handle="onConfirm"
                :items="deleteData"
                :class-name="'modal-window_confirm'"
                @click="onConfirm(deleteData)">
            Confirm
        </Button>
    </div>
</template>

<script>
    import Button from "@/components/Button/Button";
    export default {
        name: 'ModalWindow',
        components: {Button},
        props: {
            obj: Object,
            isOpenedModal: Boolean,
            closeModal: Function,
            onConfirm: Function,
            deleteData: {
                type: [Array, Object]
            },
            coordsModal: Object,
        },
        computed:{
            coords(){
                return  this.$props.coordsModal
            }
        }


    }
</script>
<style lang="scss">
    .modal-window{
        position: absolute;
        max-width: 250px;
        background: #FFFFFF;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
        border-radius: 4px;
        z-index:3;
        padding: 16px;
        max-width: 280px;
    }
    .modal-window_title{
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: #282136;
        white-space: nowrap;
        margin-bottom: 10px;
        display: inline-block;
    }
    .modal-window_cancel{
        display: inline-block;

        border: 1px solid #C6CBD4;
        box-sizing: border-box;
        border-radius: 4px;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: #5B5E77;
        &:hover{
            cursor: pointer;
        }
        margin-right: 16px;
    }
    .modal-window_confirm{
        display: inline-block;
        border-radius: 4px;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: #FFFFFF;
        background: #00A11E;
        &:hover{
            cursor: pointer;
        }
    }
</style>
