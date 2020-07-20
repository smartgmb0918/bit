import { ExtensionManifest, Slot } from '@teambit/harmony';
import workspaceProvider from './workspace.provider';
import { ScopeExtension } from '@bit/bit.core.scope';
import { ComponentExtension } from '@bit/bit.core.component';
import { IsolatorExtension } from '@bit/bit.core.isolator';
import { LoggerExt } from '@bit/bit.core.logger';
import { DependencyResolverExtension } from '@bit/bit.core.dependency-resolver';
import { VariantsExt } from '@bit/bit.core.variants';
import { EXT_NAME } from './constants';
import { GraphQLExtension } from '@bit/bit.core.graphql';
import { CLIExtension } from '@bit/bit.core.cli';
import { UIExtension } from '@bit/bit.core.ui';
import { BundlerExtension } from '@bit/bit.core.bundler';
import { OnComponentLoad } from './on-component-load';

export default {
  name: EXT_NAME,
  dependencies: [
    CLIExtension,
    ScopeExtension,
    ComponentExtension,
    IsolatorExtension,
    DependencyResolverExtension,
    VariantsExt,
    LoggerExt,
    GraphQLExtension,
    UIExtension,
    BundlerExtension,
  ],
  slots: [Slot.withType<OnComponentLoad>()],
  provider: workspaceProvider,
  defineRuntime: 'browser',
} as ExtensionManifest;
