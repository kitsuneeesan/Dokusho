import React from 'react';
import {
  StyleSheet,
  Animated,
  Text,
  Dimensions,
} from 'react-native';

import MainChar from './../assets/img/svg/menu.svg';
const {width: SCREEN_WIDTH} = Dimensions.get('screen');

export const Header = ({headerHeight}) => {
  return (
    <Animated.View style={[styles.Header, { height: headerHeight }]}>
      <MainChar style={styles.Menu} width={25} height={25} />
      <Text style={styles.HeaderTitle}>DOKUSHO</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  Header:{
    width: SCREEN_WIDTH,
    backgroundColor:'#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    justifyContent:'center',
  },
  HeaderTitle:{
    fontSize:20,
    alignSelf:'center',
    fontFamily:'Aaargh'
  },
  Menu:{
    position:'absolute',
    left:10,
  },
});