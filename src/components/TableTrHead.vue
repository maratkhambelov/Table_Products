<template>
    <thead>

    <tr>
        <td>
            <CheckboxAll
                    :value="idsCurrentPage"
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

        <td>
<!--            <button>-->
<!--                delete-->
<!--            </button>-->
        </td>
    </tr>

    </thead>
</template>

<script>
    import CheckboxAll from "@/CheckboxAll";
    export default {
        components: {CheckboxAll},
        props:{
            updateSelectedItems:{
                type: Function
            },
            setOrder:{
                type: Function
            },
            currentOrder: {
                type: String
            },
            shownProds: {
                type: Array,
            },
            placedProps: {
                type: Array,
            },
            prodsThisPage:{
                type: Array,
            }
        },
        data () {
            return{
                sellProds: [],
            }
        },
        watch: {
            sellProds: function(){
                this._props.updateSelectedItems(this._data.sellProds)
            }
        },
        // data() {
            // return {
            //     order: this._props.currentOrder,
            // }
        // },
        computed: {
            products() {
                return this.$store.state.products
            },

            idsCurrentPage(){
                const ids = this._props.prodsThisPage.map(item=> item.id)
                return ids
            },
            shownProps(){
                const placedProps = this._props.placedProps;
                const propSortBy = placedProps.filter(item=> item.sortBy === true);
                const seenProps = placedProps.filter(item=> !item.hidden && item.placed && !item.sortBy);
                const finalProps = [...propSortBy, ...seenProps]
                return finalProps;
            },

        },
        // computed:{

        // },
        methods: {
            // toggleAsc(){
            //   this._data.asc = !this._data.asc
            // },
            selectAll() {
                const ids = this.idsCurrentPage;
                this._data.sellProds = [...this._data.sellProds, ...ids];
                this._data.sellProds = Array.from(new Set(this._data.sellProds));
            },
            toggleOrder() {
                this._props.setOrder();
                console.log(this._props.currentOrder)

            },
        },

    }
</script>
<style>

</style>