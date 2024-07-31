<template>
  <div class="flex-1 flex flex-col w-full h-screen overflow-x-auto">
    <div class="flex flex-row justify-between gap-6 p-3 bg-base-100">
      <div>
        <div role="tablist" class="tabs tabs-boxed m-2">
          <a role="tab" class="tab" @click="views = 'preview'" :class="{ 'tab-active': views === 'preview' }">预览</a>
          <a role="tab" class="tab" @click="views = 'code'" :class="{ 'tab-active': views === 'code' }">代码</a>
        </div>
      </div>
      <button class="btn btn-primary">生成</button>
      <div class="flex flex-row gap-2">
        <button class="btn btn-ghost" @click="setSlides([])">清除</button>
        <div>
          <span v-if="exporting" class="loading loading-spinner loading-xs"></span>
          <FileInput v-else class="btn btn-ghost text-sm font-bold"
            accept="application/vnd.openxmlformats-officedocument.presentationml.presentation" @change="files => {
              importPPTXFile(files)
            }">导入
          </FileInput>
        </div>
        <button class="btn btn-primary">保存</button>
      </div>
    </div>
    <div class="flex-1  bg-white dark:bg-black overflow-auto">
      <template v-if="views === 'preview'">
        <!-- <CanvasTool class=" h-20" /> -->
        <Canvas class="center-body" />
      </template>
      <template v-if="views === 'code'">
        <Codemirror :value="code" height="100%" :autofocus="true" :indent-with-tab="true" :tab-size="2">
        </Codemirror>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import hljs from 'highlight.js';
import useImport from '@/hooks/useImport'
import { ref, reactive, computed } from 'vue'
import FileInput from '@/components/FileInput.vue'
import { useSlidesStore } from '@/store'
import { storeToRefs } from 'pinia'
import ThumbnailSlide from '@/views/components/ThumbnailSlide/index.vue'
import Slider from '@/components/Slider.vue'
import CanvasTool from '@/views/Editor/CanvasTool/index.vue'
import Canvas from '@/views/Editor/Canvas/index.vue'
import Codemirror from 'codemirror-editor-vue3'

const navigation = ref('sliders')
const views = ref('preview')
const { importPPTXFile, exporting } = useImport()
const slideStore = useSlidesStore()
const { updateSlideIndex, setSlides } = slideStore
const { slides, currentSlide, slideIndex } = storeToRefs(slideStore)
const code = computed(() => JSON.stringify(currentSlide.value.elements))
</script>

<style scoped lang="scss">
.thumbnail-container {
  @apply cursor-pointer border-solid border-4 p-1 rounded-xl border-transparent;

  &.selected {
    @apply border-primary;
  }

  .thumbnail {
    @apply rounded grow-0 shrink-0
  }
}



.elements {
  @apply collapse collapse-plus collapse-arrow;

  h4 {
    @apply collapse-title text-sm font-medium;
  }

  p {
    @apply collapse-content;
  }
}
</style>