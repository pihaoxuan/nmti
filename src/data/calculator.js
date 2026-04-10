// 结果计算逻辑

import { getTypeByScores } from './types'

/**
 * 计算测试结果
 * @param {array} selectedQuestions - 本次测试使用的题目数组
 * @param {number[]} answers - 用户选择的答案数组（索引对应题目，值为选项索引）
 * @param {boolean} isInsaneMode - 是否发疯版
 * @returns {{ type: object, scores: object, percentages: object, rawScores: object }}
 */
export function calculateResult(selectedQuestions, answers, isInsaneMode = false) {
  // 初始化分数
  const scores = isInsaneMode
    ? { S: 0, L: 0, E: 0, P: 0, D: 0 }
    : { S: 0, L: 0, E: 0, P: 0 }
  const maxScores = isInsaneMode
    ? { S: 0, L: 0, E: 0, P: 0, D: 0 }
    : { S: 0, L: 0, E: 0, P: 0 }

  // 遍历所有答案，累加分数
  answers.forEach((answerIndex, questionIndex) => {
    const question = selectedQuestions[questionIndex]
    if (!question) return

    const selectedOption = question.options[answerIndex]
    if (!selectedOption) return

    // 累加用户选择的分数
    Object.entries(selectedOption.scores).forEach(([dim, score]) => {
      if (scores[dim] !== undefined) {
        scores[dim] += score
      }
    })
  })

  // 计算每个维度的理论最大分（基于本次选中的题目）
  selectedQuestions.forEach(q => {
    const dimMax = { S: 0, L: 0, E: 0, P: 0 }
    q.options.forEach(opt => {
      Object.entries(opt.scores).forEach(([dim, score]) => {
        if (score > 0 && dimMax[dim] !== undefined) {
          dimMax[dim] = Math.max(dimMax[dim], score)
        }
      })
    })
    Object.entries(dimMax).forEach(([dim, max]) => {
      if (max > 0) {
        maxScores[dim] += max
      }
    })
  })

  // 计算百分比（标准化）
  const percentages = {}
  Object.keys(scores).forEach(dim => {
    const max = maxScores[dim] || 1
    // 限制在 0-100 之间
    const rawPercent = Math.round((scores[dim] / max) * 100)
    percentages[dim] = Math.max(0, Math.min(100, rawPercent))
  })

  // 获取类型
  const type = getTypeByScores(scores)

  return {
    type,
    scores,
    percentages,
    maxScores
  }
}

/**
 * 维度名称映射
 */
export const dimensionNames = {
  S: '卷度',
  L: '忠诚度',
  E: '能量',
  P: '痛苦值',
  D: '发疯指数'
}

/**
 * 维度颜色映射
 */
export const dimensionColors = {
  S: '#ef4444', // 红色
  L: '#f59e0b', // 橙色
  E: '#10b981', // 绿色
  P: '#8b5cf6', // 紫色
  D: '#ec4899'  // 粉色
}

/**
 * 维度描述
 */
export const dimensionDescriptions = {
  S: '你对工作的卷入程度，burning desire to work or just dying inside',
  L: '你对领导/公司的忠诚程度，跪舔还是躺平',
  E: '你在职场中的社交能量，社牛还是社恐',
  P: '你的精神痛苦程度，伤得多深'
}
