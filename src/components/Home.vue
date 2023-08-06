<template>
  <div>
    <ChangeUserWindow/>
    <Aside-menu/>
    <router-view/>
  </div>
</template>

<script>
import ChangeUserWindow from './Home/ChangeUserWindow/ChangeUserWindow'
import AsideMenu from './Home/AsideMenu'

export default {
  name: 'Home',

  components: { AsideMenu, ChangeUserWindow }
}
</script>
