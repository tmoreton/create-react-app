import snakeCase from 'lodash/snakeCase'
import mapKeysDeep from './mapKeysDeep'

export default function snakeCaseKeysDeep(obj) {
  return mapKeysDeep(obj, (value, key) => snakeCase(key))
}
