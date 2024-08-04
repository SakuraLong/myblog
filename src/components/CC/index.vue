<template>
  <div class="cc">
    <div>
      <div>
        <span
          class="font"
          w-b
        >{{ $t('CC.author') }}: </span>
        <span>{{ post.author }}</span>
      </div>
      <div>
        <span
          class="font"
          w-b
        >{{ $t('CC.link') }}: </span>
        <span><a
          class="link"
          :href="BASE_URL + post.to"
          target="_blank"
        >{{ BASE_URL + post.to }}</a></span>
      </div>
      <div>
        <span
          class="font"
          w-b
        >{{ $t('CC.copyrightNotice') }}: </span>
        <span>{{ $t('CC.detailPre') }}<a
          ref="noopener noreferrer nofollow"
          class="link"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
        >CC BY-NC-SA 4.0</a>{{ $t('CC.detailSuf') }}</span>
      </div>
      <img
        src="./cc.svg"
        alt="CC BY-NC-SA"
        decoding="async"
        draggable="false"
        no-select
      >
    </div>
  </div>
</template>

<script>
import BlogManager from '@/assets/js/BlogManager'
export default {
  props: {
    post: {
      default: () => {
        return {
          to: ''
        }
      },
      type: Object
    }
  },
  data() {
    return {
      BASE_URL: BlogManager.data.blog.baseUrl
    }
  }
}
</script>

<style>
.cc {
  padding: 10px 45px;
}
@media (max-width: 767px) {
  .cc {
    padding: 10px 15px;
  }
}
.cc > div {
  padding: 10px;
  background-color: var(--bl-color-base-fill);
  overflow: hidden;
  position: relative;
}
.cc > div > div {
  position: relative;
  margin-bottom: 10px;
  z-index: 10;
}
.cc > div > div:last-of-type {
  margin-bottom: 0px !important;
}
.cc > div > div > span:first-child {
  color: var(--bl-color-primary-text);
}
.cc > div > div > span:last-child {
  color: var(--bl-color-regular-text);
}
.cc a {
  color: var(--bl-moonlight-blue-5) !important;
}
.cc img {
  position: absolute;
  height: calc(150%);
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 1;
}
</style>
