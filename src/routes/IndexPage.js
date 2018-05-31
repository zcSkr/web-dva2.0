import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';

@connect(state => ({
  example: state.example
}))

export default class IndexPage extends Component {
  componentDidMount(){
    this.props.dispatch({
      type: 'example/save'
    })
  }
  render() {
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
        </ul>
      </div>
    );
  }
}


