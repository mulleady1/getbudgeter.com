import React from 'react';
import Promise from 'pinkie-promise';
import {
  render,
  unmountComponentAtNode
} from 'react-dom';
import ConfirmBox from './ConfirmBox';

const mountNode = document.getElementById('dialog');

export function confirm(message='Are you sure?', title='Confirm') {
  return new Promise(resolve => {
    const props = {
      title,
      message,
      onYesClick: () => {
        unmountComponentAtNode(mountNode);
        resolve({ confirmed: true });
      },
      onNoClick: () => {
        unmountComponentAtNode(mountNode);
        resolve({ confirmed: false });
      }
    };

    render(<ConfirmBox {...props} />, mountNode);
  });

}
