<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { isInsaneHoursAvailable, getInsaneButtonState, getNextInsaneTimeDescription } from '../utils/time'

const emit = defineEmits(['start'])

// 发疯版是否可用
const insaneAvailable = ref(false)
const insaneHint = ref('')

// 反向测试模态框
const showReverseModal = ref(false)
const targetName = ref('')
const reverseMode = ref('normal') // 'normal' | 'insane'

// 更新状态
function updateInsaneState() {
  const state = getInsaneButtonState()
  insaneAvailable.value = state.enabled
  insaneHint.value = state.hint
}

// 定时器
let timer = null

onMounted(() => {
  updateInsaneState()
  // 每分钟检查一次
  timer = setInterval(updateInsaneState, 60000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

// 开始正常版
function startNormal() {
  emit('start', { mode: 'normal' })
}

// 开始发疯版
function startInsane() {
  if (!insaneAvailable.value) {
    alert('发疯版仅 23:00 - 03:00 可用\n\n' + getNextInsaneTimeDescription())
    return
  }
  emit('start', { mode: 'insane' })
}

// 打开反向测试模态框
function openReverseModal(mode) {
  reverseMode.value = mode
  targetName.value = ''
  showReverseModal.value = true
}

// 确认反向测试
function confirmReverse() {
  if (!targetName.value.trim()) {
    alert('请输入对方的昵称')
    return
  }
  emit('start', {
    mode: reverseMode.value,
    reverse: true,
    targetName: targetName.value.trim()
  })
  showReverseModal.value = false
}

// 开始反向测试（发疯版）
function startReverseInsane() {
  if (!insaneAvailable.value) {
    alert('发疯版仅 23:00 - 03:00 可用\n\n' + getNextInsaneTimeDescription())
    return
  }
  openReverseModal('insane')
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 py-8">
    <!-- 主标题 -->
    <div class="text-center mb-6 sm:mb-8">
      <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold text-stone-800 dark:text-stone-100 mb-3 sm:mb-4">
        NMTI
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl text-stone-600 dark:text-stone-400 mb-2">
        牛马型人格测试
      </p>
      <p class="text-base sm:text-lg text-stone-500 dark:text-stone-500 px-2">
        MBTI 教你成为独特的个体，NMTI 告诉你我们都是同样的牛马。
      </p>
    </div>

    <!-- 牛马图标 -->
    <div class="text-6xl sm:text-8xl mb-6 sm:mb-8">
      🐮
    </div>

    <!-- 主按钮区 -->
    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <button
        @click="startNormal"
        class="w-full sm:w-auto px-8 py-3 sm:py-4 bg-amber-500 hover:bg-amber-600 text-white text-lg sm:text-xl font-semibold rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
      >
        开始测试
      </button>

      <!-- 发疯版按钮 -->
      <button
        @click="startInsane"
        :disabled="!insaneAvailable"
        :class="[
          'w-full sm:w-auto px-8 py-3 sm:py-4 text-lg sm:text-xl font-semibold rounded-xl shadow-lg transition-all duration-200',
          insaneAvailable
            ? 'bg-purple-500 hover:bg-purple-600 text-white hover:scale-105 active:scale-95'
            : 'bg-stone-300 dark:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-not-allowed'
        ]"
      >
        🌙 发疯版
      </button>
    </div>

    <!-- 发疯版提示 -->
    <p class="mt-2 sm:mt-3 text-sm text-stone-500 dark:text-stone-400">
      {{ insaneHint }}
    </p>

    <!-- 分隔线 -->
    <div class="mt-6 sm:mt-8 flex items-center gap-4 text-stone-400">
      <div class="h-px bg-stone-300 dark:bg-stone-700 w-12 sm:w-16"></div>
      <span class="text-sm">或者</span>
      <div class="h-px bg-stone-300 dark:bg-stone-700 w-12 sm:w-16"></div>
    </div>

    <!-- 反向测试按钮 -->
    <div class="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3">
      <button
        @click="openReverseModal('normal')"
        class="w-full sm:w-auto px-6 py-3 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-medium rounded-lg transition-all duration-200"
      >
        🎯 测测别人
      </button>

      <button
        @click="startReverseInsane"
        :disabled="!insaneAvailable"
        :class="[
          'w-full sm:w-auto px-6 py-3 font-medium rounded-lg transition-all duration-200',
          insaneAvailable
            ? 'bg-purple-100 dark:bg-purple-900/50 hover:bg-purple-200 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300'
            : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-500 cursor-not-allowed'
        ]"
      >
        🌙 测测别人（发疯版）
      </button>
    </div>

    <!-- 反向测试模态框 -->
    <div
      v-if="showReverseModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      @click.self="showReverseModal = false"
    >
      <div class="bg-white dark:bg-stone-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h3 class="text-xl font-bold text-stone-800 dark:text-stone-100 mb-4">
          🎯 测测别人
        </h3>
        <p class="text-stone-600 dark:text-stone-400 mb-4">
          你觉得TA是什么牛马？填入TA的昵称，然后回答"你觉得TA会怎么选"。
        </p>
        <input
          v-model="targetName"
          type="text"
          placeholder="输入TA的昵称"
          class="w-full px-4 py-3 border-2 border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:border-amber-500 focus:outline-none transition-colors"
          @keyup.enter="confirmReverse"
        />
        <div class="mt-6 flex gap-3">
          <button
            @click="showReverseModal = false"
            class="flex-1 px-4 py-3 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-300 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            @click="confirmReverse"
            class="flex-1 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors font-medium"
          >
            开始测试
          </button>
        </div>
      </div>
    </div>

    <!-- 底部信息 -->
    <div class="mt-10 sm:mt-16 text-center text-stone-500 dark:text-stone-500 text-sm px-4">
      <p>共 25 道题，约需 3 分钟</p>
      <p class="mt-1 sm:mt-2">
        纯娱乐，别当真
      </p>
    </div>

    <!-- 版权与开源协议 -->
    <div class="mt-8 sm:mt-12 pb-4 text-center text-stone-400 dark:text-stone-600 text-xs px-4">
      <p>
        Made with 🐮 by <span class="font-semibold text-stone-500 dark:text-stone-500">PIHX</span>
      </p>
      <p class="mt-1">
        Released under <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" class="underline text-amber-600 dark:text-amber-400">AGPLv3</a>
        · Inspired by <a href="https://sbti.unun.dev" target="_blank" class="underline">SBTI</a>
      </p>
    </div>
  </div>
</template>
