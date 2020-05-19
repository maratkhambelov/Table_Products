<template>
    <thead>

    <tr>
        <td>
            <input type="checkbox">
        </td>
        <td v-for="property in properties"
        :key="property">
            {{property}}
        </td>
<!--        <td v-for="(value, name) in product"-->
<!--            :key="getId(name)">-->
<!--            {{name}}-->
<!--        </td>-->
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
        computed: {
            products() {
                return this.$store.state.products
            },
            product(){
                return this.$store.state.products.find(item=>item)
            },
            properties(){
                return this.$store.state.properties;
            }
        },
        methods: {
            getId: function (name) {
                if(name === 'id'){
                    return name
                }
            }
        },

    }
</script>
<style>

</style>