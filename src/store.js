import Vue from 'vue';
import Vuex from 'vuex';
import {deleteProducts, getProducts} from "@/request";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        products: [],
        properties: [
            {
                id: 1,
                title: 'product',
                placed: true,
                sortBy: true,
                label: 'Product (100g serving) '
            },
            {
                id: 2,
                title: 'calories',
                placed: true,
                sortBy: false,
                label: 'Calories'
            },
            {
                id: 3,
                title: 'fat',
                placed: true,
                sortBy: false,
                label: 'Fat (g)'
            },
            {
                id: 4,
                title: 'carbs',
                placed: true,
                sortBy: false,
                label: 'Carbs (g)'
            },
            {
                id: 5,
                title: 'protein',
                placed: true,
                sortBy: false,
                label: 'Protein (g)'
            },
            {
                id: 6,
                title: 'iron',
                placed: true,
                sortBy: false,
                label: 'Iron (%)'
            },
            {
                id: 7,
                title: 'id',
                placed: true,
                hidden: true,
                sortBy: false,
            },

        ],
        minCurrent: 0,
        maxCurrent: 10,
        prodsPerPage: [
            {
                id:1,
                value: 10,
                label: '10 Per Page',
                active: true
            },
            {
                id:2,
                value: 15,
                label: '15 Per Page',
                active: false
            },

            {
                id:3,
                value: 20,
                label: '20 Per Page',
                active: false
            },
        ],
    },
    getters: {
        idsPlacedProperties: state =>{
          return state.properties.filter(item=>item.placed === true ).map(item=>item.id)
        },
        placedProperties: state =>{
            return state.properties.filter(item=>item.placed === true )
        },
        products: (state) => {
            return state.products
        },
        properties: (state) => {
            return state.properties
        },
        prodsPerPage: (state) =>{
            return state.prodsPerPage
        },
        allProps: (state) => {
            return state.properties
        },

        minCurrent: (state)=>{
          return state.minCurrent
        },
        maxCurrent: (state)=>{
            return state.maxCurrent
        },
    },
    actions: {
        fetchProducts({commit}){
            getProducts()
                .then((resProducts, rejected) => {

                    if(rejected){
                        throw new Error('error')
                    }
                    commit('SET_PRODUCTS', resProducts)
                })
                .catch((error) => {
                    console.log(error.error);
                });
        },
        setPlacedAllProps( {commit}, newProps){
            commit('SET_PROPERTIES', newProps)
        },
        setAllProducts({commit}, products){
            commit('SET_PRODUCTS', products )
        },
        setFirstProperty({commit}, firstProp){
            const props = [...this.getters.properties]

            props.map(item => {
                item.sortBy = false
                if(item.title === firstProp){
                    item.sortBy = true
                }
                return item
            })


            commit('SET_PROPERTIES', props);
        },

        setProdsPerPageById({commit}, id){
            const prevValue = this.getters.prodsPerPage.find(item=> item.active === true).value
            const currentValue = this.getters.prodsPerPage.find(item=> item.id === id).value
            const prodsLength = this.getters.products.length;
            const min = this.getters.minCurrent
            const max = this.getters.maxCurrent

            const newProdsPerPage = this.getters.prodsPerPage.map(item=>{
                item.active = false;
                if(item.id === id){
                    item.active = true
                }
                return item;
            })
            const difference = currentValue - prevValue;
            let newMin = min
            let newMax = max
            if(max !== prodsLength) {
                newMax = max + difference
            }
            else{
                newMin = min - difference
            }
            commit('SET_MAX_CURRENT', newMax);
            commit('SET_MIN_CURRENT', newMin)
            commit('SET_PRODUCTS_PERPAGE', newProdsPerPage);
        },
        nextPage({commit}){
            const activeProdsPerPage = this.getters.prodsPerPage.find(item=>item.active === true)
            let newMin =this.getters.minCurrent + activeProdsPerPage.value;
            let newMax = this.getters.maxCurrent + activeProdsPerPage.value;
            if(newMax > this.getters.products.length) {
                newMax = this.getters.products.length
                newMin = this.getters.products.length - activeProdsPerPage.value
            }
            commit('SET_MIN_CURRENT', newMin);
            commit('SET_MAX_CURRENT', newMax);
        },
        backPage({commit}){
            const activeProdsPerPage = this.getters.prodsPerPage.find(item=>item.active === true)
            let newMin =this.getters.minCurrent - activeProdsPerPage.value;
            let newMax = this.getters.maxCurrent - activeProdsPerPage.value;
            if(newMin < 0) {
                newMin = 0
                newMax = activeProdsPerPage.value
            }
            commit('SET_MIN_CURRENT', newMin);
            commit('SET_MAX_CURRENT', newMax);
        },
        setProperties({commit}, newProps){
            console.log(newProps)
            commit('SET_PROPERTIES', newProps)
        },
        deleteProds({commit}, arrIds){
            const currentProds = this.getters.products;
            const newProds = currentProds.filter(item=> !arrIds.includes(item.id))
            deleteProducts()
                .then((resProducts, rejected) => {
                    if(rejected){
                        throw new Error('error')
                    }
                    commit('SET_PRODUCTS',newProds)
                })
                .catch((error) => {
                    console.log(error.error);
                });
        },
        deleteProd({commit}, id){
            deleteProducts()
                .then((resProducts, rejected) => {
                    if(rejected){
                        throw new Error('error')
                    }
                    commit('REMOVE_PRODUCT_ID', id);
                })
                .catch((error) => {
                    console.log(error.error);
                });
        },
    },
    mutations: {
        SET_PRODUCTS(state, newProducts) {
            state.products = newProducts;
        },

        SET_PROPERTIES(state, newProps){
            state.properties = newProps;
        },
        SET_PRODUCTS_PERPAGE(state, newValue){
            state.productsPerPage = newValue;
        },
        REMOVE_PRODUCT_ID(state, id){
            const foundItem = state.products.find(item => item.id === id);
            const idxDeletedItem = state.products.indexOf(foundItem);
            state.products.splice(idxDeletedItem, 1);
        },
        SET_MIN_CURRENT(state, newValue){
          state.minCurrent = newValue
        },
        SET_MAX_CURRENT(state, newValue){
            state.maxCurrent = newValue
        },
    }
})
