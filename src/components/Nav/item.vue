<template>
  <div class="nav-item">
    <router-link
      class="link nav-item__link"
      :to="to"
    >
      <span>
        <el-icon>
          <component :is="icon" />
        </el-icon>
        {{ $t(name) }}
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      default: '/',
      type: String
    },
    name: {
      default: '',
      type: String
    },
    icon: {
      default: '',
      type: String
    }
  }
}
</script>

<style>
.nav-item__link {
  color: var(--bl-color-primary-text);
  font-size: 18px;
  padding: 8px;
  padding-left: 0px;
  padding-inline-start: 5px;
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  border-left:2px solid transparent;
  transition: all .3s;
}
.nav-item__link:hover {
  transition: all .3s;
  background-color: var(--bl-elysia-background-color);
  border-left:2px solid var(--bl-elysia-base);
}
</style>
