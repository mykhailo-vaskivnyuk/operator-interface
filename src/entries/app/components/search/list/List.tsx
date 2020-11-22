import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { List } from 'react-virtualized';
import { styles, listVirtualizedStyle } from './list.styles';
import { ListClass, IList } from './list.class';
import { useList, PropsList } from './list.hook';
import { withState } from '../../../assets/helpers/connect.state.object';

function ListComponent(props: PropsList) {
  const { items, onItemSelect, itemRenderer } = useList(props);
  const { t } = useTranslation();
  if (!items) return <div />;

  const { classes } = props;
  return (
    <div className={classes.list} onClick={onItemSelect} aria-hidden>
      {items.length ? (
        <List
          width={2000}
          height={500}
          rowHeight={50}
          rowCount={items.length}
          rowRenderer={itemRenderer}
          style={listVirtualizedStyle}
        />
      ) : (
        <div className={classes.notFound}>{t('not found')}</div>
      )}
    </div>
  );
}

const ListWithObject = withState<IList, PropsList>(ListClass, ListComponent);

export const ListStyled = withStyles(styles)(ListWithObject);
