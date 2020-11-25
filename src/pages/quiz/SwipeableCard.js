import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

export default class SwipeableCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RightText: false,
      LeftText: false,
      pan: new Animated.ValueXY(), // inits to zero
    };

    this.Card_Opacity = new Animated.Value(1);

    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: this.state.pan.x, // x,y are Animated.Value
            dy: this.state.pan.y,
          },
        ],
        {useNativeDriver: false},
      ),

      onPanResponderRelease: (evt, gestureState) => {
        if (
          gestureState.dx < SCREEN_WIDTH - 150 &&
          gestureState.dx > -SCREEN_WIDTH + 150
        ) {
          this.setState({
            LeftText: false,
            RightText: false,
          });
          Animated.spring(
            this.state.pan, // Auto-multiplexed
            {toValue: {x: 0, y: 0}, useNativeDriver: true}, // Back to zero
          ).start();
        } else if (gestureState.dx > SCREEN_WIDTH - 150) {
          Animated.parallel(
            [
              Animated.timing(this.state.pan, {
                toValue: {x: SCREEN_WIDTH, y: SCREEN_WIDTH},
                duration: 200,
                useNativeDriver: true,
              }),

              Animated.timing(this.Card_Opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }),
            ],
            {useNativeDriver: true},
          ).start(() => {
            this.setState({LeftText: false, RightText: false}, () => {
              this.props.removeCard();
            });
          });
        } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
          Animated.parallel(
            [
              Animated.timing(this.state.pan, {
                toValue: {x: -SCREEN_WIDTH, y: -SCREEN_WIDTH},
                duration: 200,
                useNativeDriver: true,
              }),

              Animated.timing(this.Card_Opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }),
            ],
            {useNativeDriver: true},
          ).start(() => {
            this.setState({LeftText: false, RightText: false}, () => {
              this.props.removeCard();
            });
          });
        }
      },
    });
  }

  render() {
    return (
      <Animated.View
        {...this.state.panResponder.panHandlers}
        style={[
          styles.card,
          this.state.pan.getTranslateTransform(),
          {
            opacity: this.Card_Opacity,
          },
        ]}>
        <Text style={styles.dibaca}>{this.props.item.dibaca}</Text>
        <Text style={styles.title}>{this.props.item.arab}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    height: SCREEN_HEIGHT - 355,
    width: SCREEN_WIDTH - 80,
    padding: 9,
    borderRadius: 15,
    position: 'absolute',
    borderColor: '#FFF',
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
  dibaca: {
    color: '#000',
    alignSelf: 'center',
  },
  title: {
    color: '#000',
    fontSize: 250,
    alignSelf: 'center',
  },
});
