<template>
  <div class="menu-child">
    <h3 t-center>Friends</h3>
    <FriendsListTest />
    <FriendsList />
  </div>
</template>

<script>
import FriendsList from '@/components/FriendsList'
import FriendsListTest from '@/components/FriendsList/friendTest.vue'
import { scrollToTop } from '@/utils/utils'
export default {
  components: {
    FriendsList,
    FriendsListTest
  },
  beforeUnmount() {
    scrollToTop()
  }
}
</script>

<style>
</style>
