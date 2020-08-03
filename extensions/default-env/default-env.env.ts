import { Environment } from '@bit/bit.core.environments';
import { BuildTask } from '@bit/bit.core.builder';
import { PkgExtension } from '@bit/bit.core.pkg';

/**
 * default environment for components that don't belong to any other environment
 */
export class DefaultEnv implements Environment {
  constructor(
    /**
     * pkg extension.
     */
    private pkg: PkgExtension
  ) {}
  /**
   * returns the component build pipeline.
   */
  getPipe(): BuildTask[] {
    return [this.pkg.dryRunTask];
  }
}
