import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { A, Header as HtmlHeader } from '@expo/html-elements';
import { layout, colors, H5, P } from '../common/styleguide';
import { Button } from './Button';
import { Logo, Plus } from './Icons';

export default function Header() {
  return (
    <HtmlHeader style={styles.header}>
      <View style={styles.headerContents}>
        <View style={styles.displayHorizontal}>
          <Logo fill={colors.primary} width={29} height={26} />
          <H5 style={layout.isSmallScreen() && styles.smallTitle}>
            <A href="/" style={styles.headerContentsTitle}>
              React Native Directory
            </A>
          </H5>
        </View>
        <Button href="https://github.com/react-native-community/directory#how-do-i-add-a-library">
          <View style={styles.displayHorizontal}>
            <>
              <Plus width={14} height={14} />
              {!layout.isSmallScreen() && <P style={{ marginLeft: 6 }}>Add a library</P>}
            </>
          </View>
        </Button>
      </View>
    </HtmlHeader>
  );
}

let styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: colors.gray7,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerContents: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: layout.maxWidth,
    paddingHorizontal: 16,
  },
  headerContentsTitle: {
    color: colors.primary,
    paddingLeft: 8,
  },
  displayHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallTitle: {
    fontSize: 18,
  },
});
