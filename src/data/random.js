// 分层随机抽题逻辑

import { questions } from './questions'
import { insaneQuestions } from './questions-insane'

/**
 * 带种子的伪随机数生成器 (Mulberry32)
 * @param {number} seed - 种子值
 * @returns {function} - 返回 0-1 之间的随机数函数
 */
function mulberry32(seed) {
  return function() {
    let t = seed += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

/**
 * Fisher-Yates 洗牌算法（带种子）
 * @param {array} array - 要洗牌的数组
 * @param {function} random - 随机数函数
 * @returns {array} - 洗牌后的新数组
 */
function shuffleWithSeed(array, random) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * 分层随机抽题
 * @param {number|null} seed - 种子值（null 则使用随机种子）
 * @param {boolean} isInsaneMode - 是否发疯版
 * @returns {{ questions: array, seed: number }}
 */
export function selectQuestions(seed = null, isInsaneMode = false) {
  // 如果没有提供种子，生成一个随机种子
  const actualSeed = seed ?? Math.floor(Math.random() * 1000000)
  const random = mulberry32(actualSeed)

  // 选择题库
  const questionPool = isInsaneMode ? insaneQuestions : questions

  // 按维度分组
  const byDimension = {
    S: [],  // 卷度
    L: [],  // 忠诚度
    E: [],  // 能量
    P: [],  // 痛苦值
    none: [] // 娱乐题
  }

  questionPool.forEach(q => {
    if (byDimension[q.dimension]) {
      byDimension[q.dimension].push(q)
    }
  })

  // 每个维度抽取数量（发疯版只有25题）
  const counts = isInsaneMode
    ? { S: 6, L: 6, E: 6, P: 6, none: 1 }
    : { S: 6, L: 6, E: 6, P: 6, none: 1 }

  const selected = []

  // 从每个维度随机抽取
  Object.entries(counts).forEach(([dim, count]) => {
    const pool = byDimension[dim]
    if (pool.length <= count) {
      // 题库不够，全部加入
      selected.push(...pool)
    } else {
      // 随机抽取
      const shuffled = shuffleWithSeed(pool, random)
      selected.push(...shuffled.slice(0, count))
    }
  })

  // 打乱最终顺序
  const finalQuestions = shuffleWithSeed(selected, random)

  return {
    questions: finalQuestions,
    seed: actualSeed
  }
}

/**
 * 从种子恢复题目
 * @param {number} seed - 种子值
 * @param {boolean} isInsaneMode - 是否发疯版
 * @returns {array} - 题目数组
 */
export function getQuestionsBySeed(seed, isInsaneMode = false) {
  const result = selectQuestions(seed, isInsaneMode)
  return result.questions
}

/**
 * 创建题目ID到索引的映射
 * @param {array} selectedQuestions - 选中的题目
 * @returns {object} - { questionId: index }
 */
export function createQuestionIndexMap(selectedQuestions) {
  const map = {}
  selectedQuestions.forEach((q, index) => {
    map[q.id] = index
  })
  return map
}
