<script setup>
import { ref, onMounted } from 'vue'
import HomePage from './components/HomePage.vue'
import TestPage from './components/TestPage.vue'
import ResultPage from './components/ResultPage.vue'

// 应用状态
const currentPage = ref('home') // 'home' | 'test' | 'result'
const testMode = ref('normal') // 'normal' | 'insane'
const isReverse = ref(false) // 是否反向测试（用于显示结果时区分）
const targetName = ref('') // 目标人物昵称
const answers = ref([]) // 用户的答案
const selectedQuestions = ref([]) // 本次测试的题目
const testSeed = ref(null) // 测试种子
const isVerifyMode = ref(false) // 是否是验证模式（通过分享链接进入）
const verifyFrom = ref('') // 验证谁的猜测
// 解析URL 参数
function parseUrlParams() {
  const params = new URLSearchParams(window.location.search)
  const seed = params.get('seed')
  const from = params.get('from')

  if (seed) {
    // 有 seed 参数，说明是通过分享链接进入的
    testSeed.value = parseInt(seed, 10)
    verifyFrom.value = from || '某人'
    isVerifyMode.value = true
    currentPage.value = 'test'

    // 清理 URL，避免刷新重复进入
    window.history.replaceState({}, '', window.location.pathname)
  }
}

// 页面加载时解析 URL
onMounted(() => {
  parseUrlParams()
})

// 开始测试
function startTest(data) {
  testMode.value = data?.mode || 'normal'
  isReverse.value = data?.reverse || false
  targetName.value = data?.targetName || ''
  currentPage.value = 'test'
  answers.value = []
  selectedQuestions.value = []
  // 如果是验证模式，保留已有的 seed
  if (!isVerifyMode.value) {
    testSeed.value = null
  }
}

// 提交答案
function submitAnswers(data) {
  answers.value = data.answers
  selectedQuestions.value = data.questions
  testSeed.value = data.seed
  currentPage.value = 'result'}

// 重新测试
function restart() {
  currentPage.value = 'home'
  testMode.value = 'normal'
  isReverse.value = false
  isVerifyMode.value = false
  targetName.value = ''
  verifyFrom.value = ''
  answers.value = []
  selectedQuestions.value = []
  testSeed.value = null
}
</script>

<template>
  <div class="min-h-screen bg-amber-50 dark:bg-stone-900">
    <!-- 首页 -->
    <HomePage
      v-if="currentPage === 'home'"
      @start="startTest"
    />

    <!-- 测试页 -->
    <TestPage
      v-else-if="currentPage === 'test'"
      :mode="testMode"
      :reverse="isReverse"
      :target-name="targetName"
      :seed="testSeed"
      :verify-mode="isVerifyMode"
      :verify-from="verifyFrom"
      @submit="submitAnswers"
      @back="currentPage = 'home'"
    />

    <!-- 结果页 -->
    <ResultPage
      v-else-if="currentPage === 'result'"
      :answers="answers"
      :questions="selectedQuestions"
      :seed="testSeed"
      :mode="testMode"
      :reverse="isReverse"
      :target-name="targetName"
      :verify-mode="isVerifyMode"
      :verify-from="verifyFrom"
      @restart="restart"
    />
  </div>
</template>
