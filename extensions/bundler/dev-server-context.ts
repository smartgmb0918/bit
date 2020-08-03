import { BuildContext } from '@bit/bit.core.builder';
import { Capsule } from '@bit/bit.core.isolator';
import { ExecutionContext } from '@bit/bit.core.environments';

export type Target = {
  /**
   * entries of the target.
   */
  entries: string[];

  /**
   * root path of the target
   */
  capsule: Capsule;
};

export interface BundlerContext extends BuildContext {
  targets: Target[];
}

export interface DevServerContext extends ExecutionContext {
  entry: string[];
}
