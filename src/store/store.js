import Vue from 'vue';
import Vuex from 'vuex';
// import {getProducts} from '../request.js';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        products: [],
        properties: [],
        allProperties: ["id", "product", "calories", "fat", "carbs", "protein", "iron"],
        allProps: [

            {
                id: 1,
                title: 'product',
                seen: true,
                sortBy: true,
            },
            {
                id: 2,
                title: 'calories',
                seen: true,
                sortBy: false,
            },
            {
                id: 3,
                title: 'fat',
                seen: true,
                sortBy: false,
            },
            {
                id: 4,
                title: 'carbs',
                seen: false,
                sortBy: false,
            },
            {
                id: 5,
                title: 'protein',
                seen: false,
                sortBy: false,
            },
            {
                id: 6,
                title: 'iron',
                seen: true,
                sortBy: false,
            },
            {
                id: 7,
                title: 'id',
                seen: true,
                sortBy: false,
            },

        ],
        shownProducts: [],
        allValuesProdsPerPage: [10, 15, 20],
        productsPerPage: 10,
        currentProducts: 10,
    },
    getters: {
        products: () => {
            return this.state.products
        },
        properties: ()=> {
            return this.state.properties;
        },
        allProperties: ()=>{
            return this.state.allProperties;
        },
    },
            // return state.products.map(({ id, quantity }) => {
            //     const product = rootState.products.all.find(product => product.id === id)
            //     return {
            //         title: product.title,
            //         price: product.price,
            //         quantity
            //     }
            // })
    actions: {
        setAllProducts({commit}, products){
            commit('setProducts', products )
        },
        setAllProperties({commit}) {
            const newProperties =  [ "id", "product", "calories", "fat", "iron"];
            commit('setProperties', newProperties);
        },
        setFirstProperty({commit}, firstProp){
            const found = this.state.properties.find(item=> item === firstProp);
            if(found === undefined) {
                return;
            }
            const newProperties = []
            newProperties.push(firstProp);
            this.state.properties.forEach(item=> {
                if(item !== firstProp){
                    newProperties.push(item);
                }
            })
            commit('setProperties', newProperties);
        },
        setProdsPerPage({commit}, newValue){
            commit('setProductsPerPage', newValue);
            console.log(this.state.productsPerPage);
        },
        nextPage({commit}){
            const newValue = this.state.currentProducts + this.state.productsPerPage;
            commit('setCurrentPage', newValue);
        },
        backPage({commit}){
            const newValue = this.state.currentProducts - this.state.productsPerPage;
            commit('setCurrentPage', newValue);
        },
        setProperty({commit}, prop) {
            const newProperties = [];
            const oldProperties = this.state.properties;
            const found = oldProperties.find(item => item === prop);
            if (found === undefined) {
                oldProperties.forEach(item => newProperties.push(item));
                newProperties.push(prop);
            }
            else{
                oldProperties.forEach(item=> {
                        if(item !== prop){
                            newProperties.push(item);
                        }
                    }
                );
            }
            commit('setProperties', newProperties);
        },
        deleteProd({commit}, product){
            commit('deleteProduct', product.id);
        },
        setShownProds({commit}, products){
            commit('setShownProducts', products);
        }
        // addProperty({commit}, newProperty){
        //     //
        // }
        // getProducts ({ commit }, id) {
        //     // return the Promise via `store.dispatch()` so that we know
        //     // when the data has been fetched
        //     return getProducts(id).then(item => {
        //         commit('setItem', { id, item })
        //     })
        // }
    },
    mutations: {
        setProducts(state, newProducts) {
            state.products = newProducts;
        },
        setProperties(state, newProperties){
            state.properties = newProperties;
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
        }
    }
})