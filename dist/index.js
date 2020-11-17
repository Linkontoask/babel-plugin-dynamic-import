'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k]
          },
        })
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
Object.defineProperty(exports, '__esModule', { value: true })
const t = __importStar(require('@babel/types'))
exports.default = () => ({
  visitor: {
    Program: {
      exit(path, state) {
        const { libraryName, libraryDirectory } = state.opts
        const body = path.get('body')
        body
          .filter(
            (nodePath) =>
              t.isImportDeclaration(nodePath.node) &&
              nodePath.node.source.value === state.opts.libraryName
          )
          .forEach((nodePath) => {
            console.log(nodePath.scope.hasBinding('Button'))
            // nodePath.remove()
            const pluginNode = t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier('Div'))],
              t.stringLiteral(
                libraryName + '/' + libraryDirectory + '/' + 'button'
              )
            )
            nodePath.replaceWith(pluginNode)
            console.log(nodePath.node)
          })
        console.log(state.opts)
      },
    },
  },
})
