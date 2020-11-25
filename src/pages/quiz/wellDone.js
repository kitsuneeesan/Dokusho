import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const Love = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
            colors={['#FCE38A', '#F38181']}
            style={styles.fox}
            start={{x: 0.9, y: 1.8}}
            end={{x: 0.1, y: 0.1}}>
        <LottieView source={require('./../../assets/img/json/ASD1.json')} autoPlay loop style={{height: 270,position:'absolute'}}/>
        <LottieView source={require('./../../assets/img/json/fox.json')} autoPlay loop style={{height: 250}}/>
      </LinearGradient>
      
      <Text style={styles.done}>Kerja Bagus!</Text>
      <View style={styles.kataContainer}>
        <Text style={styles.kata}>
          Terimakasih Telah Belajar Menggunakan Aplikasi Ini,
          Harap Dapat Membantu{'\n'}Teman-teman Dalam Belajar!{'\n'}
        </Text>
        <Text style={styles.kata}>
          Dibuat dengan ♥ di jakarta
        </Text>
      </View>
      <View style={{flex:1,justifyContent:'flex-end',bottom:30}}>
        <TouchableHighlight onPress={()=>alert('HALO')} style={{borderRadius:25}}>
          <LinearGradient
            colors={['#FCE38A', '#F38181']}
            style={styles.btn}
            start={{x: 0.9, y: 1.8}}
            end={{x: 0.1, y: 0.1}}>
              <Text style={styles.btnTxt}>Pelajaran selanjutnya!</Text>
          </LinearGradient>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    paddingTop:70,
    paddingHorizontal:30,
    alignItems:'center',
  },
  fox: {
    alignItems:'center',
    width:235,
    height:235,
    borderRadius:235/2,
    padding: 15
  },
  done:{
    fontSize:25,
    top:25,
    fontFamily:'Morn',
  },
  kata:{
    fontFamily:'Morn',
    textAlign:'center',
    fontSize:13.7
  },
  kataContainer:{
    top:50,
    width:SCREEN_WIDTH-60,
    height:120,
    alignItems:'center',
    borderRadius:15,
    padding:20,
    backgroundColor:'#fff',
    borderColor:'#fff',
    borderWidth:0.9,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  btn:{
    height:50,
    width:250,
    borderRadius:25,
    justifyContent:'center',
  },
  btnTxt:{
    textAlign:'center',
    color:'#fff',
  },
});

export default Love;