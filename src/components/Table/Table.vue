
<template>
    <table v-if="shownProps.length !== 0">
        <thead>
            <tr>
                <th class="_sorted">
                    <CheckboxAll
                            :values="idsCurrentPage"
                            :model-value="selectedItems"
                            :name-event="'changeAllProducts'"
                    />
                </th>
                <template
                        v-for="property in shownProps">
                    <ThCell
                            :key="property.id"
                            :currentOrder="currentOrder"
                            :toggle-order="toggleOrder"
                            :property="property"
                    >
                    </ThCell>
                </template>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in prodsThisPage"
                :key="product.id">
                <td>
                    <Checkbox
                            :model-value="selectedItems"
                            :value="product.id"
                            :name-event="'changeProduct'"
                    />
                </td>
                <template v-for="(value,name) in product">
                    <TdCell
                            :key="name"
                            :value="value"
                            :name="name"
                    ></TdCell>
                </template>
                <HandleCell
                        :onHandle="openModal"
                        :item="product">
                    <div class="icon_delete"/>
                    delete
                </HandleCell>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import CheckboxAll from "@/components/Checkbox/CheckboxAll";
    import {mapGetters} from "vuex";
    import ThCell from "@/components/Table/ThCell";
    import TdCell from "@/components/Table/TdCell";
    import HandleCell from "@/components/Table/HandleCell";
    import Checkbox from "@/components/Checkbox/Checkbox";

    export default {
        name: 'Table',
        components: {
            Checkbox,
            HandleCell,
            TdCell,
            ThCell,
            CheckboxAll
        },
        props: {
            selectedItems: {
                type: Array,
            },
            placedProps: {
                type: Array,
            },
            allProducts: {
                type: Array,
            },
            prodsThisPage: {
                type: Array,
            },
            setOrder: {
                type: Function
            },
            currentOrder: {
                type: String
            },
            closeModal:{
                type: Function
            },
            openModal:{
                type: Function
            },

        },
        computed: {
            ...mapGetters([
                'prodsPerPage',
                'allProps',
                'products',
                'minCurrent',
                'maxCurrent'
            ]),

            idsCurrentPage() {
                const ids = this._props.prodsThisPage.map(item => item.id)
                return ids
            },
            shownProps() {
                const placedProps = this._props.placedProps;
                const propSortBy = placedProps.filter(item => item.sortBy === true);
                const seenProps = placedProps.filter(item => !item.hidden && item.placed && !item.sortBy);
                const finalProps = [...propSortBy, ...seenProps]
                return finalProps;
            },
        },
        methods: {
            toggleOrder() {
                this._props.setOrder();
            },

        },
        // watch: {
        //     selectedProds: function () {
        //         this._props.updateSelectedItems(this._data.selectedProds)
        //     },
        // },
        // mounted() {
        //     this.$root.$on('eventing', data => {
        //         this._data.selectedProds = [...data];
        //     });
        // }
    }
</script>

<style lang="scss">

    table{
        width: 100%;
        border-collapse: collapse;
    }
    tr{

    }
    thead{
        tr{
            &:hover{
                cursor: default;
            }

        }

    }
    tbody{
        border-top: 1px solid  #EDEDED;

        tr{
            &:hover{
                cursor: pointer;
                background: rgba(0, 161, 30, 0.07);

                td:nth-child(2){
                    font-weight: 600;
                }
                .handle-cell{
                    visibility: visible;
                }
            }
        }
        tr:nth-child(even){
            background: #F8F9FA;
            &:hover{
                background: rgba(0, 161, 30, 0.07);
            }
        }
    }
    th, td{
        min-width: 80px;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: #282136;
        padding-top: 13px;
        padding-bottom: 13px;
        text-align: left;
        max-width: 200px;
        &:first-child{
            text-align: center;
        }

    }

    td{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 200px;

    }
    .handle-cell{
        visibility: hidden;
        .icon_delete {
            width: 12px;
            height: 12px;
            background-position: center;
            display: inline-block;
            background-repeat: no-repeat;
            background-image: url("../../assets/trash.svg");
            margin-right: 4px;
        }
    }
</style>