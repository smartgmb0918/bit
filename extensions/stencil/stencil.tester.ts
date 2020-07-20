import { createTesting } from '@stencil/core/testing';
import { Tester, TestResults, TesterContext } from '@bit/bit.core.tester';
import { Workspace } from '@bit/bit.core.workspace';

export class StencilTester implements Tester {
  constructor(private workspace: Workspace) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async test(context: TesterContext): Promise<TestResults> {
    const testing = await createTesting({
      rootDir: this.workspace.path,
    });

    testing.run({});

    return {
      total: 50,
    };
  }
}
