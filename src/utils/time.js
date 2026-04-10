// 时间检测工具（发疯版时间控制）

/**
 * 检测是否是发疯时段（23:00 - 03:00）
 * @returns {boolean}
 */
export function isInsaneHoursAvailable() {
  const hour = new Date().getHours()
  // 23:00 - 02:59
  return hour >= 23 || hour < 3
}

/**
 * 获取当前时段类型
 * @returns {'insane' | 'normal'}
 */
export function getCurrentTimeMode() {
  return isInsaneHoursAvailable() ? 'insane' : 'normal'
}

/**
 * 获取发疯版按钮状态提示
 * @returns {{ enabled: boolean, hint: string }}
 */
export function getInsaneButtonState() {
  if (isInsaneHoursAvailable()) {
    return { enabled: true, hint: '🌙 发疯版可用' }
  } else {
    return { enabled: false, hint: '🔒 仅 23:00 - 03:00 可用' }
  }
}

/**
 * 获取距离下一个发疯时段的描述
 * @returns {string}
 */
export function getNextInsaneTimeDescription() {
  if (isInsaneHoursAvailable()) {
    return '发疯版正在开放中'
  }

  const now = new Date()
  const hour = now.getHours()

  let hoursUntilInsane
  if (hour < 23) {
    hoursUntilInsane = 23 - hour
  } else {
    // hour >= 3 && hour < 23 的情况
    hoursUntilInsane = 23 + (24 - hour)
  }

  if (hoursUntilInsane === 1) {
    return '距离发疯还有 1 小时'
  }
  return `距离发疯还有 ${hoursUntilInsane} 小时`
}

/**
 * 获取当前时间描述（用于 UI 展示）
 * @returns {string}
 */
export function getCurrentTimeDescription() {
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`

  if (hour >= 23 || hour < 3) {
    return `深夜 ${timeStr} · 发疯中`
  } else if (hour >= 3 && hour < 6) {
    return `凌晨 ${timeStr} · 该睡了`
  } else if (hour >= 6 && hour < 9) {
    return `早晨 ${timeStr} · 该上班了`
  } else if (hour >= 9 && hour < 12) {
    return `上午 ${timeStr} · 搬砖中`
  } else if (hour >= 12 && hour < 14) {
    return `中午 ${timeStr} · 吃饭没`
  } else if (hour >= 14 && hour < 18) {
    return `下午 ${timeStr} · 还没下班`
  } else if (hour >= 18 && hour < 21) {
    return `傍晚 ${timeStr} · 终于下班`
  } else {
    return `晚上 ${timeStr} · 还没发疯`
  }
}
