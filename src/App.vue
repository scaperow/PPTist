<template>
  <!-- <Screen v-if="screening" />
  <Editor v-else-if="_isPC" />
  <Mobile v-else /> -->
  <!-- <TemplateEditor></TemplateEditor> -->

  <div class="flex flex-1 w-screen h-screen flex-row justify-start items-start ">
    <ul class="menu h-screen pt-6 gap-5">
      <li class=" text-xl"><router-link active-class="text-primary" :to="{ name: 'Editor' }"
          activeC>Editor</router-link>
      </li>
      <li class=" text-xl"><router-link active-class="text-primary " :to="{ name: 'Templates' }">Elements</router-link>
      </li>
      <li class=" text-xl"><router-link active-class="text-primary " :to="{ name: 'Themes' }">Themes</router-link>
      </li>
    </ul>
    <!-- <div class="navbar bg-base-100 ">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          
          </ul>
        </div>
        <a class="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><router-link :to="{ name: 'Editor' }">Editor</router-link></li>
          <li><router-link :to="{ name: 'Templates' }">Templates</router-link></li>
        </ul>
      </div>
      <div class="navbar-end">
        <a class="btn">Button</a>
      </div>
    </div> -->

    <RouterView />
  </div>
</template>



<script lang="ts" setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useScreenStore, useMainStore, useSnapshotStore } from '@/store'
import { LOCALSTORAGE_KEY_DISCARDED_DB } from '@/configs/storage'
import { deleteDiscardedDB } from '@/utils/database'
import { isPC } from './utils/common'
import TemplateEditor from './views/TemplateEditor/index.vue'

import Editor from './views/Editor/index.vue'
import Screen from './views/Screen/index.vue'
import Mobile from './views/Mobile/index.vue'

const _isPC = isPC()

const mainStore = useMainStore()
const snapshotStore = useSnapshotStore()
const { databaseId } = storeToRefs(mainStore)
const { screening } = storeToRefs(useScreenStore())

if (import.meta.env.MODE !== 'development') {
  window.onbeforeunload = () => false
}

onMounted(async () => {
  await deleteDiscardedDB()
  snapshotStore.initSnapshotDatabase()
  mainStore.setAvailableFonts()
})

// 应用注销时向 localStorage 中记录下本次 indexedDB 的数据库ID，用于之后清除数据库
window.addEventListener('unload', () => {
  const discardedDB = localStorage.getItem(LOCALSTORAGE_KEY_DISCARDED_DB)
  const discardedDBList: string[] = discardedDB ? JSON.parse(discardedDB) : []

  discardedDBList.push(databaseId.value)

  const newDiscardedDB = JSON.stringify(discardedDBList)
  localStorage.setItem(LOCALSTORAGE_KEY_DISCARDED_DB, newDiscardedDB)
})
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>