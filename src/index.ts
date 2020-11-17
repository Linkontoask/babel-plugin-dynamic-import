import { NodePath } from '@babel/traverse'
import * as t from '@babel/types'

export interface Opts {
  libraryName: string
  libraryDirectory: string
}

export type State = {
  get: (name: string) => any
  set: (name: string, value: any) => any
  opts: Opts
}

export default () => ({
  visitor: {
    Program: {
      exit(path: NodePath<t.Program>, state: State) {
        const { libraryName, libraryDirectory } = state.opts
        const body = path.get('body')
        body
          .filter(
            (nodePath) =>
              t.isImportDeclaration(nodePath.node) &&
              nodePath.node.source.value === state.opts.libraryName
          )
          .forEach((nodePath) => {
            const pluginNode = t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier('Icon'))],
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
