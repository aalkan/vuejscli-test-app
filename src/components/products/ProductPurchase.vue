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
          <h3>Ürün İşlemleri</h3>
          <hr />
          <div class="form-group">
            <label>Ürün Adı</label>
            <input
              type="text"
              class="form-control"
              v-model="product.title"
              placeholder="Ürün adını giriniz.."
            />
          </div>
          <div class="form-group">
            <label>Adet</label>
            <input
              type="number"
              class="form-control"
              v-model="product.quantity"
              placeholder="Ürün adetini giriniz.."
            />
          </div>
          <div class="form-group">
            <label>Fiyat</label>
            <input
              type="number"
              class="form-control"
              v-model="product.price"
              placeholder="Ürün fiyatı giriniz.."
            />
          </div>
          <div class="form-group">
            <label>Açıklama</label>
            <textarea
              cols="30"
              rows="5"
              v-model="product.description"
              placeholder="Ürüne ait bir açıklama giriniz..."
              class="form-control"
            ></textarea>
          </div>
          <hr />
          <button
            class="btn btn-primary"
            :disabled="saveButton"
            @click="saveProduct()"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Vue from "vue";
import isloadingMixin from "../../mixins/loading"
export default {
  name: "ProductPurchase",
  mixins:[isloadingMixin],
  data() {
    return {
      product: {
        title: "",
        quantity: null,
        price: null,
        description: "",
      },
      saveButtonClick: false,
    };
  },
  methods: {
    saveProduct() {
      this.saveButtonClick = true;
      setTimeout(() => {
        this.$store.dispatch("saveProduct", this.product);
      }, 1000);
    },
  },
  computed: {
    saveButton() {
      if (
        this.product.title.length >= 1 &&
        this.product.description.length >= 1 &&
        this.product.quantity.length > 0 &&
        this.product.price.length > 0
      ) {
        return false;
      } else {
        return true;
      }
    },
    isLoading() {
     return this.isLoadingMethod(this.saveButtonClick)
    },
  },

  beforeRouteLeave(to, from, next) {
    if (
      (this.product.title.length > 0 ||
        this.product.description.length > 0 ||
        this.product.quantity != null ||
        this.product.price != null) &&
      !this.saveButtonClick
    ) {
      if (
        confirm(
          "Eğer çıkarsanız yaptığınız değişiklikler kaybedilecektir. Devam etmek istiyor musunuz?"
        )
      ) {
        next();
      } else {
        next(false);
      }
    } else {
      next(true);
    }
  },

  // computed : {
  //   ...mapActions([
  //           'saveProduct',
  //       ])
  // }
};
</script>

<style scoped>
.display {
  display: block;
}
.dontDisplay {
  display: none;
}
</style>