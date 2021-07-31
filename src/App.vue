<template>
<div>
  <app-header></app-header>
  <transition mode="out-in" name="fades">
    <router-view></router-view>
  </transition>
  <app-footer></app-footer>
</div>
</template>
<script>
import Header from './components/shared/header'
import Footer from './components/shared/footer'
import ProductPurchase from './components/products/ProductPurchase'
export default {
  components : {
    appHeader : Header,
    appFooter : Footer,
    appProductPurchase : ProductPurchase
  },
  created() {
    this.$store.dispatch('getTradeResult');
    this.$store.dispatch('initApp')
  }
}
</script>
<style >
body{
  background-color: #a7a0bb5c;
}
.fades-enter{
  opacity: 0;
}
.fades-enter-active{
  /*opacity: 1;*/
  /*transform: rotateY(0deg);*/
  transition:opacity  .3s ease-out;
}
.fades-leave-active{
  /*transform: rotateY(360deg);*/
  transition:opacity.3s ease-out;
  opacity: 0 ;
}
</style>