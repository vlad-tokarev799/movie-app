import React from 'react';
import { Spin } from 'antd';

import './loader.scss';

const Loader = (props: { loading: boolean }) => {
  if (props.loading) {
    return (
      <div className="loader">
        <Spin size={'large'} tip="Loading"></Spin>
      </div>
    );
  }

  return null;
};

export default Loader;
