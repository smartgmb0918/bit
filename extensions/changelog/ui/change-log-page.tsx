import React, { HTMLAttributes, useContext } from 'react';
import classNames from 'classnames';
import { H1 } from '@bit/bit.evangelist.elements.heading';
import { TagBlock } from '@bit/bit.core.stage-components/workspace-sections/version-block';
import { Version } from '@bit/bit.core.stage-components/workspace-page/change-log.data';
import { Separator } from '@bit/bit.core.stage-components';
import styles from './change-log-page.module.scss';
import { ComponentContext } from '@bit/bit.core.component';

type ChangeLogPageProps = {
  versions: Version[];
} & HTMLAttributes<HTMLDivElement>;

export function ChangeLogPage({ versions, className }: ChangeLogPageProps) {
  const component = useContext(ComponentContext);
  if (!versions) return <div>No tags yet</div>;
  const tags = component.tags.toArray();

  return (
    <div className={classNames(styles.changeLogPage, className)}>
      <H1 className={styles.title}>History</H1>
      <Separator />
      {tags.reverse().map((tag, index) => (
        <TagBlock key={index} tag={tag} />
      ))}
    </div>
  );
}
