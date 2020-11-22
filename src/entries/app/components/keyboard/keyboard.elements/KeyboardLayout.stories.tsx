import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, array, object } from '@storybook/addon-knobs';
import { makeStyles, createStyles, ThemeProvider } from '@material-ui/styles';
import { KeyboardLayout } from './KeyboardLayout';
import * as options from './KeyboardOptions';
import { themes } from '../../../assets/themes/themes';

const useStyles = makeStyles(
  createStyles({
    '@global': {
      'html, body, #root': {
        height: '90%',
      },
      div: {
        boxSizing: 'border-box',
      },
    },
    wrapper: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& .container-border': {
        padding: '10px',
        border: '1px solid blue',
        width: '300px',
        height: '200px',
      },
      '& .container': {
        background: 'white',
        height: '100%',
      },
    },
  }),
);

storiesOf('KeyboardLayout', module)
  .addDecorator(withKnobs)
  .add('test', () => {
    const {
      keyboardSet,
      keyCountByRow,
      k1,
      k2,
      k3,
      differentKeys,
    } = options.KeyboardLayoutOptionsDigitNUMS;

    const newOptions: options.IKeyboardOptions = {
      keyboardSet: array('set', keyboardSet, ' '),
      keyCountByRow: array('keyByRows', keyCountByRow.join(' ').split(' '), ' ').map(
        (i: string) => +i,
      ),
      k1: number('keyWidth', k1, {
        range: true,
        min: 0,
        max: 1,
        step: 0.1,
      }),
      k2: number('keySpace', k2, {
        range: true,
        min: 0,
        max: 1.5,
        step: 0.1,
      }),
      k3: number('keyHeight', k3, {
        range: true,
        min: 0,
        max: 1,
        step: 0.1,
      }),
      differentKeys: object('diffKeys', differentKeys),
      useStyles: () => ({}),
    };

    const classes = useStyles();
    return (
      <ThemeProvider theme={themes.default}>
        <div className={classes.wrapper}>
          <div className="container-border">
            <div className="container">
              <KeyboardLayout options={newOptions} />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  });

// const layout: keyof typeof options = optionsKnob(
//   'layout',
//   {
//     UA: 'KeyboardLayoutOptionsUA',
//     EN: 'KeyboardLayoutOptionsEN',
//     NUMS: 'KeyboardLayoutOptionsNUMS',
//   },
//   'KeyboardLayoutOptionsNUMS',
//   { display: 'inline-radio' },
// );
