import { BuildContext } from '@bit/bit.core.builder';

export interface PreviewContext extends BuildContext {
  entries: string[];
}
