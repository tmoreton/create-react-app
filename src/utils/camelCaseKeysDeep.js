import camelCase from 'lodash/camelCase'
import mapKeysDeep from './mapKeysDeep'

export default function camelCaseKeysDeep(obj) {
  return mapKeysDeep(obj, (value, key) => camelCase(key))
}
