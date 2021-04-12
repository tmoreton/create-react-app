import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'
import mapKeys from 'lodash/mapKeys'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'

export default function mapKeysDeep(obj, fn) {
  return isArray(obj)
    ? map(obj, innerObj => mapKeysDeep(innerObj, fn))
    : isPlainObject(obj)
      ? mapValues(mapKeys(obj, fn), value => mapKeysDeep(value, fn))
      : obj
}
