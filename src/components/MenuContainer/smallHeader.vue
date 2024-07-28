<template>
  <header
    class="mc-sm flex"
    f-w
  >
    <router-link
      v-for="link, i in links"
      :key="i"
      class="link mc-sh-link"
      :class="{'mc-sh-link--selected': $route.meta.type === link[0]}"
      :to="link[2]"
    >
      {{ $t(link[1]) }}
    </router-link>
  </header>
</template>

<script>
export default {
  data() {
    return {
      links: [
        ['about', 'Menu.Nav.about', '/menu/about'],
        ['projects', 'Menu.Nav.projects', '/menu/projects'],
        ['friends', 'Menu.Nav.friends', '/menu/friends']
      ]
    }
  }
}
</script>

<style>
.mc-sm {
  position: sticky;
  top: 60px;
  background-color: var(--bl-color-lighter-fill);
  padding: 5px 10px;
  border-bottom: 1px solid var(--bl-color-base-border);
  z-index: 100;
}
.mc-sh-link {
  padding: 4px 8px;
  font-size: 17px;
  border-radius: 8px;
  margin: 3px 10px;
}
.mc-sh-link:hover {
  color: var(--bl-moonlight-blue-5);
}
.mc-sh-link--selected {
  color: var(--bl-moonlight-blue-5) !important;
}
</style>
