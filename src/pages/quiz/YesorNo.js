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

export default class YesorNo extends React.Component {
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

/* import React from "react";
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

class AnsBtn extends React.Component {
  constructor(props) {
      super(props);
      this.shakeAnimation = new Animated.Value(0);
      this.state = {
        Correct : '#fff',
        unCorrect : '#fff',
        Listener:1,
        fakebtn:false,
      };
  }

  Correct = () => {
    this.setState({Correct: '#4ee44e',fakebtn:true});
    this.props.Listener(this.state.Listener);
  }

  unCorrect = () => {
      this.setState({unCorrect: 'red'});
      Animated.sequence([
        Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(this.shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(this.shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
      ]).start();
   }

  render(){
    if(this.state.fakebtn){
      return (
      <Animated.View style={
        this.props.jawaban?
        [styles.Abox3, {borderColor: this.props.jawaban?this.state.Correct:this.state.unCorrect }]
        :[styles.Abox3, {borderColor: this.state.unCorrect, transform: [{translateX: this.shakeAnimation}]}]
      }>
        <Text style={styles.Qtitle3}>{this.props.text}</Text>
      </Animated.View>
      );
    }else{
      return (
        <TouchableOpacity onPress={this.props.jawaban?() => this.Correct():()=>this.unCorrect()}>
          <Animated.View style={
              this.props.jawaban?
              [styles.Abox3, {borderColor: this.props.jawaban?this.state.Correct:this.state.unCorrect }]
              :[styles.Abox3, {borderColor: this.state.unCorrect, transform: [{translateX: this.shakeAnimation}]}]
            }>
              <Text style={styles.Qtitle3}>{this.props.text}</Text>
          </Animated.View>
        </TouchableOpacity>
      );
    }
  }
}

export default class YesorNo extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <View style={styles.MC3}>
        <View style={styles.cardQ3}>
          <Text style={styles.Qtitle3}>{this.props.kambing1} adalah {this.props.kambing2}</Text>
        </View>

        <View style={styles.btnCon3}>
          <AnsBtn
            jawaban={this.props.jawabanA}
            text={'Ya'}
            Listener={this.props.Listener}
          />
          <AnsBtn
            jawaban={this.props.jawabanB}
            text={'Bukan'}
            Listener={this.props.Listener}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnCon3:{
    flexDirection:'row',
    marginBottom:25
  }, 
  cardQ3:{
    justifyContent:'center',
    backgroundColor:'#fff',
    borderRadius:15,
    marginBottom:15,
    width:SCREEN_WIDTH-50,
    height:70,
    borderColor:'#fff',
    borderWidth:0.9,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Abox3:{
    backgroundColor:'#fff',
    borderRadius:15,
    borderWidth:0.9,
    margin:5,
    justifyContent:'center',
    width:SCREEN_WIDTH/2-35,
    height:60,
    borderWidth:0.9,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  Qtitle3:{
    color:'#394249',
    fontSize:20,
    fontFamily:'Morn',
    alignSelf:'center',
  },
  MC3: {
    backgroundColor: '#fff',
    paddingHorizontal:30,
    alignItems:'center',
    justifyContent:'center',
  },
}); */
