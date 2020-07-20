import { ExecutionContext } from '@bit/bit.core.environments';

export interface DevServerContext extends ExecutionContext {
  entry: string[];
}
