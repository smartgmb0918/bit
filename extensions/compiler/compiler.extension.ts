import { WorkspaceExt } from '@bit/bit.core.workspace';
import { Environments } from '@bit/bit.core.environments';
import { Workspace } from '@bit/bit.core.workspace';
import { CLIExtension } from '@bit/bit.core.cli';
import { CompileCmd } from './compiler.cmd';
import { WorkspaceCompiler } from './workspace-compiler';
import { CompilerTask } from './compiler.task';
import { Extensions } from 'bit-bin/constants';
import { BitId } from 'bit-bin/bit-id';

export class CompilerExtension {
  static id = Extensions.compiler;
  static dependencies = [CLIExtension, WorkspaceExt, Environments];
  constructor(private workspaceCompiler: WorkspaceCompiler, readonly task: CompilerTask) {}
  compileOnWorkspace(
    componentsIds: string[] | BitId[], // when empty, it compiles all
    options: {
      noCache?: boolean;
      verbose?: boolean;
    }
  ) {
    return this.workspaceCompiler.compileComponents(componentsIds, options);
  }
  static async provider([cli, workspace, envs]: [CLIExtension, Workspace, Environments]) {
    const compilerTask = new CompilerTask(CompilerExtension.id);
    const workspaceCompiler = new WorkspaceCompiler(workspace, envs);
    const compilerExtension = new CompilerExtension(workspaceCompiler, compilerTask);
    cli.register(new CompileCmd(workspaceCompiler));
    return compilerExtension;
  }
}
