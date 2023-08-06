<template>
  <aside class="aside-menu" id="aside-menu">
    <ul class="list">
      <li class="item selected" @click="addSelected('/weatherToday')">{{ $t('asideMenu.today')}}</li>
<!--      <li class="item" @click="addSelected('/')">{{ $t('asideMenu.tomorrow')}}</li>-->
<!--      <li class="item" @click="addSelected('/')">{{ $t('asideMenu.threeDays')}}</li>-->
<!--      <li class="item" @click="addSelected('/')">{{ $t('asideMenu.sevenDays')}}</li>-->
      <li v-if="this.$store.state.user" class="item" @click="addSelected('/profile')">
        {{ $t('asideMenu.profile')}}
      </li>
      <li v-if="this.$store.state.user" class="item" @click="signOut">{{ $t('asideMenu.signOut')}}</li>
      <li v-if="!this.$store.state.user" class="item" @click="() => { this.$router.push('/auth') }">
        {{ $t('signIn.signIn')}}
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'AsideMenu',

  methods: {
    addSelected (routePath) {
      if (document.querySelector('.selected')) {
        document.querySelector('.selected').classList.remove('selected')
      }
      event.target.classList.add('selected')
      if (this.$router.currentRoute.path === routePath) {
      } else {
        this.$router.push({ path: routePath })
      }
    },
    signOut () {
      this.$store.dispatch('signOut')
        .then(() => { this.$router.push('/auth') })
        .catch(error => { this.errorText = this.$t('changeUserWindow.signOutFailed') + error.message })
    }
  }
}
</script>

<style lang="scss">
  .aside-menu {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    background-color: $primary-color;
    transition: 0.5s;

    @include bigPhone {
      top: 20px
    }

    &.hidden {
      transform: translateX(-173px);

      @include bigPhone {
        transform: translateX(-120px);
      }

      & .show-hide {
        transform: rotate(180deg);
      }
    }

    & .show-hide {
      position: relative;
      left: 97px;
      top: 85px;
      border-radius: 0;
      padding: 0;
      margin: 0.3rem 0 0.3rem 0;
      border-width: 10px 9px 10px 0;
      background-color: transparent;
      border-color: transparent $tertiary-color transparent transparent;
      box-shadow: none;
      outline: none;
      z-index: 10;
      transition: 0.5s;

      @include bigPhone {
        left: 70px;
      }

      &:hover {
        cursor: pointer;
      }
    }

    .list {
      list-style: none;
      margin-top: 6rem;
      padding: 0;
      position: relative;
      display: flex;
      flex-direction: column;

      & .item {
        padding: 0.5rem 2rem;
        font-size: 1.5rem;
        width: 6.8rem;
        text-decoration: none;
        color: $secondary-color;

        &:hover {
          cursor: pointer;
        }

        $block-height: 45px;
        $amount-of-menu-items: 7;
        &:last-child {
          &:after {
            left: 2px;
            top: $block-height*($amount-of-menu-items - 1);
            position: absolute;
            content: "";
            background-color: $primary-background-color;
            width: 10.7rem;
            border-radius: 0.5rem 0 0 0.5rem;
            height: $block-height;
            z-index: -1;
            transition: 0.5s;
          }
        }

        @for $i from 1 through $amount-of-menu-items {
          &.item:nth-child(#{$i}).selected ~ .item:last-child:after {
            top: #{$block-height*($i - 1)};
          }
        }

        @include bigPhone {
          padding: 0.5rem 1rem;
          font-size: 1.2rem;
          min-width: 5.4rem;

          $block-height-bp: 39px;
          @for $i from 1 through $amount-of-menu-items {
            &.item:nth-child(#{$i}).selected ~ .item:last-child:after {
              top: #{$block-height-bp*($i - 1)};
            }
          }

          &:last-child {
            &:after {
              top: $block-height-bp*5;
              background-color: $primary-background-color;
              width: 7.3rem;
              height: $block-height-bp;
            }
          }
        }

        &.selected {
          color: $tertiary-color;
          z-index: 10;
          transition: 0.5s;
        }
      }
    }
  }

</style>
