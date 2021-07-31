<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #563F7A">
    <router-link to="/" class="navbar-brand" tag="a">Ürün Listesi</router-link>
<!--    <a class="navbar-brand" href="#">Ürün Listesi</a>-->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'product.purchase'}" tag="a">Ürün İşlemleri</router-link>
<!--          <a class="nav-link" href="#">Ürün İşlemleri</a>-->
        </li>
        <li class="nav-item">
<!--          <a class="nav-link" href="#">Ürün Çıkışı</a>-->
          <router-link :to="{name :'product.shell'}" class="nav-link" tag="a">Ürün Çıkışı</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "header"
}
</script>

<style scoped>

</style>