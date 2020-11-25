/* import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  View,
  TouchableOpacity,
} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

class AnsBtn extends React.Component {
  constructor(props) {
    super(props);
    this.shakeAnimation = new Animated.Value(0);
    this.state = {
      Correct: '#fff',
      unCorrect: '#fff',
      Listener: 1,
      fakebtn: null,
    };
  }

  Correct = () => {
    this.setState({Correct: '#4ee44e', fakebtn: true});
    this.props.Listener(this.state.Listener);
  };

  unCorrect = () => {
    this.setState({unCorrect: 'red'});
    Animated.sequence([
      Animated.timing(this.shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(this.shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(this.shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(this.shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  render() {
    if (this.state.fakebtn) {
      return (
        <Animated.View
          style={
            this.props.jawaban
              ? [
                  styles.Abox3,
                  {
                    borderColor: this.state.Correct,
                  },
                ]
              : [
                  styles.Abox3,
                  {
                    borderColor: this.state.unCorrect,
                    transform: [{translateX: this.shakeAnimation}],
                  },
                ]
          }>
          <Text style={styles.Qtitle3}>{this.props.text}</Text>
        </Animated.View>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={
            this.props.jawaban ? () => this.Correct() : () => this.unCorrect()
          }>
          <Animated.View
            style={
              this.props.jawaban
                ? [
                    styles.Abox3,
                    {
                      borderColor: this.state.Correct,
                    },
                  ]
                : [
                    styles.Abox3,
                    {
                      borderColor: this.state.unCorrect,
                      transform: [{translateX: this.shakeAnimation}],
                    },
                  ]
            }>
            <Text style={styles.Qtitle3}>{this.props.text}</Text>
          </Animated.View>
        </TouchableOpacity>
      );
    }
  }
}

class YesorNo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.DATA,
    };
  }

  componentDidMount() {
    this.state.data.sort(() => Math.random() - 0.5);
  }

  render() {
    return (
      <View style={styles.MC3}>
        <View style={styles.cardQ3}>
          <Text style={styles.Qtitle3}>
            {this.props.pertanyaan} adalah {this.state.data[0].arab}
          </Text>
        </View>

        <View style={styles.btnCon3}>
          <AnsBtn
            jawaban={this.props.pertanyaan == this.state.data[0].dibaca}
            text={'Ya'}
            Listener={this.props.Listener}
          />
          <AnsBtn
            jawaban={this.props.pertanyaan == this.state.data[1].dibaca}
            text={'Bukan'}
            Listener={this.props.Listener}
          />
        </View>
        <View style={styles.cardQ3}>
          <Text style={styles.Qtitle3}>
            {this.props.pertanyaan} adalah {this.state.data[0].arab}
          </Text>
        </View>
        <View style={styles.btnCon3}>
          <AnsBtn
            jawaban={this.props.pertanyaan == this.state.data[0].dibaca}
            text={'Ya'}
            Listener={this.props.Listener}
          />
          <AnsBtn
            jawaban={this.props.pertanyaan == this.state.data[1].dibaca}
            text={'Bukan'}
            Listener={this.props.Listener}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnCon3: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  cardQ3: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    width: SCREEN_WIDTH - 50,
    height: 70,
    borderColor: '#fff',
    borderWidth: 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Abox3: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 0.9,
    margin: 5,
    justifyContent: 'center',
    width: SCREEN_WIDTH / 2 - 35,
    height: 60,
    borderWidth: 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  Qtitle3: {
    color: '#394249',
    fontSize: 20,
    fontFamily: 'Morn',
    alignSelf: 'center',
  },
  MC3: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function App() {
  const [asw, setAsw] = useState([0, 1]);
  const asd = () => {
    let list = asw;
    let asd = list.sort(() => Math.random() - 0.5);
    setAsw(asd);
    console.log('asd', asw);
  };

  return (
    <View>
      <YesorNo
        DATA={[
          {
            dibaca: 'aa',
            arab: 'ss',
          },
          {
            dibaca: 'dd',
            arab: 'ff',
          },
        ]}
        pertanyaan={'aa'}
        Listener={(x) => console.log(x)}
      />
    </View>
  );
}

export default App; */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Main, Quiz} from './src/pages';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Quiz" component={Quiz} />
        </Stack.Navigator>
        <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
