import { Harmony, SlotRegistry } from '@teambit/harmony';
import { ScopeExtension } from '@bit/bit.core.scope';
import Workspace from './workspace';
import { ComponentExtension } from '@bit/bit.core.component';
import { loadConsumerIfExist } from 'bit-bin/consumer';
import { IsolatorExtension } from '@bit/bit.core.isolator';
import { Logger } from '@bit/bit.core.logger';
import ConsumerComponent from 'bit-bin/consumer/component';
import { DependencyResolverExtension } from '@bit/bit.core.dependency-resolver';
import { Variants } from '@bit/bit.core.variants';
import { WorkspaceExtConfig } from './types';
import { GraphQLExtension } from '@bit/bit.core.graphql';
import getWorkspaceSchema from './workspace.graphql';
import InstallCmd from './install.cmd';
import { CLIExtension } from '@bit/bit.core.cli';
import EjectConfCmd from './eject-conf.cmd';
import { UIExtension } from '@bit/bit.core.ui';
import { WorkspaceUIRoot } from './workspace.ui-root';
import { BundlerExtension } from '@bit/bit.core.bundler';
import { CapsuleListCmd } from './capsule-list.cmd';
import { CapsuleCreateCmd } from './capsule-create.cmd';
import { OnComponentLoad } from './on-component-load';

export type WorkspaceDeps = [
  CLIExtension,
  ScopeExtension,
  ComponentExtension,
  IsolatorExtension,
  DependencyResolverExtension,
  Variants,
  Logger,
  GraphQLExtension,
  UIExtension,
  BundlerExtension
];

export type OnComponentLoadSlot = SlotRegistry<OnComponentLoad>;

export type WorkspaceCoreConfig = {
  /**
   * sets the default location of components.
   */
  componentsDefaultDirectory: string;

  /**
   * default scope for components to be exported to. absolute require paths for components
   * will be generated accordingly.
   */
  defaultScope: string;

  defaultOwner: string;
};

export default async function provideWorkspace(
  [cli, scope, component, isolator, dependencyResolver, variants, logger, graphql, ui, bundler]: WorkspaceDeps,
  config: WorkspaceExtConfig,
  [onComponentLoadSlot]: [OnComponentLoadSlot],
  harmony: Harmony
) {
  // don't use loadConsumer() here because the consumer might not be available.
  // also, this loadConsumerIfExist() is wrapped with try/catch in order not to break when the
  // consumer can't be loaded due to .bitmap or bit.json issues which are fixed on a later phase
  // open bit init --reset.
  // keep in mind that here is the first place where the consumer is loaded.
  // an unresolved issue here is when running tasks, such as "bit run build" outside of a consumer.
  // we'll have to fix this asap.
  try {
    const consumer = await loadConsumerIfExist();

    if (consumer) {
      const workspace = new Workspace(
        config,
        consumer,
        scope,
        component,
        isolator,
        dependencyResolver,
        variants,
        logger.createLogPublisher('workspace'), // TODO: get the 'worksacpe' name in a better way
        undefined,
        harmony,
        onComponentLoadSlot
      );

      ConsumerComponent.registerOnComponentConfigLoading('workspace', async (id) => {
        const componentId = await workspace.resolveComponentId(id);
        // We call here directly workspace.scope.get instead of workspace.get because part of the workspace get is loading consumer component
        // which in turn run this event, which will make and infinite loop
        const componentFromScope = await workspace.scope.get(componentId);
        const extensions = await workspace.componentExtensions(componentId, componentFromScope);
        const defaultScope = await workspace.componentDefaultScope(componentId);
        await workspace.loadExtensions(extensions);
        return {
          defaultScope,
          extensions,
        };
      });

      const workspaceSchema = getWorkspaceSchema(workspace);
      ui.registerUiRoot(new WorkspaceUIRoot(workspace, bundler));
      graphql.register(workspaceSchema);
      cli.register(new InstallCmd(workspace));
      cli.register(new EjectConfCmd(workspace));

      const capsuleListCmd = new CapsuleListCmd(isolator);
      const capsuleCreateCmd = new CapsuleCreateCmd(workspace);
      cli.register(capsuleListCmd);
      cli.register(capsuleCreateCmd);
      component.registerHost(workspace);

      return workspace;
    }

    return undefined;
  } catch (err) {
    return undefined;
  }
}
