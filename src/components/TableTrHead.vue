<template>
    <thead>

    <tr>
        <td>
            <input type="checkbox">
        </td>
        <template v-for="property in properties">
            <td v-if="property.sortBy !== true"
                :key="property.id">
                {{property.title}}
            </td>
            <td v-else @click="setAscDescSort"
                :key="property.id">
                {{property.title}}
                <div v-if="asc">
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
            shownProds: {
                type: Array,
            },
            prodsThisPage:{
                type: Array,
            }
        },
        data() {
            return {
                asc: true,
            }
        },
        computed: {
            products() {
                return this.$store.state.products
            },
            // product(){
            //     return this.$store.state.products.find(item=>item)
            // },
            properties(){
                const shownProps = this.$store.state.allProps.filter(item=> item.seen === true);
                console.log(shownProps);
                return shownProps;
            },
            // asc(){
            //     return true;
            // }
        },
        // computed:{

        // },
        methods: {
            toggleAsc(){
              this._data.asc = !this._data.asc
            },

            setAscDescSort() {

                // const firstColumn = this._props.prodsThisPage.find((item, i)=>i===0);
                // console.log(this._props.prodsThisPage)
                this.toggleAsc();
                // firstColumn.order = this._data.asc;
                const order = this._data.asc;
                this.$store.dispatch('sortBy', order );

            },
        },

    }
</script>
<style>

</style>