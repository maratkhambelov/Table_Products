
<template>
    <table>
        <div>
        </div>
        <thead>
        <tr>
            <td>
                <CheckboxAll
                        :values="idsCurrentPage"
                        v-model="sellProds"
                />
                <!--            :value=""-->
            </td>
            <template v-for="property in shownProps">
                <td v-if="property.sortBy !== true"
                    :key="property.id">
                    {{property.title}}
                </td>
                <td v-else @click="toggleOrder"
                    :key="property.id">
                    {{property.title}}
                    <div v-if="currentOrder === 'asc'">
                        asc
                    </div>
                    <div v-else>
                        desc
                    </div>
                </td>
            </template>
        </tr>
        </thead>
        <div>
        <span>

            <div
                >
<!--                @click="selectAll"-->
<!--                clickme-->
            </div>
            {{sellProds}}
        </span>
            <tr v-for="product in prodsThisPage"
                :key="product.id">
                <td>
                    <CustomCheckbox
                            :value="product.id"
                            v-model="sellProds"
                    />
                </td>
                <template v-for="(value,name) in product">
                    <td v-if="name !== 'id'" :key="name">
                        {{value}}
                    </td>
                </template>
                <td>
                    <button
                            @click="deleteProduct(product)">
                        delete
                    </button>
                </td>
            </tr>
        </div>
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
export default {
components: {CheckboxAll},

<script>
    // import TableBody from "@/components/TableBody";
    // import TableTrHead from "@/components/TableTrHead";
    import CustomCheckbox from './Checkbox';
    import CheckboxAll from "@/CheckboxAll";
    export default {
        name: 'Table',
        components: {
            CustomCheckbox,
            CheckboxAll

        },
        props: {
            setOrder: {
                type: Function
            },
            updateSelectedItems: {
                type: Function
            },
            currentOrder: {
                type: String
            },
            selectedItems: {
                type: Array,
            },
            // selectAll: {
            //     type: Function,
            // },
            placedProps: {
                type: Array,
            },
            allProducts: {
                type: Array,
            },
            shownProds: {
                type: Array,
            },
            prodsThisPage: {
                type: Array,
            },
            addItem: {
                type: Function
            },

        },
        // data () {
        //     return {
        //         selectedItems: [1,2],
        //     }
        // },

        data() {
            return {
                sellProds: [],
            }
        },
        computed: {
            products() {
                return this.$store.state.products
            },

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
                this._data.sellProds = [...this._data.sellProds, ...ids];
                this._data.sellProds = Array.from(new Set(this._data.sellProds));
            },
            toggleOrder() {
                this._props.setOrder();
                console.log(this._props.currentOrder)
            },
            deleteProduct(product){
                console.log(product)
                const newProds = this._data.sellProds.filter(item=> item !== product.id)
                console.log(newProds)
                this._data.sellProds = newProds
                this.$store.dispatch('deleteProd', product);
            },
        },
        watch: {
            sellProds: function () {
                this._props.updateSelectedItems(this._data.sellProds)
            },

        },
        mounted() {
            this.$root.$on('eventing', data => {
                this._data.sellProds = [...data];
            });
        }
    }
</script>