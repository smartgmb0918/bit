import { Component } from '@bit/bit.core.component';

export type ExtensionData = {
  [key: string]: any;
};

export type OnComponentLoad = (component: Component) => Promise<ExtensionData>;
