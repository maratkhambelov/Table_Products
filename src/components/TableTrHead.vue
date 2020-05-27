<template>
    <thead>

    <tr>
        <td>
            <input type="checkbox">
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
    export default {
        props:{
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
        // data() {
            // return {
            //     order: this._props.currentOrder,
            // }
        // },
        computed: {
            products() {
                return this.$store.state.products
            },

            shownProps(){
                const placedProps = this._props.placedProps;
                const propSortBy = placedProps.filter(item=> item.sortBy === true);
                const seenProps = placedProps.filter(item=> !item.hidden && item.placed && !item.sortBy);
                const finalProps = [...propSortBy, ...seenProps]
                return finalProps;
            },
            // product(){
            //     return this.$store.state.products.find(item=>item)
            // },
            // properties(){
            //     const shownProps = this.$store.state.allProps.filter(item=> item.seen === true);
            //     console.log(shownProps);
            //     return shownProps;
            // },
            // asc(){
            //     return true;
            // }
        },
        // computed:{

        // },
        methods: {
            // toggleAsc(){
            //   this._data.asc = !this._data.asc
            // },

            toggleOrder() {
                this._props.setOrder();
                console.log(this._props.currentOrder)
                // const firstColumn = this._props.prodsThisPage.find((item, i)=>i===0);
                // console.log(this._props.prodsThisPage)
                // this.toggleAsc();
                // firstColumn.order = this._data.asc;
                // const order = this._data.asc;
                // this.$store.dispatch('sortBy', order );

            },
        },

    }
</script>
<style>

</style>