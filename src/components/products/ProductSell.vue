<template>
  <div class="container">
    <div class="loading" :style="isLoading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 offset-3 pt-3 card mt-5 shadow">
        <div class="card-body">
          <h3>Ürün Çıkışı</h3>
          <hr />
          <div class="form-group">
            <label>Ürün Adı</label>
            <select
              class="form-control"
              v-model="selectedP"
              @change="productSelected(selectedP)"
            >
              <option selected disabled>Lütfen bir ürün seçiniz</option>
              <option
                v-for="product in getProducts"
                :key="product.key"
                :value="product.key"
                :disabled="product.quantity <= 0"
              >
                {{ product.title }}
              </option>
            </select>
          </div>
          <transition name="fades" mode="out-in">
            <div class="card mb-2 border border-danger" v-if="product">
              <div class="card-body">
                <div class="row">
                  <div class="col-12 text-center">
                    <div class="mb-3">
                      <span class="badge badge-info">Stok: {{ product.quantity }}</span
                      >
                      <span class="badge badge-primary">Fiyat: {{ product.price | currency }}</span
                      >
                    </div>
                    <p class="border border-warning p-2 text-secondary">
                      {{ product.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <div class="form-group">
            <label>Adet</label>
            <input
              type="text"
              class="form-control"
              placeholder="Ürün adetini giriniz.."
              v-model="productCount"
            />
          </div>
          <hr />
          <button
            :disabled="checkButton"
            @click="sellProduct()"
            class="btn btn-primary"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import loadingMixin from '../../mixins/loading'
export default {
  name: "ProductSell",
  mixins:[loadingMixin],
  data() {
    return {
      selectedP: null,
      product: null,
      productCount: 0,
      updateButtonClicked: false,
    };
  },
  methods: {
    productSelected(key) {
      this.product = this.$store.getters.getProduct(this.selectedP);
      return;
    },
    sellProduct() {
      this.updateButtonClicked = true;
      let payload = {
        key: this.product.key,
        sellCount: this.productCount,
      };
      setTimeout(()=>{
        this.$store.dispatch("sellProduct", payload);
      },1000)
    },
  },
  computed: {
    ...mapGetters(["getProducts"]),
    checkButton() {
      if (this.product != null && this.productCount != 0) {
        return false;
      } else {
        return true;
      }
    },
    isLoading() {
      return this.isLoadingMethod(this.updateButtonClicked)
    },
  },
  beforeRouteLeave(to, from, next) {
    if ((this.sellCount > 0 || this.selectedP != null) &&!this.updateButtonClicked) {
      if (
        confirm(
          "Eğer çıkarsanız yaptığınız değişiklikler kaybedilecektir. Devam etmek istiyor musunuz?"
        )
      ) {
        next(true);
      } else {
        next(false);
      }
    } else {
      next(true);
    }
  },
};
</script>

<style scoped>
.border-danger {
  border-style: dashed !important;
}
</style>