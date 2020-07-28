<template>
  <div>
    <div v-if="this.goodsOnPage" class="goodsList">
      <div
         class="good"
         v-for="value in this.goodsOnPage"
         :key="value._id.$oid"
         @click="showCurrentGood(value._id.$oid)"
      >
        <div class="images">
          <img
             width="300"
             height="180"
             :src="value.images[0]"
          >
        </div>
        <h1 class="headline">{{value.title}}</h1>
        <div class="imageProperties">
          <div class="properties">
            <div class="sizes">
              <h1 class="headline">Available sizes:</h1>
              <div class="sizesAvailable">
                <h2
                   class="size"
                   v-for="(size, index) in value.size"
                   :key="(value._id.$oid) + 'sizes' + index">
                  {{size}}</h2>
              </div>
            </div>
            <h2 class="price">Price : {{value.price}}$</h2>
            <div v-if="value.rating" class="rating">
              <h1 class="headline">Rating:</h1>
              <img
                 v-for="n in Math.round(value.rating)"
                 src="./../../images/star.png"
                 width="30"
                 height="30"
                 :key="(value._id.$oid) + 'rating' + n"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
       v-if="goods"
       class="pagesList"
       id="pagesList"
       ref="pagesList"
    >
      <p
         class="page"
         v-for="n in amountOfPages" :key="'page' + n"
         @click="changePage"
      >{{n}}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'GoodsList',

  created () {
    this.$store.dispatch('getGoods')
  },

  updated () {
    if (this.currentPage === 1) { this.$refs.pagesList.children[this.currentPage - 1].classList.add('selected') }
  },
  data () {
    return {
      amountOfGoodsOnPage: 9,
      currentPage: 1
    }
  },

  computed: {
    goodsOnPage () {
      if (this.goods) {
        return (
          this.goods
            .slice((this.currentPage - 1) * this.amountOfGoodsOnPage,
              this.amountOfGoodsOnPage * this.currentPage))
      } else {
        return null
      }
    },
    amountOfPages () {
      return Math.ceil(this.goods.length / this.amountOfGoodsOnPage)
    },
    ...mapState({
      goods: state => state.goods
    })
  },

  methods: {
    changePage () {
      this.$refs.pagesList.children[this.currentPage - 1].classList.remove('selected')
      this.currentPage = event.target.innerText
      this.$refs.pagesList.children[this.currentPage - 1].classList.add('selected')
    },
    showCurrentGood (key) {
      this.$router.push(`/good/${key}`)
    }
  }

}
</script>

<style lang="scss">
  .goodsList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;

    & .headline {
      font-size: 2rem;
      margin: 0;
      padding: 0;
    }

    .good {
      margin: 1rem 3rem;
      max-width: 310px;
      min-width: 300px;
      max-height: 500px;
      background-color: $secondary-color;
      color: $tertiary-color;
      border-radius: 1rem;
      transition: 0.5s;

      &:hover {
        cursor: pointer;
        transform: scale(1.05);
      }

      .imageProperties {
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        .images {
          margin: 0 0 0 2rem;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          max-width: 300px;
        }

        .properties {
          display: flex;
          flex-direction: column;

          .sizes {
            .headline {
              font-size: 1rem;
              margin: 0;
            }

            .sizesAvailable {
              display: flex;
              flex-direction: row;
              justify-content: center;
              margin: 0;

              .size {
                padding: 0.5rem;
                margin: 0.5rem;
                width: 1rem;
                height: 1rem;
                font-size: 1rem;
                background-color: $primary-background-color;
              }
            }
          }

          .price {
            margin: 0;
          }

          .rating {
            display: flex;
            flex-direction: row;
            align-self: center;
            margin: 0;
          }
        }
      }
    }
  }

  .pagesList {
    display: flex;
    flex-direction: row;
    justify-content: center;

    .page {
      margin: 0.5rem 1rem;
      border: 2px solid $primary-color;
      min-width: 10px;
      border-radius: 25%;
      padding: 0 0.5rem;
      font-size: 1.2rem;
      font-weight: bold;

      &.selected {
        color: $tertiary-color;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

</style>
