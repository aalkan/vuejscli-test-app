import Vue from 'vue';
export const setTradeResult = ( {state,commit},tradeResult ) => {
    commit('updateTradeResult',tradeResult)
    let results ={
        purchase : state.purchase,
        sale : state.sale
    }
    Vue.http.put("https://urun-islemleri-app-2cf57.firebaseio.com/trade-results.json",results).then((response)=>{
    })
}
export const getTradeResult = ( {commit} ) => {
Vue.http.get('https://urun-islemleri-app-2cf57.firebaseio.com/trade-results.json').then((response)=>{
    console.log(response)
    let results = {
        purchase: response.data.purchase,
        sale: response.data.sale
    }
    commit('updateTradeResult',results);
})
}