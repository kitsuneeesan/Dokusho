import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  View,
  TouchableOpacity,
} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

export default class BasicQuest extends React.Component {
  constructor(props) {
    super(props);
    this.shakeAnimation = new Animated.Value(0);
    this.state = {
      ass: this.props.DATA,
      Correct: '#fff',
      unCorrect: '#fff',
      asw: false,
      pertanyaan: '',
    };
  }

  componentDidMount() {
    this.state.ass.sort(() => Math.random() - 0.5);
  }

  Correct = () => {
    this.setState({Correct: '#4ee44e', asw: true});
    this.props.next();
  };

  unCorrect = () => {
    this.setState({unCorrect: 'red', asw: false});
    setTimeout(() => {
      this.setState({unCorrect: '#fff'});
    }, 1000);

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
    return (
      <View style={styles.MC2}>
        <View style={styles.cardQ}>
          <Text
            style={styles.dibaca}
            onTextLayout={(x) =>
              this.setState({pertanyaan: x.nativeEvent.lines[0].text})
            }>
            {this.props.Pertanyaan}
          </Text>
          <Text style={styles.Qtitle}>
            {this.state.asw ? this.props.jawabanBetul : '?'}
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={
              this.state.ass[0].dibaca == this.state.pertanyaan
                ? () => this.Correct()
                : () => this.unCorrect()
            }>
            <Animated.View
              style={
                this.state.ass[0].dibaca == this.state.pertanyaan
                  ? [
                      styles.box1,
                      {
                        borderColor: this.state.Correct,
                      },
                    ]
                  : [
                      styles.box1,
                      {
                        borderColor: this.state.unCorrect,
                        transform: [{translateX: this.shakeAnimation}],
                      },
                    ]
              }>
              <Text style={styles.Atitle}>{this.state.ass[0].arab}</Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              this.state.ass[1].dibaca == this.state.pertanyaan
                ? () => this.Correct()
                : () => this.unCorrect()
            }>
            <Animated.View
              style={
                this.state.ass[1].dibaca == this.state.pertanyaan
                  ? [
                      styles.box1,
                      {
                        borderColor: this.state.Correct,
                      },
                    ]
                  : [
                      styles.box1,
                      {
                        borderColor: this.state.unCorrect,
                        transform: [{translateX: this.shakeAnimation}],
                      },
                    ]
              }>
              <Text style={styles.Atitle}>{this.state.ass[1].arab}</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardQ: {
    backgroundColor: '#fff',
    height: SCREEN_HEIGHT - 340,
    width: '100%',
    padding: 9,
    marginBottom: 30,
    borderRadius: 15,
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
  Qtitle: {
    color: '#394249',
    top: 22,
    fontSize: 200,
    fontFamily: 'Morn',
    alignSelf: 'center',
  },
  Atitle: {
    color: '#394249',
    fontSize: 80,
    alignSelf: 'center',
  },
  MC2: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dibaca: {
    color: '#000',
    alignSelf: 'center',
  },
  box1: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 0.9,
    margin: 5,
    justifyContent: 'center',
    width: SCREEN_WIDTH / 2 - 35,
    height: 160,
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
});
