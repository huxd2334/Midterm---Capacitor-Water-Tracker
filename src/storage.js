import { Preferences } from "@capacitor/preferences";

const TOTAL_KEY = 'water_total_YYYYMMDD'
const HISTORY_KEY = 'water_history_YYYYMMDD'

function dayKeySuffix(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}${m}${d}`
}

export async function getTotal() {
  const key = TOTAL_KEY.replace('YYYYMMDD', dayKeySuffix())
  const r = await Preferences.get({ key })
  return r.value ? Number(r.value) : 0
}

export async function setTotal(total) {
  const key = TOTAL_KEY.replace('YYYYMMDD', dayKeySuffix())
  await Preferences.set({ key, value: String(total) })
}

export async function getHistory() {
  const key = HISTORY_KEY.replace('YYYYMMDD', dayKeySuffix())
  const r = await Preferences.get({ key })
  return r.value ? JSON.parse(r.value) : []
}

export async function pushHistory(entry) {
  const key = HISTORY_KEY.replace('YYYYMMDD', dayKeySuffix())
  const list = await getHistory()
  list.unshift(entry)
  await Preferences.set({ key, value: JSON.stringify(list) })
}

export async function clearToday() {
  const t = dayKeySuffix()
  await Preferences.remove({ key: TOTAL_KEY.replace('YYYYMMDD', t) })
  await Preferences.remove({ key: HISTORY_KEY.replace('YYYYMMDD', t) })
}