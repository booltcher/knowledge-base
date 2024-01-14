import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import { UNKNOWN_VALUE } from '../constants'

dayjs.extend(utc)
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export const getRelativeTime = (date?: Date | number) => {
  if (!date) return UNKNOWN_VALUE
  return dayjs().utc().local().fromNow()
}