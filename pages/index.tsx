import * as React from 'react';
import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View } from 'react-native';
import Libraries from '../components/Libraries';
import Pagination from '../components/Pagination';
import getApiUrl from '../util/getApiUrl';
import urlWithQuery from '../util/urlWithQuery';

export default function App(props) {
  const { data, query } = props;

  return (
    <View style={styles.container}>
      <Pagination query={query} total={data && data.total} />
      <Libraries libraries={data && data.libraries} />
      <Pagination query={query} total={data && data.total} />
    </View>
  );
}

App.getInitialProps = async (ctx: NextPageContext) => {
  let url = getApiUrl(urlWithQuery('/libraries', ctx.query), ctx);
  let response = await fetch(url);
  let result = await response.json();

  return {
    data: result,
    query: ctx.query,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
