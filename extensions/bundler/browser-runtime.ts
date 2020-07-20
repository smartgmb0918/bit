import { ExecutionContext } from '@bit/bit.core.environments';

export type BrowserRuntime = {
  entry: (context: ExecutionContext) => Promise<string[]>;
};
