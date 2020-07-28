<template>
  <div>
  <div v-if="good" class="goodDetails">
    <h1 class="headline goodName">{{good.title}}</h1>
    <div class="images">
      <img
         class="mainImage"
         :src="good.images[0]"
      >
      <div class="imagesPreview">
        <img
           class="image"
           v-for="(image, index) in good.images"
           :key="(good._id.$oid) + 'image' + index"
           :src="image"
           @click="choseImage"
        >
      </div>
    </div>
    <div class="properties">
      <div class="sizes">
        <h1 class="headline">Available sizes:</h1>
        <div class="sizesAvailable">
          <h2
             class="size"
             v-for="(size, index) in good.size"
             :key="(good._id.$oid) + 'sizes' + index"
          >{{size}}</h2>
        </div>
      </div>
      <h2 class="price">Price : {{good.price}}$</h2>
      <div v-if="good.rating" class="rating">
        <h1 class="headline">Rating:</h1>
        <img
           v-for="n in Math.round(good.rating)"
           src="./../../images/star.png"
           width="30"
           height="30"
           :key="(good._id.$oid) + 'rating' + n"
        >
      </div>
      <div class="tags">
        <h1 class="headline">Tags:</h1>
        <h1
           class="tag"
           v-for="(tag,index) in good.tags"
           :key="(good._id.$oid) + 'tag' + index"
        >{{tag}}</h1>
      </div>
      <div class="availableColors">
        <h1 class="headline">Available colors:</h1>
        <div
           class="color"
           :style="{backgroundColor: color}"
           v-for="(color,index) in good.color"
           :key="(good._id.$oid) + 'color' + index"
        >{{color}}</div>
      </div>
    </div>
    <div class="descriptionBlock">
      <h1 class="headline">Description:</h1>
      <p class="description">{{good.description}}</p>
    </div>
    <button
       class="button"
       @click="$router.go(-1)"
    >Back to the Good List</button>
  </div>
  <div v-if="good === undefined">
    <img src="./../../images/404.gif" width="220px" alt="John Travolta ic confused">
    <h1 class="headline">Sorry! Selected good wasn't found!</h1>
    <button
       class="button"
       @click="$router.push({path: '/goodsList'})"
    >Back to the Good List</button>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Good',

  created () {
    this.$store.dispatch('getGoods')
  },

  computed: {
    good () { return this.$store.getters.getGoodById(this.$route.params.id) }
  },

  methods: {
    choseImage () { console.log(event.target) }
  }
}
</script>

<style lang="scss">
  .goodDetails {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $secondary-color;
    max-width: 80%;
    margin: 0 auto;
    border-radius: 2rem;

    & .headline {
      font-size: 2rem;
      margin: 0;
      padding: 0;

      &.goodName {
        margin: 1rem 0;
        font-size: 3rem;
      }
    }

    .images {
      margin: 0 0 0 2rem;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      max-width: 800px;

      .mainImage {
        max-width: 400px;
        margin: 0 auto 1rem;
      }

      .imagesPreview {
        margin: 0 auto;

        .image {
          max-width: 150px;
          max-height: 110px
        }
      }
    }

    .properties {
      display: flex;
      flex-direction: column;

      .sizes {
        .headline {
          font-size: 1.5rem;
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
            width: 2rem;
            height: 2rem;
            background-color: $primary-background-color;
          }
        }
      }

      .price {
        margin: 0;
        color: $tertiary-color;
      }

      .rating {
        display: flex;
        flex-direction: row;
        align-self: center;
        margin: 0;
      }

      .tags {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        color: $tertiary-color;
        margin: 0;

        .tag {
          margin: 0;
        }
      }

      .availableColors {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .color {
          margin: 0 0.5rem;
          font-size: 0;
          width: 25px;
          height: 25px;
          border: 3px solid $tertiary-color;
        }
      }
    }
  }

  .descriptionBlock {
    padding: 0 1rem;
    color: $tertiary-color;
  }
</style>
