import Vue from 'vue';
import { router } from "../../routes/routes.";
import { each } from "vue-resource/src/util";

const state = {
    products: []
}
const getters = {
    getProducts(state) {
        return state.products;
    },
    getProduct: (state) => (productKey) => {
        return state.products.find(product => product.key == productKey)
    }
}
const mutations = {
    updateProductList(state, product) {
        state.products.push(product)
    }
}
const actions = {
    initApp({ commit }) {
        Vue.http.get('https://urun-islemleri-app-2cf57.firebaseio.com/products.json').then((response) => {
            let datas = response.body;
            for (let key in datas) {
                datas[key].key = key;
                commit('updateProductList', datas[key])
            }
        })
    },
    saveProduct({ commit, state, dispatch }, product) { //Veritabanı işlemleri
        Vue.http.post('https://urun-islemleri-app-2cf57.firebaseio.com/products.json', product)
            .then((response) => {
                product.key = response.data.name;
                commit('updateProductList', product);
                /****************** Alış - Satış tutar işlemleri *****************/
                let tradeResult = {
                    key: product.id,
                    purchase: product.price,
                    sale: 0,
                    count: product.quantity
                }
                dispatch('setTradeResult', tradeResult)
            })
        router.replace({ name: 'home' })
    },
    sellProduct({ commit, dispatch, state }, payload) {
        //Veritabanı işlemleri
       let product = state.products.find(product => product.key == payload.key)
        if (product) {
           let currentCount =product.quantity - payload.sellCount
            Vue.http.patch('https://urun-islemleri-app-2cf57.firebaseio.com/products/' + payload.key + '.json', { count: currentCount })
                .then((response) => {
                    product.quantity = currentCount
                    commit('updateProductList', product);
                    let tradeResult = {
                        key: payload.key,
                        purchase: 0,
                        sale: product.price,
                        count: payload.sellCount
                    }
                    dispatch('setTradeResult', tradeResult)
                })
            router.replace({ name: 'home' })
        }
    }
}

export default {
    actions,
    getters,
    mutations,
    state
}