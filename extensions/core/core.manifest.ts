import { ExtensionManifest } from '@teambit/harmony';
import { WorkspaceExt } from '@bit/bit.core.workspace';
import { ScopeExtension } from '@bit/bit.core.scope';
import provideCore from './core.provider';
import { LoggerExtension } from '@bit/bit.core.logger';
import { ConfigExt } from '@bit/bit.core.config';

export default {
  name: 'core',
  dependencies: [ConfigExt, LoggerExtension, WorkspaceExt, ScopeExtension],
  provider: provideCore,
} as ExtensionManifest;
