import { Workspace } from '../workspace';
import { ScopeExtension } from '../scope';
import { ComponentHost } from '../component';
import { GraphBuilder } from './graph-builder';

export type GraphDeps = [Workspace, ScopeExtension, ComponentHost];

export async function provide([workspace, scope, ComponentHost]: GraphDeps) {
  return new GraphBuilder(ComponentHost, workspace, scope);
}
