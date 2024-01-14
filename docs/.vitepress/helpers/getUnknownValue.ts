import { UNKNOWN_VALUE } from "../constants"

export const getUnknownValue = (value?: string) => {
  return value ?? UNKNOWN_VALUE
} 