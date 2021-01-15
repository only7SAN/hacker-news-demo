import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// 全局 css
import 'normalize.css';
import './index.css';

import Layout from './page/layout';
import List from './page/list';
import Item from './page/item';
import Reply from './page/reply';

const Wrapper = (props) => (
  <Layout>
    <Switch>
      <Route path="/home" component={List} />
      <Route path="/item" component={Item} />
      <Route path="/reply" component={Reply} />
      <Route path="/" component={List} />
    </Switch>
  </Layout>
);


ReactDOM.render(
  <Router>
    <Route path="/" component={Wrapper} />
  </Router>,
  document.getElementById('root')
);
