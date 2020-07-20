import React from 'react';
import { ComponentPreview } from '@bit/bit.core.preview';
import { ComponentModel } from '@bit/bit.core.component';
import { Composition } from '../composition';

export type ComponentCompositionProps = {
  component: ComponentModel;
  composition?: Composition;
};

export function ComponentComposition({ component, composition }: ComponentCompositionProps) {
  return (
    <ComponentPreview
      component={component}
      style={{ width: '100%', height: '100%' }}
      previewName="compositions"
      queryParams={composition && composition.identifier}
    />
  );
}
