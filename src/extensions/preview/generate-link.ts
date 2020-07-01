// :TODO refactor to building an AST and generate source code based on it.
export function generateLink(prefix: string, componentMap: any, defaultModule?: string): string {
  return `
import { linkModules } from './preview.preview';
import harmony from '@teambit/harmony';
${defaultModule ? `const defaultModule = require('${defaultModule}'` : ''});

linkModules('${prefix}', defaultModule, {
  ${Array.from(componentMap.entries())
    .map(([component, modulePaths]: any) => {
      return `'${component.id.toString()}': [${modulePaths.map(path => `require('${path}')`).join(', ')}]`;
    })
    .join(',\n')}
});  
`;
}
