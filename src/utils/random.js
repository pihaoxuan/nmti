/**
 * 种子随机数生成器
 * 相同种子产生相同的随机序列
 */
export function seededRandom(seed) {
  // 简单的种子哈希
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }

  // 伪随机生成器
  let current = Math.abs(hash)
  return () => {
    current = (current * 9301 + 49297) % 233280
    return current / 233280
  }
}

/**
 * 使用种子随机抽取数组元素
 * @param {Array} array 源数组
 * @param {number} count 抽取数量
 * @param {string} seed 种子（可选）
 */
export function pickRandom(array, count, seed = null) {
  const random = seed ? seededRandom(seed) : Math.random

  const copy = [...array]
  const result = []

  for (let i = 0; i < count && copy.length > 0; i++) {
    const index = Math.floor(random() * copy.length)
    result.push(copy.splice(index, 1)[0])
  }

  return result
}

/**
 * 打乱数组顺序
 * @param {Array} array 源数组
 * @param {string} seed 种子（可选）
 */
export function shuffle(array, seed = null) {
  const random = seed ? seededRandom(seed) : Math.random
  const copy = [...array]

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy
}

/**
 * 生成随机种子
 */
export function generateSeed() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
}
