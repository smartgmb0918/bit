/* eslint-disable max-classes-per-file */
import { Slot, SlotRegistry } from '@teambit/harmony';
import { GraphQLExtension } from '../graphql';
import { componentSchema } from './component.graphql';
import { ComponentHost } from './component-factory';
import { HostNotFound } from './exceptions';

export type ComponentHostSlot = SlotRegistry<ComponentHost>;

export class ComponentExtension {
  static id = '@teambit/component';

  constructor(
    /**
     * slot for component hosts to register.
     */
    private hostSlot: ComponentHostSlot
  ) {}

  /**
   * register a new component host.
   */
  registerHost(host: ComponentHost) {
    this.hostSlot.register(host);
    return this;
  }

  getHost(id: string): ComponentHost {
    const host = this.hostSlot.get(id);
    if (!host) throw new HostNotFound();
    return host;
  }

  static slots = [Slot.withType<ComponentHost>()];

  static dependencies = [GraphQLExtension];

  static async provider([graphql]: [GraphQLExtension], config, [hostSlot]: [ComponentHostSlot]) {
    const componentExtension = new ComponentExtension(hostSlot);
    graphql.register(componentSchema(componentExtension));
    return componentExtension;
  }
}

export default ComponentExtension;
