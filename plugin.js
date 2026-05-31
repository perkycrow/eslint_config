import nestedComplexity from './rules/nested_complexity.js'
import classMethodsUseThis from './rules/class_methods_use_this.js'


export default {
    meta: {name: '@perkycrow/eslint_config'},
    rules: {
        'nested-complexity': nestedComplexity,
        'class-methods-use-this': classMethodsUseThis
    }
}
