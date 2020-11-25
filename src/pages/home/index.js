import React from 'react';
import {
  StyleSheet,
  Animated,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {setPage} from './../../redux';
import {Header} from '../../atom';
import {useDispatch} from 'react-redux';
const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const HEADER_EXPANDED_HEIGHT = 100;
const HEADER_COLLAPSED_HEIGHT = 40;

const DATA = [
  {
    id: 'IQ1',
    arab: 'Bacaan 1',
    colorBg: '#FCE38A',
    colorBg2: '#F38181',
    keterangan:
      'Iqro 1 memperkenalkan huruf-huruf Arab dalam posisi terpisah dan hanya dengan vokal "a" (baris di atas, atau fathah).',
  },
  {
    id: 'IQ2',
    arab: 'Bacaan 2',
    colorBg: '#F54EA2',
    colorBg2: '#FF7676',
    keterangan:
      'Iqro 2 memperkenalkan bentuk huruf bersambung (di awal, di tengah, atau di akhir), tetapi masih dengan fathah.',
  },
  {
    id: 'IQ3',
    arab: 'Bacaan 3',
    colorBg: '#17EAD9',
    colorBg2: '#6078EA',
    keterangan:
      'Iqro 3 memperkenalkan vokal "i" (baris di bawah/kasrah) dan vokal "u" (baris di depan/dhammah).',
  },
  {
    id: 'IQ4',
    arab: 'Bacaan 4',
    colorBg: '#F02FC2',
    colorBg2: '#6094EA',
    keterangan:
      'Iqro 4 memperkenalkan tanwin (penambahan bunyi -n setelah vokal), sukun (konsonan tanpa vokal), dan qalqalah (konsonan yang diikuti vokal pendek).',
  },
  {
    id: 'IQ5',
    arab: 'Bacaan 5',
    colorBg: '#7117EA',
    colorBg2: '#EA6060',
    keterangan:
      'Iqro 5 memperkenalkan berbagai bentuk alif lam ("al-", kata sandang takrif dalam bahasa Arab), dan salah satu aturan tajwid yaitu idgham (peleburan).',
  },
  {
    id: 'IQ6',
    arab: 'Bacaan 6',
    colorBg: '#64C5E8',
    colorBg2: '#794BC4',
    keterangan:
      'Iqro 6, memperkenalkan aturan-aturan tajwid yang lain seperti iqlab (perubahan "n" menjadi "m") dan ikhfa (penyamaran bunyi), dan aturan wakaf (berhenti dalam membaca al-Quran).',
  },
];

const MainItem = ({item, onPress}) => (
  <TouchableHighlight
    style={{borderRadius: 20}}
    onPress={onPress}
    underlayColor="#fff">
    <LinearGradient
      colors={[item.colorBg, item.colorBg2]}
      style={styles.mainitem}
      start={{x: 1, y: 0.1}}
      end={{x: 0.1, y: 1.2}}>
      <View style={styles.card}>
        <Text style={styles.title}>{item.arab}</Text>
        <Text style={styles.detail}>{item.keterangan}</Text>
      </View>
    </LinearGradient>
  </TouchableHighlight>
);

const Home = ({navigation}) => {
  const scrollY = new Animated.Value(0);
  const dispatch = useDispatch();

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: 'clamp',
  });

  const nav = (x) => {
    dispatch(setPage(x));
    navigation.navigate('Main');
  };

  const renderMainItem = ({item}) => {
    return <MainItem item={item} onPress={(x) => nav((x = item.id))} />;
  };

  return (
    <View style={styles.MainContainer}>
      <Header headerHeight={headerHeight} />
      <FlatList
        contentContainerStyle={styles.scrollContainer}
        data={DATA}
        showsVerticalScrollIndicator={false}
        renderItem={renderMainItem}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
      />
      {/* <Text>Made with ♥️ in Jakarta, Indonesia</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: HEADER_EXPANDED_HEIGHT,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  mainitem: {
    width: SCREEN_WIDTH - 40,
    height: 180,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginBottom: -20,
  },
  title: {
    color: '#fff',
    top: 0,
    fontSize: 30,
    alignSelf: 'center',
    fontFamily: 'Morn',
  },
  detail: {
    textAlign: 'center',
    top: 10,
    color: '#fff',
    fontFamily: 'Morn',
  },
});

export default Home;
