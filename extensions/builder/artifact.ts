import { AbstractVinyl } from 'bit-bin/consumer/component/sources';
import { ExtensionDescriptor } from '@bit/bit.core.core';

export class ExtensionArtifact {
  constructor(readonly files: AbstractVinyl[], readonly extensionDescriptor: ExtensionDescriptor) {}

  toObject() {
    return {
      extensionDescriptor: this.extensionDescriptor,
    };
  }
}
