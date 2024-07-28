<template>
  <div class="header-small">
    <router-link
      to="/"
      class="link header-small__link"
    >
      <el-icon>
        <HomeFilled />
      </el-icon>
      <span>{{ $t(home[1]) }}</span>
    </router-link>
    <div
      class="header-small__detail-button"
      @click="showDetail = !showDetail"
    >
      <el-icon :size="25">
        <More v-show="!showDetail" />
        <Close v-show="showDetail" />
      </el-icon>
    </div>
    <div
      v-show="showDetail"
      class="header-small__detail"
    >
      <ThemeSelector />
      <LanguageSelector />
      <nav>
        <router-link
          v-for="item, i in items"
          :key="i"
          class="link header-small__detail-link"
          :to="item[0]"
        >
          <el-icon>
            <component :is="item[2]" />
          </el-icon>
          <span>
            {{ $t(item[1]) }}
          </span>
        </router-link>
      </nav>
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
      showDetail: false,
      home: store.state.navItems.filter((item) => item[3] === 'home')[0],
      items: store.state.navItems.filter((item) => item[3] !== 'home')
    }
  }
}
</script>

<style>
.header-small {
  display: none;
}
@media (max-width: 1050px) {
  .header-small {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    /* padding: 0px 25px; */
    position: relative;
  }
  .header-small__detail {
    position: absolute;
    width: 100%;
    background-color: var(--bl-color-lighter-fill);
    top: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: 25px;
  }
  .header-small__detail > nav {
    width: calc(100% - 50px);
  }
  .header-small__link {
    display: inline-flex;
    align-items: center;
    color: var(--bl-color-primary-text);
    padding: 8px;
    font-size: 17px;
    border-radius: 8px;
    margin: 0px 10px;
  }
  .header-small__link:hover {
    color: var(--bl-moonlight-blue-5);
  }
  .header-small__link > i {
    margin-right: 5px;
  }
  .header-small__detail-button {
    user-select: none;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: var(--bl-color-primary-text);
  }
  .header-small__detail-link {
    display: flex;
    width: 100%;
    font-size: 18px;
    padding: 15px 0px;
    align-items: center;
    border-bottom: 1px solid var(--bl-color-base-border);
    color: var(--bl-color-primary-text);
  }
  .header-small__detail > nav > :first-child {
    border-bottom: 1px solid var(--bl-color-base-border);
  }
  .header-small__detail-link > i {
    margin-right: 10px;
  }
}
</style>
