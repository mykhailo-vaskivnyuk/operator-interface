import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
// import { SearchService } from './request/requests';
import { ListStyled } from './List';

storiesOf('List', module)
  .addDecorator(withKnobs)
  .add('test', () => <ListStyled filter={text('filter', 'МОЛО')} onSelect={action('clicked')} />);

// import React from 'react';
// import { action } from '@storybook/addon-actions';
// import { storiesOf } from '@storybook/react';
// import { withKnobs, text } from '@storybook/addon-knobs';

// import { ComponentOne } from './component.one';

// storiesOf('ComponentOne', module)
//   .addDecorator(withKnobs)
//   .add('test', () => <ComponentOne text={text('color', 'blue')} onClick={action('clicked')} />);
