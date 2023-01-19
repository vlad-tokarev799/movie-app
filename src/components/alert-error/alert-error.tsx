import React from 'react';
import { Alert } from 'antd';

import './alert-error.scss';

export type ErrorProps = {
  text: string;
  description: string;
  active: boolean;
};

const AlertError = (props: ErrorProps) => {
  if (props.active) {
    return (
      <div className="alert-error">
        <Alert message={props.text} description={props.description} type="error" showIcon />
      </div>
    );
  }

  return null;
};

export default AlertError;
