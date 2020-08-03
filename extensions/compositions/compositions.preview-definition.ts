import { PreviewDefinition } from '@bit/bit.core.preview/preview-definition';
import { ComponentMap, Component } from '@bit/bit.core.component';
import { ExecutionContext } from '@bit/bit.core.environments';
import { CompositionsExtension } from './compositions.extension';
import { AbstractVinyl } from 'bit-bin/consumer/component/sources';

export class CompositionPreviewDefinition implements PreviewDefinition {
  readonly prefix = 'compositions';

  constructor(private compositions: CompositionsExtension) {}

  async renderTemplatePath(context: ExecutionContext): Promise<string> {
    return context.env.getMounter();
  }

  async getModuleMap(components: Component[]): Promise<ComponentMap<AbstractVinyl[]>> {
    const map = this.compositions.getCompositionFiles(components);
    return map.filter((value) => value.length !== 0);
  }
}
