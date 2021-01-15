import React from 'react';

import './style.css';

// 布局
const Layout = (props) => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <div>hacker-news</div>
      </header>
      <div className="layout-content">{props.children}</div>
    </div>
  );
};

export default Layout;
