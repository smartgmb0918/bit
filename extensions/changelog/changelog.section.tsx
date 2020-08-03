import React from 'react';
import { versionsArray } from './ui/changelog.data';
import { ChangeLogPage } from './ui/change-log-page';
import { Section } from '@bit/bit.core.component';
import styles from './changelog.module.scss';

export class ChangelogSection implements Section {
  route = {
    path: '~changelog',
    children: <ChangeLogPage className={styles.changeLog} versions={versionsArray} />,
  };
  navigationLink = {
    href: '~changelog',
    children: 'Changelog',
  };
}
