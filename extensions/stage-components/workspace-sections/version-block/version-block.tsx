import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { mutedText } from '@bit/bit.base-ui.text.muted-text';
// import { Image } from '@bit/bit.evangelist.elements.image';
// import { VersionTag } from 'bit-bin/workspace-components/version-tag';
import { TimeAgo } from 'bit-bin/workspace-components/time-ago';
// import { Status } from 'bit-bin/workspace-components/status';
import { MiddleDot } from 'bit-bin/workspace-components/middle-dot';
// import Avatar from 'bit-bin/workspace-components/Avatar';
import { Title } from 'bit-bin/workspace-components/title';
import { CommitDetails } from 'bit-bin/workspace-components/commit-details';
import styles from './version-block.module.scss';
import { Tag } from '@bit/bit.core.component';

export type VersionBlockProps = {
  /**
   * component that gets the data of a single tag and displays it in the change log page
   */
  tag: Tag;
} & HTMLAttributes<HTMLDivElement>;
/**
 * change log section
 * @name VersionBlock
 */
export function TagBlock({ tag, className, ...rest }: VersionBlockProps) {
  return (
    <div className={classNames(styles.versionBlock, className)} {...rest}>
      <div className={styles.topRow}>
        <Title className={styles.marginRight}>{tag.version.raw}</Title>
        {/* {version.isLatest && <VersionTag className={styles.marginRight}>Latest</VersionTag>} */}
        <TimeAgo className={styles.marginRight} date={tag.snap.timestamp.toString()} />
        <MiddleDot className={classNames(mutedText, styles.marginRight)} />
        {/* <Status className={styles.marginRight} status={version.ciStatus} /> */}
        <MiddleDot className={classNames(mutedText, styles.marginRight)} />
        {/* <Status className={styles.marginRight} status={version.testStatus} /> */}
        {/* <Avatar
          className={styles.marginRight}
          account={version.contributors}
          size={30}
          // name={version.contributors.name}
          // alt=""
        /> */}
        {/* <Image alt="" src="bit-assets/simulations.svg" /> */}
      </div>
      <CommitDetails commitTitle="" commitMessage={tag.snap.message} />
    </div>
  );
}
