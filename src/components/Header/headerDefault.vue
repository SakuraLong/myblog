<template>
  <div class="header-default">
    <nav>
      <router-link
        v-for="item, i in items"
        :key="i"
        class="link header-default__link"
        :to="item[0]"
      >
        <el-icon>
          <component :is="item[2]" />
        </el-icon>
        <span>{{ $t(item[1]) }}</span>
      </router-link>
    </nav>
    <div class="flex gap">
      <ThemeSelector :absolubte="true" />
      <LanguageSelector :absolubte="true" />
    </div>
  </div>
</template>

<script>
import store from '@/store'
import ThemeSelector from '@/components/ThemeSelector'
import LanguageSelector from '@/components/LanguageSelector'
export default {
  components: {
    ThemeSelector,
    LanguageSelector
  },
  data() {
    return {
      items: store.state.navItems
    }
  }
}
</script>

<style>
.header-default {
  display: none;
}
@media (min-width: 1050px) {
  .header-default {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    padding: 0px 50px;
  }
  .header-default__link {
    display: inline-flex;
    align-items: center;
    color: var(--bl-color-primary-text);
    padding: 8px;
    font-size: 17px;
    border-radius: 8px;
    margin: 0px 10px;
  }
  .header-default__link:hover {
    color: var(--bl-moonlight-blue-5);
    /* background-color: var(--bl-link-background-color); */
  }
  .header-default__link > i {
    margin-right: 5px;
  }
}
@media (min-width: 1200px) {
  .header-default {
    /* padding-left: 100px; */
  }
}
</style>
