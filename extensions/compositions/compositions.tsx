import React, { useContext, useState, useEffect } from 'react';
import head from 'lodash.head';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import R from 'ramda';
import { PropTable } from '@bit/bit.test-scope.ui.property-table';
import { ComponentContext } from '@bit/bit.core.component';
import { CompositionsPanel } from './ui/compositions-panel/compositions-panel';
import { ComponentComposition } from './ui';
import { TabContainer, Tab, TabList, TabPanel } from '@bit/bit.core.panel-ui/ui/tabs';
import { PanelContainer, Panel } from '@bit/bit.core.panel-ui/ui/panel-container';

import styles from './compositions.module.scss';

const GET_COMPONENT = gql`
  query($id: String!) {
    workspace {
      getDocs(id: $id) {
        properties {
          name
          description
          required
          type
          defaultValue {
            value
            computed
          }
        }
      }
    }
  }
`;

export function Compositions() {
  const component = useContext(ComponentContext);
  const [selected, selectComposition] = useState(head(component.compositions));
  const { data } = useQuery(GET_COMPONENT, {
    variables: { id: component.id.legacyComponentId.name },
  });
  const properties = R.path(['workspace', 'getDocs', 'properties'], data);

  // reset selected composition when component changes.
  // this does trigger renderer, but perf seems to be ok
  useEffect(() => {
    selectComposition(component.compositions[0]);
  }, [component]);
  const compositionUrl = `${component.server.url}/#${component.id.fullName}?preview=compositions&`;
  return (
    <PanelContainer className={styles.compositionsPage}>
      <ComponentComposition component={component} composition={selected}></ComponentComposition>
      <Panel>
        <TabContainer>
          <TabList>
            <Tab>compositions</Tab>
            <Tab>properties</Tab>
            <Tab>dependencies</Tab>
          </TabList>
          <TabPanel>
            <CompositionsPanel
              onSelect={selectComposition}
              url={compositionUrl}
              compositions={component.compositions}
              active={selected}
            />
          </TabPanel>
          <TabPanel>
            {properties && properties.length > 0 ? (
              // TODO - make table look good in panel
              <PropTable rows={properties} />
            ) : (
              // TODO - make this look good
              <div>no props</div>
            )}
          </TabPanel>
          <TabPanel></TabPanel>
        </TabContainer>
      </Panel>
    </PanelContainer>
  );
}
