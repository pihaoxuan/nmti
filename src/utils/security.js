/**
 * 前端安全防护工具
 */

/**
 * 禁用右键菜单
 */
export function disableRightClick() {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    return false
  })
}

/**
 * 禁用常用快捷键（F12、Ctrl+Shift+I、Ctrl+U等）
 */
export function disableDevShortcuts() {
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') {
      e.preventDefault()
      return false
    }

    // Ctrl+Shift+I (开发者工具)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault()
      return false
    }

    // Ctrl+Shift+J (控制台)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
      e.preventDefault()
      return false
    }

    // Ctrl+U (查看源码)
    if (e.ctrlKey && e.key === 'U') {
      e.preventDefault()
      return false
    }
  })
}

/**
 * 检测开发者工具是否打开（简单检测）
 */
export function detectDevTools() {
  const threshold = 160

  setInterval(() => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold
    const heightThreshold = window.outerHeight - window.innerHeight > threshold

    if (widthThreshold || heightThreshold) {
      console.clear()
      console.log('%c别扒拉了，没啥好看的 🐮', 'font-size: 24px; color: #f59e0b;')
    }
  }, 1000)
}

/**
 * 初始化所有安全防护
 */
export function initSecurity() {
  disableRightClick()
  disableDevShortcuts()
  detectDevTools()

  // 控制台提示
  console.log('%c🐮 NMTI 牛马型人格测试', 'font-size: 24px; font-weight: bold; color: #f59e0b;')
  console.log('%cMade with 🐮 by PIHX', 'font-size: 14px; color: #888;')
  console.log('%cAGPLv3 License - https://www.gnu.org/licenses/agpl-3.0.html', 'font-size: 12px; color: #888;')
}

/**
 * 简单的 Base64 编码（用于题目数据轻量加密）
 */
export function encode(data) {
  return btoa(encodeURIComponent(JSON.stringify(data)))
}

/**
 * 简单的 Base64 解码
 */
export function decode(encoded) {
  return JSON.parse(decodeURIComponent(atob(encoded)))
}
