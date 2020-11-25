import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';

const {height: SCREEN_HEIGHT} = Dimensions.get('screen');
const {width: SCREEN_WIDTH} = Dimensions.get('window');

class Draggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1),
      listener: 1,
    };

    this.panResponder = PanResponder.create({
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

      onPanResponderRelease: (e, gesture) => {
        if (this.props.DZ(gesture)) {
          Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() =>
            this.setState({
              showDraggable: false,
            }),
          );
          this.props.Listener(this.state.listener);
        } else {
          Animated.spring(
            this.state.pan, // Auto-multiplexed
            {toValue: {x: 0, y: 0}, useNativeDriver: true}, // Back to zero
          ).start();
        }
      },
    });
  }

  render() {
    return (
      <View style={{width: 80, height: 80}}>{this.renderDraggable()}</View>
    );
  }

  renderDraggable() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };
    if (this.state.showDraggable) {
      return (
        <View style={{position: 'absolute', elevation: 5}}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.circle, {opacity: this.state.opacity}]}>
            <Text style={styles.textCir}>{this.props.jawabanBetul}</Text>
          </Animated.View>
        </View>
      );
    }
  }
}

class DropZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Correct: '#4ee44e',
      unCorrect: '#fff',
    };
  }

  setDropZoneValues(event) {
    return this.props.DZvalue(event.nativeEvent.layout);
  }

  render() {
    return (
      <View
        onLayout={this.setDropZoneValues.bind(this)}
        style={[
          styles.dropZone,
          this.props.betulGak
            ? {borderColor: this.state.Correct}
            : {borderColor: this.state.unCorrect},
        ]}>
        <Text style={styles.dibaca}>{this.props.pertanyaan}</Text>
        <Text style={styles.text}>
          {this.props.betulGak ? this.props.jawabanBetul : '?'}
        </Text>
      </View>
    );
  }
}

export default class MainApalau extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listener: 1,
      BDC1: false,
      BDC2: false,
      BDC3: false,
      BDC4: false,
      DZV1X: true,
      DZV1S: null,
      DZV2X: true,
      DZV2S: null,
      DZV3X: true,
      DZV3S: null,
      DZV4X: true,
      DZV4S: null,
      pan: new Animated.ValueXY(),
    };
  }

  DZV1(gesture) {
    if (this.state.DZV1X) {
      console.log('red => ', this.state.DZV1X);
      console.log('red => ', gesture);
      this.setState({DZV1X: false, DZV1S: gesture});
    } else {
      let dz = this.state.DZV1S;
      let uji =
        gesture.moveY > dz.y &&
        gesture.moveY < dz.y + dz.height &&
        gesture.moveX > dz.x &&
        gesture.moveX < dz.x + dz.width;
      if (uji) {
        this.setState({BDC1: true});
      }
      return uji;
    }
  }

  DZV2(gesture) {
    if (this.state.DZV2X) {
      console.log('green => ', this.state.DZV2X);
      console.log('green => ', gesture);
      this.setState({DZV2X: false, DZV2S: gesture});
    } else {
      let dz = this.state.DZV2S;
      let uji =
        gesture.moveY > dz.y &&
        gesture.moveY < dz.y + dz.height &&
        gesture.moveX > dz.x &&
        gesture.moveX < dz.x + dz.width;
      if (uji) {
        this.setState({BDC2: true});
      }
      return uji;
    }
  }

  DZV3(gesture) {
    if (this.state.DZV3X) {
      console.log('orange => ', this.state.DZV3X);
      console.log('orange => ', gesture);
      this.setState({DZV3X: false, DZV3S: gesture});
    } else {
      let dz = this.state.DZV3S;
      let baris2 = 180;
      let uji =
        gesture.moveY > baris2 &&
        gesture.moveY < baris2 + dz.height &&
        gesture.moveX > dz.x &&
        gesture.moveX < dz.x + dz.width;
      if (uji) {
        this.setState({BDC3: true});
      }
      return uji;
    }
  }

  DZV4(gesture) {
    if (this.state.DZV4X) {
      console.log('blue => ', this.state.DZV4X);
      console.log('blue => ', gesture);
      this.setState({DZV4X: false, DZV4S: gesture});
    } else {
      let dz = this.state.DZV4S;
      let baris2 = 180;
      let uji =
        gesture.moveY > baris2 &&
        gesture.moveY < baris2 + dz.height &&
        gesture.moveX > dz.x &&
        gesture.moveX < dz.x + dz.width;
      if (uji) {
        this.setState({BDC4: true});
      }
      return uji;
    }
  }

  Listener(x) {
    this.setState({listener: this.state.listener + x});
    console.log(this.state.listener);
    if (this.state.listener === 4) {
      return this.props.berapa(true);
    } else {
      return this.props.berapa(false);
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.rowDZ}>
          <DropZone
            DZvalue={(x) => this.DZV1(x)}
            betulGak={this.state.BDC1}
            pertanyaan={this.props.pertanyaanDZ1}
            jawabanBetul={this.props.jawabanDZ1}
          />
          <DropZone
            DZvalue={(x) => this.DZV2(x)}
            betulGak={this.state.BDC2}
            pertanyaan={this.props.pertanyaanDZ2}
            jawabanBetul={this.props.jawabanDZ2}
          />
        </View>
        <View style={styles.rowDZ}>
          <DropZone
            DZvalue={(x) => this.DZV3(x)}
            betulGak={this.state.BDC3}
            pertanyaan={this.props.pertanyaanDZ3}
            jawabanBetul={this.props.jawabanDZ3}
          />
          <DropZone
            DZvalue={(x) => this.DZV4(x)}
            betulGak={this.state.BDC4}
            pertanyaan={this.props.pertanyaanDZ4}
            jawabanBetul={this.props.jawabanDZ4}
          />
        </View>
        <View style={styles.ballContainer} />
        <View style={styles.row}>
          <Draggable
            DZ={(x) => this.DZV2(x)}
            Listener={(x) => this.Listener(x)}
            jawabanBetul={this.props.jawabanDZ2}
          />
          <Draggable
            DZ={(x) => this.DZV4(x)}
            Listener={(x) => this.Listener(x)}
            jawabanBetul={this.props.jawabanDZ4}
          />
          <Draggable
            DZ={(x) => this.DZV3(x)}
            Listener={(x) => this.Listener(x)}
            jawabanBetul={this.props.jawabanDZ3}
          />
          <Draggable
            DZ={(x) => this.DZV1(x)}
            Listener={(x) => this.Listener(x)}
            jawabanBetul={this.props.jawabanDZ1}
          />
        </View>
      </View>
    );
  }
}

let CIRCLE_RADIUS = 35;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  ballContainer: {
    height: 150,
  },
  circle: {
    justifyContent: 'center',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 0.9,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dropZone: {
    height: 160,
    width: SCREEN_WIDTH / 2 - 20,
    borderRadius: 15,
    margin: 10,
    padding: 9,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 0.9,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  rowDZ: {
    flexDirection: 'row',
  },
  text: {
    color: '#394249',
    fontSize: 55,
    fontFamily: 'Morn',
    top: 25,
  },
  dibaca: {
    color: '#000',
    alignSelf: 'center',
  },
  textCir: {
    color: '#394249',
    alignSelf: 'center',
    fontSize: 25,
  },
});
