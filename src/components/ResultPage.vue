<script setup>
import { computed, ref } from 'vue'
import { calculateResult, dimensionNames, dimensionColors } from '../data/calculator'

const props = defineProps({
  answers: {
    type: Array,
    required: true
  },
  questions: {
    type: Array,
    required: true
  },
  seed: {
    type: Number,
    default: null
  },
  mode: {
    type: String,
    default: 'normal'
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

const emit = defineEmits(['restart'])

// 是否发疯版
const isInsaneMode = computed(() => props.mode === 'insane')

// 计算结果
const result = computed(() => {
  return calculateResult(props.questions, props.answers, isInsaneMode.value)
})

// 发疯指数描述
const insaneLevelDescription = computed(() => {
  if (!isInsaneMode.value) return null
  const d = result.value.percentages.D || 0
  if (d >= 80) return '精神状态：已离线'
  if (d >= 60) return '精神状态：岌岌可危'
  if (d >= 40) return '精神状态：有点发疯'
  if (d >= 20) return '精神状态：正常波动'
  return '精神状态：出奇稳定'
})

// 分享链接（带种子）
const shareLink = computed(() => {
  const baseUrl = window.location.origin + window.location.pathname
  const params = new URLSearchParams({
    seed: props.seed,
    from: props.targetName || '某人'
  })
  return `${baseUrl}?${params.toString()}`
})

// 复制链接成功提示
const linkCopied = ref(false)

// 复制分享链接
function copyShareLink() {
  navigator.clipboard.writeText(shareLink.value)
    .then(() => {
      linkCopied.value = true
      setTimeout(() => {
        linkCopied.value = false
      }, 2000)
    })
    .catch(() => {
      alert('复制失败，请手动复制链接')
    })
}

// 分享结果
function shareResult() {
  let targetDisplay = '我'
  if (props.verifyMode) {
    targetDisplay = '我'
  } else if (props.reverse && props.targetName) {
    targetDisplay = props.targetName
  }
  
  const prefix = targetDisplay === '我' ? '我是' : `在我眼里，${targetDisplay}是`
  let text = `${prefix}【${result.value.type.name}】型牛马！\n\n${result.value.type.title}`
  if (isInsaneMode.value) {
    text += `\n\n🌙 发疯版测试 · ${insaneLevelDescription.value}`
  }
  text += '\n\n测测你是哪种牛马？'

  if (navigator.share) {
    navigator.share({
      title: 'NMTI 牛马型人格测试',
      text: text,
      url: props.reverse ? shareLink.value : window.location.href
    })
  } else {
    const fullText = text + '\n' + (props.reverse ? shareLink.value : window.location.href)
    navigator.clipboard.writeText(fullText)
      .then(() => alert('结果已复制到剪贴板！'))
      .catch(() => alert('复制失败，请手动截图分享'))
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <!-- 结果卡片 -->
    <div class="bg-white dark:bg-stone-800 rounded-2xl shadow-lg overflow-hidden">
      <!-- 头部 -->
      <div
        class="p-8 text-center text-white"
        :class="isInsaneMode
          ? 'bg-gradient-to-r from-purple-500 to-pink-500'
          : props.verifyMode || props.reverse
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
            : 'bg-gradient-to-r from-amber-500 to-orange-500'"
      >
        <div class="text-6xl mb-4">{{ result.type.emoji }}</div>
        <h1 class="text-2xl font-bold mb-2">{{ result.type.code }}</h1>
        <h2 class="text-3xl font-bold">{{ result.type.name }}</h2>
        
        <p v-if="props.verifyMode" class="mt-2 text-white/80">
          🔗 验证 {{ props.verifyFrom || '某人' }} 的猜测
        </p>
        <p v-else-if="props.reverse && props.targetName" class="mt-2 text-white/80">
          🎯 在你眼里，{{ props.targetName }} 是这样的牛马
        </p>
        
        <p v-if="isInsaneMode" class="mt-3 text-purple-100">
          🌙 {{ insaneLevelDescription }}
        </p>
      </div>

      <!-- 维度得分 -->
      <div class="p-6 border-b border-stone-200 dark:border-stone-700">
        <h3 class="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-4">
          {{ props.verifyMode ? '你的' : props.reverse ? 'TA的' : '你的' }}牛马指数
        </h3>
        <div class="space-y-3">
          <div v-for="(percent, dim) in result.percentages" :key="dim" class="flex items-center">
            <span class="w-20 text-stone-600 dark:text-stone-400">{{ dimensionNames[dim] }}</span>
            <div class="flex-1 h-4 bg-stone-100 dark:bg-stone-700 rounded-full overflow-hidden mr-3">
              <div
                class="h-full rounded-full transition-all duration-500"
                :style="{
                  width: `${percent}%`,
                  backgroundColor: dimensionColors[dim]
                }"
              ></div>
            </div>
            <span class="w-12 text-right text-stone-600 dark:text-stone-400">{{ percent }}%</span>
          </div>
        </div>
      </div>

      <!-- 类型描述 -->
      <div class="p-6 border-b border-stone-200 dark:border-stone-700">
        <p class="text-stone-600 dark:text-stone-400 text-lg leading-relaxed">
          {{ result.type.description }}
        </p>
      </div>

      <!-- 典型特征 -->
      <div class="p-6 bg-stone-50 dark:bg-stone-900/50">
        <h3 class="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-4">
          这类牛马的典型特征：
        </h3>
        <ul class="space-y-2">
          <li
            v-for="(trait, index) in result.type.traits"
            :key="index"
            class="flex items-start text-stone-600 dark:text-stone-400"
          >
            <span class="mr-2">•</span>
            <span>{{ trait }}</span>
          </li>
        </ul>
      </div>

      <!-- 反向测试：分享链接 -->
      <div
        v-if="props.reverse"
        class="p-6 bg-blue-50 dark:bg-blue-900/20 border-t border-stone-200 dark:border-stone-700"
      >
        <h3 class="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-3">
          📤 邀请 {{ props.targetName || 'TA' }} 来验证
        </h3>
        <p class="text-sm text-stone-600 dark:text-stone-400 mb-3">
          把链接发给TA，让TA做同一套题，看看你猜得准不准。
        </p>
        <div class="flex gap-2">
          <input
            type="text"
            readonly
            :value="shareLink"
            class="flex-1 px-3 py-2 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 rounded-lg text-stone-700 dark:text-stone-300"
          />
          <button
            @click="copyShareLink"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="linkCopied
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white hover:bg-blue-600'"
          >
            {{ linkCopied ? '已复制' : '复制' }}
          </button>
        </div>
      </div>

      <!-- 建议 -->
      <div class="p-6 border-t border-stone-200 dark:border-stone-700">
        <p class="text-stone-500 dark:text-stone-500 italic">
          💡 {{ result.type.advice }}
        </p>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="mt-8 flex gap-4 justify-center">
      <button
        @click="emit('restart')"
        class="px-6 py-3 bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors"
      >
        重新测试
      </button>
      <button
        @click="shareResult"
        class="px-8 py-3 font-semibold rounded-lg transition-colors"
        :class="isInsaneMode
          ? 'bg-purple-500 text-white hover:bg-purple-600'
          : props.verifyMode || props.reverse
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-amber-500 text-white hover:bg-amber-600'"
      >
        分享结果
      </button>
    </div>

    <!-- 底部提示 -->
    <div class="text-center mt-8 mb-4">
      <p class="text-stone-400 dark:text-stone-500 text-sm">
        本测试纯属娱乐，请勿当真。
      </p>
      <p v-if="isInsaneMode" class="text-stone-400 dark:text-stone-500 text-xs mt-2">
        🌙 深夜发疯版 · 精神状态仅供参考
      </p>
      <p v-else-if="props.verifyMode" class="text-stone-400 dark:text-stone-500 text-xs mt-2">
        🔗 验证模式 · 同一套题，公平对比
      </p>
      <p class="text-stone-400 dark:text-stone-500 text-xs mt-4">
        Made with 🐮 by <span class="font-semibold text-stone-500 dark:text-stone-400">PIHX</span>
        · <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" class="underline text-amber-600 dark:text-amber-400">AGPLv3</a>
      </p>
    </div>
  </div>
</template>
