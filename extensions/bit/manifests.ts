import { CLIExtension } from '@bit/bit.core.cli';
import { CompilerExtension } from '@bit/bit.core.compiler';
import { ComponentFactoryExt } from '@bit/bit.core.component';
import { ComponentGraphExt } from '@bit/bit.core.graph';
import { ConfigExt } from '@bit/bit.core.config';
import { CoreExt } from '@bit/bit.core.core';
import { CreateExt } from '@bit/bit.core.create';
import { DependencyResolverExtension } from '@bit/bit.core.dependency-resolver';
import { Environments } from '@bit/bit.core.environments';
import { FlowsExt } from '@bit/bit.core.flows';
// import { GitExt } from '../git';
import { InsightsExt } from '@bit/bit.core.insights';
import { IsolatorExtension } from '@bit/bit.core.isolator';
import { LoggerExtension } from '@bit/bit.core.logger';
import { PkgExtension } from '@bit/bit.core.pkg';
import { ReactExtension } from '@bit/bit.core.react';
import { ScopeExtension } from '@bit/bit.core.scope';
import { TesterExtension } from '@bit/bit.core.tester';
import { BuilderExtension } from '@bit/bit.core.builder';
import { VariantsExt } from '@bit/bit.core.variants';
import { GraphQLExtension } from '@bit/bit.core.graphql';
import { WorkspaceExt } from '@bit/bit.core.workspace';
import { UIExtension } from '@bit/bit.core.ui';
import { PreviewExtension } from '@bit/bit.core.preview/preview.extension';
import { DocsExtension } from '@bit/bit.core.docs/docs.extension';
import { StencilExtension } from '@bit/bit.core.stencil';
import { CompositionsExtension } from '@bit/bit.core.compositions';
import { DeprecationExtension } from '@bit/bit.core.deprecation';
import { DefaultEnvExtension } from '@bit/bit.core.default-env/default-env.extension';

export const manifestsMap = {
  [CLIExtension.name]: CLIExtension,
  [WorkspaceExt.name]: WorkspaceExt,
  [CompilerExtension.id]: CompilerExtension,
  [ComponentFactoryExt.id]: ComponentFactoryExt,
  [PreviewExtension.name]: PreviewExtension,
  [ConfigExt.name]: ConfigExt,
  [DocsExtension.name]: DocsExtension,
  [CompositionsExtension.name]: CompositionsExtension,
  [GraphQLExtension.name]: GraphQLExtension,
  [UIExtension.name]: UIExtension,
  [CoreExt.name]: CoreExt,
  [CreateExt.name]: CreateExt,
  // [DependencyResolverExt.name]: DependencyResolverExt,
  [Environments.id]: Environments,
  [FlowsExt.name]: FlowsExt,
  // [GitExt.name]: GitExt,
  [ComponentGraphExt.name]: ComponentGraphExt,
  [DependencyResolverExtension.id]: DependencyResolverExtension,
  [InsightsExt.name]: InsightsExt,
  [IsolatorExtension.id]: IsolatorExtension,
  [LoggerExtension.id]: LoggerExtension,
  [PkgExtension.id]: PkgExtension,
  // TODO: take from the extension itself & change name to follow convention
  [ReactExtension.name]: ReactExtension,
  [StencilExtension.name]: StencilExtension,
  [ScopeExtension.id]: ScopeExtension,
  // TODO: take from the extension itself & change name to follow convention
  [TesterExtension.id]: TesterExtension,
  // TODO: take from the extension itself & change name to follow convention
  [BuilderExtension.id]: BuilderExtension,
  [VariantsExt.name]: VariantsExt,
  [WorkspaceExt.name]: WorkspaceExt,
  [DeprecationExtension.name]: DeprecationExtension,
  [DefaultEnvExtension.id]: DefaultEnvExtension,
};
