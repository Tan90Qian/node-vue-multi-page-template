module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 8
  },
  extends: ['plugin:vue/essential'],
  plugins: ['vue'],
  rules: {
    'vue/no-parsing-error': [0],
    // 禁止在条件语句中出现赋值操作符
    'no-cond-assign': 'error',
    // 要求对象字面量属性名称使用引号
    'quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],
    // 强制使用一致的反勾号、双引号或单引号
    quotes: ['error', 'single', { avoidEscape: true }],
    // 禁用 eval()
    'no-eval': 'error',
    // 禁用不必要的转义 (no-useless-escape)
    'no-useless-escape': 'error',
    // 禁止在循环中出现 function 声明和表达式
    'no-loop-func': 'error',
    // 强制在 function的左括号之前使用一致的空格
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    // 强制在块之前使用一致的空格
    'space-before-blocks': 'error',
    // 要求箭头函数的参数使用圆括号
    'arrow-parens': [
      'error',
      'as-needed',
      {
        requireForBlockBody: true
      }
    ],
    // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    'no-confusing-arrow': [
      'error',
      {
        allowParens: true
      }
    ],
    // 强制隐式返回的箭头函数体的位置
    'implicit-arrow-linebreak': ['error', 'beside'],
    // 禁止重复模块导入
    'no-duplicate-imports': 'off',
    // 禁用 __iterator__ 属性
    'no-iterator': 'error',
    // 强制尽可能地使用点号
    'dot-notation': 'error',
    // 强制操作符使用一致的换行符
    'operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],
    // 禁止未使用过的变量
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
    // 不允许在 case 子句中使用词法声明
    'no-case-declarations': 'error',
    // 禁止使用嵌套的三元表达式
    'no-nested-ternary': 'error',
    // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    // 禁止混合使用不同的操作符
    'no-mixed-operators': [
      'error',
      {
        // the list of arthmetic groups disallows mixing `%` and `**`
        // with other arithmetic operators.
        groups: [
          ['%', '**'],
          ['%', '+'],
          ['%', '-'],
          ['%', '*'],
          ['%', '/'],
          ['**', '+'],
          ['**', '-'],
          ['**', '*'],
          ['**', '/'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof']
        ],
        allowSamePrecedence: false
      }
    ],
    // 强制单个语句的位置
    'nonblock-statement-body-position': ['error', 'beside', { overrides: {} }],
    // 大括号风格要求
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    // 禁止 if 语句中 return 语句之后有 else 块
    'no-else-return': ['error', { allowElseIf: false }],
    // 要求或禁止在注释前有空白 (space 或 tab)
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          exceptions: ['-', '+'],
          markers: ['=', '!'] // space here to support sprockets directives
        },
        block: {
          exceptions: ['-', '+'],
          markers: ['=', '!'], // space here to support sprockets directives
          balanced: true
        }
      }
    ],
    // 强制使用一致的缩进
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        // MemberExpression: null,
        FunctionDeclaration: {
          parameters: 1,
          body: 1
        },
        FunctionExpression: {
          parameters: 1,
          body: 1
        },
        CallExpression: {
          arguments: 1
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
        ignoredNodes: [
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild'
        ],
        ignoreComments: false
      }
    ],
    // 强制在块之前使用一致的空格
    'space-before-blocks': 'error',
    // 强制在关键字前后使用一致的空格
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
        overrides: {
          return: { after: true },
          throw: { after: true },
          case: { after: true }
        }
      }
    ],
    // 要求操作符周围有空格
    'space-infix-ops': 'error',
    // 要求或禁止文件末尾存在空行
    'eol-last': ['error', 'always'],
    // 要求方法链中每个调用都有一个换行符
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
    // 禁止属性前有空白
    'no-whitespace-before-property': 'error',
    // 要求或禁止块内填充
    'padded-blocks': ['error', { blocks: 'never', classes: 'never', switches: 'never' }],
    // 强制在圆括号内使用一致的空格
    'space-in-parens': ['error', 'never'],
    // 强制数组方括号中使用一致的空格
    'array-bracket-spacing': ['error', 'never'],
    // 强制在大括号中使用一致的空格
    'object-curly-spacing': ['error', 'always'],
    // 禁止或强制在代码块中开括号前和闭括号后有空格
    'block-spacing': ['error', 'always'],
    // 强制在逗号前后使用一致的空格
    'comma-spacing': ['error', { before: false, after: true }],
    // 强制在计算的属性的方括号中使用一致的空格
    'computed-property-spacing': ['error', 'never'],
    // 要求或禁止在函数标识符和其调用之间有空格
    'func-call-spacing': ['error', 'never'],
    // 强制在对象字面量的属性中键和值之间使用一致的间距
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    // 禁用行尾空格
    'no-trailing-spaces': [
      'error',
      {
        skipBlankLines: false,
        ignoreComments: false
      }
    ],
    // 禁止出现多行空行
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};
