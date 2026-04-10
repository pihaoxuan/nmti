<script setup>
import { ref, computed, onMounted } from 'vue'
import { selectQuestions } from '../data/random'

const props = defineProps({
  seed: {
    type: Number,
    default: null
  },
  mode: {
    type: String,
    default: 'normal' // 'normal' | 'insane'
  },
  reverse: {
    type: Boolean,
    default: false
  },
  targetName: {
    type: String,
    default: ''
  },
  verifyMode: {
    type: Boolean,
    default: false
  },
  verifyFrom: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['submit', 'back'])

// 选中的题目
const selectedQuestions = ref([])
// 当前种子
const currentSeed = ref(null)

// 用户的答案
const answers = ref([])

// 是否发疯版
const isInsaneMode = computed(() => props.mode === 'insane')

// 初始化题目
onMounted(() => {
  const result = selectQuestions(props.seed, isInsaneMode.value)
  selectedQuestions.value = result.questions
  currentSeed.value = result.seed
  answers.value = new Array(result.questions.length).fill(null)
})

// 是否所有题目都已回答
const allAnswered = computed(() => {
  return answers.value.every(a => a !== null)
})

// 已回答数量
const answeredCount = computed(() => {
  return answers.value.filter(a => a !== null).length
})

// 选择选项
function selectOption(questionIndex, optionIndex) {
  answers.value[questionIndex] = optionIndex
}

// 提交
function submit() {
  if (!allAnswered.value) {
    alert('请完成所有题目')
    return
  }
  emit('submit', {
    answers: [...answers.value],
    questions: selectedQuestions.value,
    seed: currentSeed.value
  })
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <!-- 模式提示 -->
    <div
      v-if="isInsaneMode || props.reverse || props.verifyMode"
      class="mb-6 p-4 rounded-xl text-center"
      :class="isInsaneMode ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-blue-100 dark:bg-blue-900/30'"
    >
      <span
        class="font-semibold"
        :class="isInsaneMode ? 'text-purple-600 dark:text-purple-300' : 'text-blue-600 dark:text-blue-300'"
      >
        <template v-if="props.verifyMode">
          🔗 验证 {{ props.verifyFrom || '某人' }} 的猜测 · 做同一套题看看TA猜得准不准
        </template>
        <template v-else-if="props.reverse">
          🎯 反向测试 · 你觉得 {{ props.targetName || 'TA' }} 会怎么选
        </template>
        <template v-else>
          🌙 深夜发疯版 · 精神状态检测中
        </template>
      </span>
    </div>

    <!-- 进度条 -->
    <div class="mb-8 sticky top-0 bg-amber-50 dark:bg-stone-900 py-4 z-10">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-stone-600 dark:text-stone-400">
          {{ answeredCount }} / {{ selectedQuestions.length }}
        </span>
        <span class="text-sm text-stone-500">
          {{ selectedQuestions.length > 0 ? Math.round(answeredCount / selectedQuestions.length * 100) : 0 }}%
        </span>
      </div>
      <div class="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
        <div
          class="h-full transition-all duration-300"
          :class="isInsaneMode ? 'bg-purple-500' : 'bg-amber-500'"
          :style="{ width: `${selectedQuestions.length > 0 ? answeredCount / selectedQuestions.length * 100 : 0}%` }"
        ></div>
      </div>
    </div>

    <!-- 题目列表 -->
    <div class="space-y-6">
      <div
        v-for="(question, qIndex) in selectedQuestions"
        :key="question.id"
        class="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-sm"
      >
        <div class="mb-4">
          <span class="text-sm text-stone-500 dark:text-stone-400">
            第 {{ qIndex + 1 }} 题
          </span>
          <span v-if="question.dimension !== 'none'" class="ml-2 text-xs text-stone-400">
            维度已隐藏
          </span>
        </div>

        <p class="text-lg text-stone-800 dark:text-stone-200 mb-4 leading-relaxed">
          {{ question.text }}
        </p>

        <div class="space-y-2">
          <label
            v-for="(option, oIndex) in question.options"
            :key="oIndex"
            class="flex items-start p-3 rounded-lg cursor-pointer transition-all"
            :class="[
              answers[qIndex] === oIndex
                ? (isInsaneMode
                    ? 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500'
                    : 'bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-500')
                : 'bg-stone-50 dark:bg-stone-700/50 hover:bg-stone-100 dark:hover:bg-stone-700 border-2 border-transparent'
            ]"
          >
            <input
              type="radio"
              :name="`q-${qIndex}`"
              :checked="answers[qIndex] === oIndex"
              @change="selectOption(qIndex, oIndex)"
              class="mt-1 mr-3"
            />
            <span class="text-stone-700 dark:text-stone-300">
              {{ option.text }}
            </span>
          </label>
        </div>
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="mt-8 flex gap-4 justify-center">
      <button
        @click="emit('back')"
        class="px-6 py-3 bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors"
      >
        返回首页
      </button>
      <button
        @click="submit"
        :disabled="!allAnswered"
        class="px-8 py-3 font-semibold rounded-lg transition-all"
        :class="[
          allAnswered
            ? (isInsaneMode
                ? 'bg-purple-500 text-white hover:bg-purple-600'
                : 'bg-amber-500 text-white hover:bg-amber-600')
            : 'bg-stone-200 dark:bg-stone-700 text-stone-400 cursor-not-allowed'
        ]"
      >
        提交并查看结果
      </button>
    </div>

    <p v-if="!allAnswered" class="text-center mt-4 text-stone-500 text-sm">
      {{ isInsaneMode ? '全选完才会放行。发疯也要发完整的疯。' : '全选完才会放行。世界已经够乱了，起码把题做完整。' }}
    </p>

    <!-- 底部版权 -->
    <div class="text-center mt-12 mb-4 text-xs text-stone-400 dark:text-stone-500">
      <p>
        Made with 🐮 by <span class="font-semibold text-stone-500 dark:text-stone-400">PIHX</span>
        · <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" class="underline text-amber-600 dark:text-amber-400">AGPLv3</a>
      </p>
    </div>
  </div>
</template>
