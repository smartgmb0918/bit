import { ComponentID } from '@bit/bit.core.component';

export class PreviewArtifactNotFound extends Error {
  constructor(readonly componentId: ComponentID) {
    super();
  }

  toString() {
    return `preview for component ${this.componentId.toString()} was not found`;
  }
}
