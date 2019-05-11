import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import FixedFooter from '../../../components/footer/fixed-footer';
import Loading from '../../../components/Loading/loading';
import colors from '../../../constants/colors';

const Layout = ({ children, loading }) => (
  <View styles={styles.container}>
    <Loading isVisible={loading} />
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.background
  }
});

export default Layout;