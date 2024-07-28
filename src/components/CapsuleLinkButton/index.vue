<template>
  <router-link
    class="link link-button"
    :to="to"
  >
    <span>{{ name }}</span>
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      default: '/',
      type: String
    },
    name: {
      default: 'tag',
      type: String
    }
  }
}
</script>

<style>
.link-button {
  display: inline-block;
  padding: 3px 7px;
  margin: 3px 5px;
  color: var(--bl-color-primary-text);
  border-radius: 50px;
  border: 1px solid var(--bl-color-base-border);
  background-color: #00000000;
  transition: all .3s;
}
.link-button:hover {
  border: 1px solid var(--bl-moonlight-blue-5);
  background-color: var(--bl-link-button-background-color);
  transition: all .3s;
}
</style>
