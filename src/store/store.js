import Vue from 'vue';
import Vuex from 'vuex';
import {deleteProducts, getProducts} from "@/request";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        products: [],
        allProps: [
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
        products: (state) => {
            return state.products
        },
        properties: (state) => {
            return state.allProps
        },
        prodsPerPage: (state) =>{
            return state.prodsPerPage
        },
        allProps: (state) => {
            return state.allProps
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
                    commit('setProducts', resProducts)
                })
                .catch((error) => {
                    console.log(error.error);
                });
        },
        setPlacedAllProps( {commit}, newProps){
            // const allProps = state.allProps;
            // const nullPlacedProps = allProps.every(item=> item.placed === false);
            // if(nullPlacedProps === true) {
            //     console.log(nullPlacedProps)
            // }
            commit('setAllProps', newProps)
        },
        setAllProducts({commit}, products){
            commit('setProducts', products )
        },
        setFirstProperty({commit}, firstProp){
            const props = [...this.getters.allProps]

            props.map(item => {
                item.sortBy = false
                if(item.title === firstProp){
                    item.sortBy = true
                }
                return item
            })


            commit('setAllProps', props);
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
            commit('setMaxCurrent', newMax);
            commit('setMinCurrent', newMin)
            commit('setProductsPerPage', newProdsPerPage);
        },
        nextPage({commit}){
            const activeProdsPerPage = this.getters.prodsPerPage.find(item=>item.active === true)
            let newMin =this.getters.minCurrent + activeProdsPerPage.value;
            let newMax = this.getters.maxCurrent + activeProdsPerPage.value;
            if(newMax > this.getters.products.length) {
                newMax = this.getters.products.length
                newMin = this.getters.products.length - activeProdsPerPage.value
            }
            commit('setMinCurrent', newMin);
            commit('setMaxCurrent', newMax);
        },
        backPage({commit}){
            const activeProdsPerPage = this.getters.prodsPerPage.find(item=>item.active === true)
            let newMin =this.getters.minCurrent - activeProdsPerPage.value;
            let newMax = this.getters.maxCurrent - activeProdsPerPage.value;
            if(newMin < 0) {
                newMin = 0
                newMax = activeProdsPerPage.value
            }
            commit('setMinCurrent', newMin);
            commit('setMaxCurrent', newMax);
        },
        setProperty({commit}, prop) {
            const props = this.getters.properties;
            if(prop.sortBy === true){
                const foundItem = props.find(item=> item.placed && !item.hidden && !item.sortBy)
                foundItem.sortBy = true;
            }
            let newProps = props.filter(item=>{
                if(item.id === prop.id){
                    item.placed = !item.placed;
                    item.sortBy = false
                }
                return item;
            })

            commit('setAllProps', newProps);

        },
        deleteProds({commit}, arrIds){
            const currentProds = this.getters.products;
            const newProds = currentProds.filter(item=> !arrIds.includes(item.id))
            deleteProducts()
                .then((resProducts, rejected) => {
                    if(rejected){
                        throw new Error('error')
                    }
                    commit('setProducts',newProds)
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
                    commit('deleteProduct', id);
                })
                .catch((error) => {
                    console.log(error.error);
                });
        },
        setShownProds({commit}, products){
            commit('setShownProducts', products);
        }
    },
    mutations: {
        setProducts(state, newProducts) {
            state.products = newProducts;
        },

        setAllProps(state, newProps){
            state.allProps = newProps;
        },
        setProductsPerPage(state, newValue){
            state.productsPerPage = newValue;
        },
        setCurrentPage(state, newValue){
            state.currentProducts = newValue;
        },
        deleteProduct(state, id){
            const foundItem = state.products.find(item => item.id === id);
            const idxDeletedItem = state.products.indexOf(foundItem);
            state.products.splice(idxDeletedItem, 1);
        },
        setShownProducts(state, items){
            state.shownProducts = items;
        },
        setMinCurrent(state, newValue){
          state.minCurrent = newValue
        },
        setMaxCurrent(state, newValue){
            state.maxCurrent = newValue
        },
    }
})
