
<template>
    <table>
        <div>
        </div>
        <thead>
            <tr>
                <th>
                    <CheckboxAll
                            :values="idsCurrentPage"
                            v-model="selectedProds"
                    />
                </th>
                <template
                        v-for="property in shownProps"
                >
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
        <div>
            <tr v-for="product in prodsThisPage"
                :key="product.id">
                <td>
                    <CustomCheckbox
                            :value="product.id"
                            v-model="selectedProds"
                    />
                </td>
                <template v-for="(value,name) in product">
                    <TdCell
                            :key="name"
                            :value="value"
                            :name="name"
                    ></TdCell>
                </template>
<!--                <template v-for="(value,name) in product">-->
<!--                    <td v-if="name !== 'id'" :key="name">-->
<!--                        {{value}}-->
<!--                    </td>-->
<!--                </template>-->
                <HandleCell
                :onHandle="openModal"
                :item="product">
                    delete
                </HandleCell>
<!--                <td>-->
<!--                    <div-->
<!--                            @click="openModal(product)">-->
<!--                        delete-->
<!--                    </div>-->
<!--                </td>-->
            </tr>
        </div>

<!--        <span>-->
<!--            -->
<!--            {{selectedProds}}-->
<!--        </span>-->

        <!--            <template v-for="property in shownProps">-->
        <!--                <td v-if="property.sortBy !== true"-->
        <!--                    :key="property.id">-->
        <!--                    {{property.title}}-->
        <!--                </td>-->
        <!--                <td v-else @click="toggleOrder"-->
        <!--                    :key="property.id">-->
        <!--                    {{property.title}}-->
        <!--                    <div v-if="currentOrder === 'asc'">-->
        <!--                        asc-->
        <!--                    </div>-->
        <!--                    <div v-else>-->
        <!--                        desc-->
        <!--                    </div>-->
        <!--                </td>-->
        <!--            </template>-->
<!--        -->
<!--        <TableTrHead-->
<!--                :updateSelectedItems="this.updateSelectedItems"-->
<!--                :setOrder="this.setOrder"-->
<!--                :currentOrder="this.currentOrder"-->
<!--                :prodsThisPage="this.prodsThisPage"-->
<!--                :placedProps="this.placedProps"/>-->
<!--        <TableBody-->
<!--                :updateSelectedItems="this.updateSelectedItems"-->
<!--                :selectedItems="this.selectedItems"-->
<!--                    :selectAll="this.selectAll"-->
<!--                    :placedProps="this.placedProps"-->
<!--                    :allProducts="this.allProducts"-->
<!--                    :prodsThisPage="this.prodsThisPage"-->
<!--                    :addItem="this.addItem"/>-->
    </table>
</template>
<!--export default {-->
<!--components: {CheckboxAll},-->

<script>
    // import TableBody from "@/components/TableBody";
    // import TableTrHead from "@/components/TableTrHead";
    import CustomCheckbox from './Checkbox';
    import CheckboxAll from "@/components/CheckboxAll";
    import {mapGetters} from "vuex";
    import ThCell from "@/components/ThCell";
    import TdCell from "@/components/TdCell";
    import HandleCell from "@/components/HandleCell";

    export default {
        name: 'Table',
        components: {
            HandleCell,
            TdCell,
            ThCell,
            CustomCheckbox,
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
            updateSelectedItems: {
                type: Function
            },
            currentOrder: {
                type: String
            },




            openModal:{
                type: Function
            },

        },
        data() {
            return {
                selectedProds: [],
            }
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
            selectAll() {
                const ids = this.idsCurrentPage;
                this._data.selectedProds = [...this._data.selectedProds, ...ids];
                this._data.selectedProds = Array.from(new Set(this._data.selectedProds));
            },
            toggleOrder() {
                this._props.setOrder();
                console.log(this._props.currentOrder)
            },
            deleteProduct(product){

                const newProds = this._data.selectedProds.filter(item=> item !== product.id)
                this._data.selectedProds = newProds
                // this.$root.$on('openModal', product => {
                //     return product;
                // });
                this.$store.dispatch('deleteProd', product);
            },
        },
        watch: {
            selectedProds: function () {
                this._props.updateSelectedItems(this._data.selectedProds)
            },
        },
        mounted() {
            this.$root.$on('eventing', data => {
                this._data.selectedProds = [...data];
            });
        }
    }
</script>