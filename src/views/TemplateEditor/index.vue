<template>
  <div class="flex-1 flex flex-row  w-full h-screen justify-start overflow-hidden">
    <div class="w-72 flex flex-col  h-screen justify-start items-center bg-slate-100 dark:bg-base-100">
      <div role="tablist" class="tabs tabs-boxed bg-base m-6">
        <a role="tab" class="tab " @click="navigation = 'sliders'"
          :class="{ 'tab-active': navigation === 'sliders' }">幻灯片</a>
        <a role="tab" class="tab" @click="navigation = 'elements'"
          :class="{ 'tab-active': navigation === 'elements' }">元素</a>
      </div>
      <div v-show="navigation === 'elements'" class="w-full  ">
        <div class="elements">
          <input type="radio" name="my-accordion-2" checked="checked" />
          <h4>标题</h4>
          <p>
            asdfasd
          </p>

        </div>
        <div>副标题</div>
        <!-- <div>
          <input type="radio" name="标题" checked="checked" />
          <div class="collapse-title text-xl font-medium">Click to open this one and close others</div>
          <div class="collapse-content">
            <p>hello</p>
          </div>
        </div> -->
        <!-- <div>
          <input type="radio" name="my-accordion-1" />
          <div class="collapse-title text-xl font-medium">Click to open this one and close others</div>
          <div class="collapse-content">
            <p>hello</p>
          </div>
        </div>
        <div>
          <input type="radio" name="my-accordion-1" />
          <div class="collapse-title text-xl font-medium">Click to open this one and close others</div>
          <div class="collapse-content">
            <p>hello</p>
          </div>
        </div> -->
      </div>
      <div v-show="navigation === 'sliders'" class="overflow-auto ">
        <div v-for="(slide, index) in slides" :key="slide.id" class="thumbnail-container"
          :class="{ 'selected': index === slideIndex }">
          <ThumbnailSlide class="thumbnail" :slide="slide" :size="240" @click="updateSlideIndex(index)" />
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col w-full">
      <div class="flex w-full flex-row justify-between gap-6 p-3 bg-base-100">
        <div>
          <button class="btn">生成</button>
        </div>
        <div>
          <div role="tablist" class="tabs tabs-boxed m-2">
            <a role="tab" class="tab" @click="views = 'preview'" :class="{ 'tab-active': views === 'preview' }">预览</a>
            <a role="tab" class="tab" @click="views = 'code'" :class="{ 'tab-active': views === 'code' }">代码</a>
          </div>
        </div>
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
      <div class="flex-1 w-full  bg-white dark:bg-black overflow-auto">
        <template v-if="views === 'preview'">
          <CanvasTool class=" h-20" />
          <Canvas class="center-body" />
        </template>
        <template v-if="views === 'code'">
          <Codemirror :value="code" height="100%" :autofocus="true" :indent-with-tab="true" :tab-size="2">
          </Codemirror>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useImport from '@/hooks/useImport'
import { ref, reactive, computed } from 'vue'
import FileInput from '@/components/FileInput.vue'
import { useSlidesStore } from '@/store'
import { storeToRefs } from 'pinia'
import ThumbnailSlide from '@/views/components/ThumbnailSlide/index.vue'
import Slider from '@/components/Slider.vue'
import Canvas from '@/views/Editor/Canvas/index.vue'
import CanvasTool from '@/views/Editor/CanvasTool/index.vue'
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