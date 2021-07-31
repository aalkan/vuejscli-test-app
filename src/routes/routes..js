import VueRouter from "vue-router";
import Vue from "vue"

import ProductList from "../components/products/ProductList";
import ProductPurchase from "../components/products/ProductPurchase";
import ProductShell from "../components/products/ProductSell";
Vue.use(VueRouter)

 const routes =  [
    {path : '/' ,component : ProductList,name :'home'},
    {path : '/urun-islemleri' ,component : ProductPurchase,name :'product.purchase'},
    {path : '/urun-cikisi' ,component : ProductShell,name : 'product.shell'},
    {path : '*', redirect : '/' }
]

export const router = new VueRouter({
    mode : 'history',
    routes:routes
})