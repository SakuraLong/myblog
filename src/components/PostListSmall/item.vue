<template>
  <router-link
    class="link border block padding post-list-small__item"
    :to="data.to"
  >
    <div
      class="flex gap width-100"
      f-c
      g-small
    >
      <span
        class="font"
        s-small
        f-color="r"
      >{{ data[type] }}</span>
      <span
        class="font"
        s-big
        f-color="p"
      >{{ data.title }}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    data: {
      default: () => {
        return {
          to: '',
          showTime: '',
          wordCount: 0,
          title: ''
        }
      },
      type: Object
    },
    type: {
      default: 'showTime',
      type: String
    }
  }
}
</script>

<style>
.post-list-small__item {
  transition: box-shadow .3s;
  box-shadow: var(--bl-shadow-t);
}
.post-list-small__item:hover > div > span:last-child {
  text-decoration: underline;
}
.post-list-small__item:hover {
  transition: box-shadow .3s;
  box-shadow: var(--bl-shadow-03);
}
</style>
