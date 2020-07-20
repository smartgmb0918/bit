import { transpileSync, TranspileOptions } from '@stencil/core/compiler';
import { Compiler } from '@bit/bit.core.compiler';
import { BuildContext, BuildResults } from '@bit/bit.core.builder';
import { TranspileOutput, TranspileOpts } from '@bit/bit.core.compiler/types';

export class StencilCompiler implements Compiler {
  constructor(private transpileOpts: TranspileOptions) {}

  transpileFile(fileContent: string, options: TranspileOpts): TranspileOutput {
    const output = transpileSync(fileContent, this.transpileOpts);
    const path = options.filePath.split('.');
    path[path.length - 1] = 'js';

    return [
      {
        outputText: output.code,
        outputPath: path.join('.'),
      },
    ];
  }

  // TODO: remove this once use context
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build(context: BuildContext): Promise<BuildResults> {
    throw new Error('Method not implemented.');
  }
}
