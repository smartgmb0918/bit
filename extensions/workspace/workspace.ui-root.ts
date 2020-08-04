import { UIRoot } from '@teambit/ui';
import { Component, ComponentID } from '@teambit/component';
import { Workspace } from '.';
import { PathOsBased } from 'bit-bin/utils/path';
import { GetBitMapComponentOptions } from 'bit-bin/consumer/bit-map/bit-map';
import { BundlerExtension } from '@teambit/bundler';
import { PostStartOptions } from '@teambit/ui/ui-root';

export class WorkspaceUIRoot implements UIRoot {
  constructor(
    /**
     * workspace extension.
     */
    private workspace: Workspace,

    /**
     * bundler extension
     */
    private bundler: BundlerExtension
  ) {}

  name = 'workspace';

  get path() {
    return this.workspace.path;
  }

  get extensionsPaths() {
    // TODO: @gilad please make sure to automate this for all extensions configured in the workspace.
    return [
      require.resolve('./workspace.ui'),
      require.resolve('../tester/tester.ui'),
      require.resolve('../changelog/changelog.ui'),
      require.resolve('@teambit/component/component.ui'),
      require.resolve('../compositions/compositions.ui'),
      require.resolve('../docs/docs.ui'),
      require.resolve('../notifications/notification.ui'),
    ];
  }

  // TODO: @gilad please implement with variants.
  resolvePattern(pattern: string): Promise<Component[]> {
    return this.workspace.byPattern(pattern);
  }

  /**
   * proxy to `workspace.componentDir()`
   */
  componentDir(
    componentId: ComponentID,
    bitMapOptions?: GetBitMapComponentOptions,
    options = { relative: false }
  ): PathOsBased {
    return this.workspace.componentDir(componentId, bitMapOptions, options);
  }

  async postStart(options: PostStartOptions, uiRoot: UIRoot) {
    await this.bundler.devServer(await this.workspace.byPattern(options.pattern || ''), uiRoot);
    await this.workspace.watcher.watchAll();
  }
}
