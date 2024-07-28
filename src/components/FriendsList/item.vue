<template>
  <a
    :href="friend.url"
    target="_blank"
    :title="friend.name"
    class="link friends-list-item"
    rel="noopener noreferrer"
    :style="{'--color': friend.color}"
  >
    <div>
      <img
        :src="friend.avatar"
        :alt="friend.name"
        loading="lazy"
        draggable="false"
      >
    </div>
    <div>
      <LateralExtrusion
        class="friend-item__blog"
        :max-width="170"
        :str="friend.blog"
      />
      <LateralExtrusion
        class="friend-item__desc"
        :max-width="170"
        :str="friend.desc"
      />
    </div>
  </a>
</template>

<script>
import LateralExtrusion from '@/components/LateralExtrusion'
export default {
  components: {
    LateralExtrusion
  },
  props: {
    friend: {
      default: () => {
        return {
          url: 'https://www.yunyoujun.cn',
          avatar: 'https://www.yunyoujun.cn/images/avatar.jpg',
          name: '云游君',
          blog: '云游君的小站',
          desc: '希望能成为一个有趣的人',
          color: '#0078e7'
        }
      },
      type: Object
    }
  }
}
</script>

<style>
.friends-list-item {
  display: flex;
  padding: 10px;
  width: 270px;
  border: 1px solid var(--color, var(--bl-moonlight-blue-5));
  color: var(--color, var(--bl-moonlight-blue-5)) !important;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bl-color-lighter-fill);
  transition: all .3s;
  box-shadow: 0px 0px 0px 0px transparent;
}
.friends-list-item > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.friends-list-item > div:last-child {
  width: 170px;
  gap: 6px;
}
.friends-list-item img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid var(--color, var(--bl-moonlight-blue-5));
  box-sizing: border-box;
  overflow: hidden;
}
.friend-item__blog {
  font-size: 17px;
  font-weight: bold;
}
.friend-item__desc {
  font-size: 13px;
}
.friends-list-item:hover {
  background-color: var(--color, var(--bl-moonlight-blue-5));
  box-shadow: 0px 0px 0px 0px transparent;
  color: white !important;
  box-shadow: 0 2px 20px var(--color, var(--bl-moonlight-blue-5));
}
</style>
