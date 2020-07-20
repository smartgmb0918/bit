import { EnvService, ExecutionContext } from '@bit/bit.core.environments';

export class DocsService implements EnvService {
  async run(context: ExecutionContext) {
    return context.env.getDocsTemplate();
  }
}
