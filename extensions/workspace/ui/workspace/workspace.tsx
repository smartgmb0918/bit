import React, { ReactNode } from 'react';
import { gql } from 'apollo-boost';
import 'reset-css';
import styles from './workspace.module.scss';
// import { Component } from 'bit-bin/component/component.ui';
// import { defaultComponent } from './default-component';
import { Workspace as WorkspaceModel } from './workspace-model';
import { WorkspaceProvider } from './workspace-provider';
import { RouteSlot, SlotRouter } from '@bit/bit.core.react-router/slot-router';
import { useDataQuery } from '@bit/bit.core.ui/ui/data/use-data-query';
import { FullLoader } from 'bit-bin/../to-eject/full-loader';
import { Corner } from '@bit/bit.core.stage-components';
import { SideBar } from '@bit/bit.core.stage-components';

const WORKSPACE = gql`
  {
    workspace {
      name
      path
      components {
        id {
          name
          version
          scope
        }
      }
    }
  }
`;

export type WorkspaceProps = {
  routeSlot: RouteSlot;
};

/**
 * main workspace component.
 */
export function Workspace({ routeSlot }: WorkspaceProps) {
  const { data } = useDataQuery(WORKSPACE);

  if (!data) {
    return (
      <div className={styles.emptyContainer}>
        <FullLoader />
      </div>
    );
  }

  const workspace = WorkspaceModel.from(data.workspace);

  return (
    <WorkspaceProvider workspace={workspace}>
      <div className={styles.workspace}>
        <Corner name={workspace.name} />
        <SideBar className={styles.sideBar} components={workspace.components} />
        <div className={styles.main}>
          <SlotRouter slot={routeSlot} />
        </div>
      </div>
    </WorkspaceProvider>
  );
}

export type WorkspaceContextProps = {
  children: ReactNode;
};
