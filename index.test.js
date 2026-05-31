import {test, expect} from 'vitest'
import config from './index.js'
import plugin from './plugin.js'


test('exports a non-empty flat config array', () => {
    expect(Array.isArray(config)).toBe(true)
    expect(config.length).toBeGreaterThan(0)
})


test('registers the perky plugin with the custom rules', () => {
    const main = config.find(entry => entry.plugins && entry.plugins.perky)
    expect(main).toBeTruthy()
    expect(main.plugins.perky).toBe(plugin)
    expect(main.rules['perky/nested-complexity']).toEqual([2, 4])
    expect(main.rules['perky/class-methods-use-this']).toBe(2)
})
