import Vue from 'vue';
import Vuex from 'vuex';
// import {getProducts} from '../request.js';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        products: [],
        // properties: [],
        // allProperties: ["id", "product", "calories", "fat", "carbs", "protein", "iron"],
        allProps: [
            {
                id: 1,
                title: 'product',
                placed: true,
                sortBy: true,
            },
            {
                id: 2,
                title: 'calories',
                placed: true,
                sortBy: false,
            },
            {
                id: 3,
                title: 'fat',
                placed: true,
                sortBy: false,
            },
            {
                id: 4,
                title: 'carbs',
                placed: false,
                sortBy: false,
            },
            {
                id: 5,
                title: 'protein',
                placed: false,
                sortBy: false,
            },
            {
                id: 6,
                title: 'iron',
                placed: true,
                sortBy: false,
            },
            {
                id: 7,
                title: 'id',
                placed: true,
                hidden: true,
                sortBy: false,
            },

        ],
        shownProducts: [],
        allValuesProdsPerPage: [10, 15, 20],
        productsPerPage: 10,
        currentProducts: 10,
        prodsPerPage: [
            {
                id:1,
                value: 10,
                label: '10 Per Page',
                current: true
            },
            {
                id:2,
                value: 15,
                label: '15 Per Page',
                current: false
            },

            {
                id:3,
                value: 20,
                label: '20 Per Page',
                current: false
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
        setFirstProperty({commit}, firstProp){
            const props = this.state.allProps
                .map(item => {
                    item.sortBy = false;
                    return item
                })
                .map(item => {
                    if(item.title === firstProp){
                        item.sortBy = true;
                    }
                    return item
                })
            commit('setAllProps', props);
        },

        setProdsPerPageById({commit}, id){
            const newProdsPerPage = this.state.prodsPerPage.map(item=>{
                item.current = false;
                if(item.id === id){
                    item.current = true
                }
                return item;
            })
            commit('setProductsPerPage', newProdsPerPage);
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
            commit('setProducts',newProds )
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
        // setProperties(state, newProperties){
        //     state.properties = newProperties;
        // },
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
        }
    }
})






// sortBy({commit}, order){
//     const prods = this.state.products;
//     const sortedCol = this.state.allProps.find((item)=>item.sortBy === true);
//     const prop = sortedCol.title
//     const orderBy = order;
//     // console.log(orderBy)
//     // console.log(prop);
//     function dynamicSort(property,order) {
//         var sort_order = 1;
//         if(order === false){
//             sort_order = -1;
//         }
//         return function (a, b){
//             // a should come before b in the sorted order
//             if(a[property] < b[property]){
//                 return -1 * sort_order;
//                 // a should come after b in the sorted order
//             }else if(a[property] > b[property]){
//                 return 1 * sort_order;
//                 // a and b are the same
//             }else{
//                 return 0 * sort_order;
//             }
//         }
//     }
//
//     prods.sort(dynamicSort(prop, orderBy));
//     commit('setProducts', prods);
//     console.log(this.state.products);
// },