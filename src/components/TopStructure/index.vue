<template>
  <div
    class="top-structure-outer flex padding"
    f-jc-c
    padding0="tb"
  >
    <div class="top-structure flex gap width-100">
      <aside>
        <slot name="aside" />
      </aside>
      <main>
        <slot name="main" />
      </main>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.top-structure-outer {
  width: calc(100% - 2rem);
}
.top-structure {
  max-width: 1200px;
}
.top-structure > aside {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 300px;
  padding-top: 70px;
}
.top-structure > main {
  width: calc(100% - 300px);
  padding-top: 70px;
}
@media (max-width: 900px) {
  .top-structure > aside {
    display: none !important;
  }
  .top-structure > main {
    width: 100% !important;
  }
}
</style>
