import React from 'react';
import withRedux from 'next-redux-wrapper';

import Document from '../components/Document';
import GlobalTooltip from '../components/GlobalTooltip';
import PageLayout from '../components/PageLayout';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Header from '../components/Header';
import List from '../components/List';

import { initStore } from '../common/store';
import { handleTopicSorting, handleSearchSorting } from '../common/search';

class Index extends React.PureComponent {
  render() {
    const sortedData = this.props.topic
      ? handleTopicSorting({
          data: this.props.libraries,
          topic: this.props.topic,
          search: this.props.search,
        })
      : handleSearchSorting({
          data: this.props.libraries,
          topic: this.props.topic,
          search: this.props.search,
        });

    return (
      <Document>
        <Header />
        <Navigation selected={this.props.sortBy} />
        <PageLayout>
          <List topics={this.props.topics} data={sortedData} />
        </PageLayout>
        <GlobalTooltip />
        <Footer />
      </Document>
    );
  }
}

export default withRedux(initStore, state => state)(Index);
