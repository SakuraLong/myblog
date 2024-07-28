<template>
  <details class="margin">
    <summary
      pointer
      no-select
    >
      <span>
        {{ $t('FriendsList.Test.title') }}
      </span>
    </summary>
    <div
      class="flex margin"
      f-jc-sb
      f-w
    >
      <div><item :friend="friend" /></div>
      <div
        class="flex gap"
        f-c
      >
        <div
          v-for="key in Object.keys(friend)"
          :key="key"
          class="flex gap"
          f-jc-sb
        >
          <span>{{ $t(friendInfo[key]) }}</span>
          <el-input
            v-model="friend[key]"
            size="small"
            style="width: 300px;"
          />
        </div>
      </div>
    </div>
  </details>
</template>

<script>
import item from './item.vue'
export default {
  components: {
    item
  },
  data() {
    return {
      friend: {
        url: 'https://www.sakuralong.com',
        avatar: 'https://cdn.jsdelivr.net/gh/SakuraLong/images/blog/avatar.png',
        name: 'SakuraLong',
        blog: 'SakuraLong\'s Elysian Fields',
        desc: '说点什么好呢？',
        color: '#FFD6FB'
      },
      friendInfo: {
        url: 'FriendsList.Test.url',
        avatar: 'FriendsList.Test.avatar',
        name: 'FriendsList.Test.name',
        blog: 'FriendsList.Test.blog',
        desc: 'FriendsList.Test.desc',
        color: 'FriendsList.Test.color'
      }
    }
  }
}
</script>

<style>

</style>
