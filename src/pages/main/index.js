import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {openDatabase} from 'react-native-sqlite-storage';
import {useDispatch, useSelector} from 'react-redux';
import {Header} from '../../atom';
import {setMateri} from '../../redux';

var db = openDatabase({name: 'user_db.db', createFromLocation: 1});

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const HEADER_EXPANDED_HEIGHT = 100;
const HEADER_COLLAPSED_HEIGHT = 40;

const main = ({navigation}) => {
  const [flatListItems, setFlatListItems] = useState([]);
  const home = useSelector((state) => state.Home);
  const scrollY = new Animated.Value(0);
  const dispatch = useDispatch();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM ' + home.page, [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  }, []);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: 'clamp',
  });

  const nav = (x) => {
    dispatch(setMateri(x));
    navigation.navigate('Quiz');
  };

  const MainItem = (item) => {
    return (
      <TouchableOpacity onPress={(x) => nav((x = item.id))}>
        <LinearGradient
          colors={[item.color1, item.color2]}
          style={styles.mainitem}
          start={{x: 1, y: 0.1}}
          end={{x: 0.1, y: 1.2}}>
          <Text style={styles.title}>{item.judul}</Text>
          <Text style={styles.materi}>{item.materi}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.MainContainer}>
      <Header headerHeight={headerHeight} />
      <FlatList
        contentContainerStyle={styles.scrollContainer}
        data={flatListItems}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => MainItem(item)}
        keyExtractor={(item) => item.id}
        numColumns={2}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
      />
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
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    width: SCREEN_WIDTH / 2 - 25,
    height: 170,
    margin: 10,
    borderRadius: 15,
    padding: 10,
    elevation: 5,
    justifyContent: 'space-around',
  },
  title: {
    color: '#fff',
    fontFamily: 'Aaargh',
    fontSize: 19,
    textAlign: 'center',
  },
  materi: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  angka: {
    color: '#617D8A',
    fontWeight: 'bold',
    fontSize: 17,
  },
  bullet: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
});

export default main;
