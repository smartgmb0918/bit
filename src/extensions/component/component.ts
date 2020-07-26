import { SemVer } from 'semver';
import { AnyFS } from '@teambit/any-fs';
// import { NothingToSnap } from './exceptions';
import ComponentConfig from './config';
import ComponentFS from './component-fs';
import { ComponentHost } from './component-factory';
// eslint-disable-next-line import/no-cycle
import { ComponentID } from './id';
import { TagMap } from './tag-map';
import { State } from './state';
// eslint-disable-next-line import/no-cycle
import { Snap } from './snap';
// import { Author } from './types';
import { capitalize } from '../utils/capitalize';
import { Tag } from './tag';

/**
 * in-memory representation of a component.
 */
export class Component {
  constructor(
    /**
     * component ID represented by the `ComponentId` type.
     */
    readonly id: ComponentID,

    /**
     * head version of the component. can be `null` for new components.
     */
    readonly head: Snap | null = null,

    /**
     * state of the component.
     */
    private _state: State | null = null,

    /**
     * tags of the component.
     */
    readonly tags: TagMap = new TagMap(),

    /**
     * the component factory
     */
    private factory: ComponentHost
  ) {}

  async getState() {
    // TODO: @guysaar change to head snap when refactor component module to use snaps
    return this.headTag ? this.factory.getState(this.id, this.headTag.snap.hash) : this.factory.getState(this.id);
  }

  set state(state: State | null) {
    if (state) this._state = state;
  }

  get state(): State | null {
    if (!this._state) return null;
    return this._state;
  }

  /**
   * component configuration which is later generated to a component `package.json` and `bit.json`.
   */
  get config(): ComponentConfig | null {
    if (!this.state) return null;
    return this.state.config;
  }

  /**
   * in-memory representation of the component current filesystem.
   */
  get filesystem(): ComponentFS | null {
    if (!this.state) return null;
    return this.state.filesystem;
  }

  get headTag(): Tag | null {
    if (this.tags.size === 0) return null;
    const tag = this.tags.getLatest();
    if (!tag) return null;
    return tag;
  }

  stringify(): string {
    return JSON.stringify({
      id: this.id,
      head: this.head,
    });
  }

  /**
   * record component changes in the `Scope`.
   */
  // snap(author: Author, message = '') {
  // if (!this.isModified()) throw new NothingToSnap();
  // const snap = new Snap(this, author, message);

  // return new Component(this.id, snap, snap.state);
  // }

  /**
   * display name of the component.
   */
  get displayName() {
    const tokens = this.id.name.split('-').map((token) => capitalize(token));
    return tokens.join(' ');
  }

  /**
   * tag a component `Snap` with a semantic version. we follow SemVer specs as defined [here](https://semver.org/)).
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tag(version: SemVer) {
    // const snap = this.snap();
    // const tag = new Tag(version, snap);
    // this.tags.set(tag);
  }

  /**
   * determines whether this component is modified in the workspace.
   */
  async isModified() {
    if (!this.head) return true;
    return (await this.getState()).hash !== this.head.hash;
  }

  /**
   * determines whether this component is new.
   */
  isNew() {
    return this.head === null;
  }

  // TODO: @david after snap we need to make sure to refactor here.
  loadState(snapId: string): Promise<State> {
    return this.factory.getState(this.id, snapId);
  }

  /**
   * checkout the component to a different version in its working tree.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkout(version: SemVer) {}

  /**
   * examine difference between two components.
   */
  // diff(other: Component): Difference {}

  /**
   * merge two different components
   */
  // merge(other: Component): Component {}

  /**
   * write a component to a given file system.
   * @param path root path to write the component
   * @param fs instance of any fs to use.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  write(path: string, fs?: AnyFS) {}

  /**
   *
   * Check if 2 components are equal
   * @param {Component} component
   * @returns {boolean}
   * @memberof Component
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  equals(component: Component): boolean {
    return component.id.toString() === this.id.toString();
  }
}

export default Component;
