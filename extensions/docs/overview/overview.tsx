import React, { useContext } from 'react';
import { ComponentContext } from '@bit/bit.core.component';
import { ComponentPreview } from '@bit/bit.core.preview';

export function Overview() {
  const component = useContext(ComponentContext);

  return <ComponentPreview component={component} style={{ width: '100%', height: '100%' }} previewName="overview" />;
}
