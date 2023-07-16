export function formatTimeStamp(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const month = addZero(date.getMonth() + 1)
  const day = addZero(date.getDate())
  const hour = parseInt(addZero(date.getHours()))
  const minute = addZero(date.getMinutes())
  const meridiem = hour >= 12 ? '下午' : '上午'
  const hour12 = hour % 12 === 0 ? 12 : hour % 12
  return `${year}年${month}月${day}日 ${meridiem} ${hour12}:${minute}分`
}
function addZero(num: number): string {
  return num < 10 ? `0${num}` : JSON.stringify(num)
}

export function formatTime(timestamp: number): string {
  const now = Date.now() / 1000
  const diff = now - timestamp

  // 计算时间差的单位和数量
  const units: { [unit: string]: number } = {
    年前: 60 * 60 * 24 * 365,
    月前: 60 * 60 * 24 * 30,
    天前: 60 * 60 * 24,
    小时前: 60 * 60,
    分钟前: 60,
  }

  for (const unit in units) {
    if (diff > units[unit]) {
      const count = Math.floor(diff / units[unit])
      return `${count}${unit}`
    }
  }

  return '刚刚'
}
