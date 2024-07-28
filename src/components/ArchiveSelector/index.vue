<template>
  <div>
    <h2 class="aside-h2">{{ $t('ArchiveSelector.title') }}</h2>
    <nav class="archive-selector">
      <ul>
        <li
          v-for="item, i in selectList"
          :key="i"
          :class="{'archive-selector__li--selected': item.id === selected}"
          pointer
          @click="select(item.id)"
        >
          <span>{{ $t(item.name) }}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    selectList: {
      default: () => {
        return [
          {
            name: '',
            id: 0
          }
        ]
      },
      type: Array
    },
    selected: {
      default: 0,
      type: Number
    }
  },
  methods: {
    select(id) {
      if (id !== this.selected) {
        this.$emit('select', id)
      }
    }
  }
}
</script>

<style>
.archive-selector > ul {
  padding-inline-start: 0px;
}
.archive-selector > ul > li {
  list-style: none;
  margin-bottom: 5px;
  padding-inline-start: 15px;
  border-left: 2px solid transparent;
}
.archive-selector > ul > li > span {
  display: inline-block;
  padding: 5px;
  padding-left: 0px;
  color: var(--bl-color-regular-text);
}
.archive-selector__li--selected {
  background-color: var(--bl-selected-background-color);
  border-left: 2px solid var(--bl-moonlight-blue-5) !important;
}
</style>
