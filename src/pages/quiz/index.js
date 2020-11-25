import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {connect} from 'react-redux';

import {
  MainApalau,
  YesorNo,
  SwipeableCard,
  BasicQuest,
  Love,
} from './combineQuiz';

var db = openDatabase({name: 'user_db.db', createFromLocation: 1});

const mapStateToProps = (state) => ({
  dbmateri: state.Main.materi,
});

class myQuiz extends Component {
  constructor() {
    super();
    this.state = {
      DATA: [],
      persen: 1,
      listener: 1,
      YesorNoListener: 1,
    };
  }

  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ' + this.props.dbmateri + ' ORDER BY id DESC ',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          this.setState({DATA: temp});
        },
      );
    });
    console.log(this.state.DATA);
  }

  next = () => {
    setTimeout(() => {
      this.setState({listener: this.state.listener + 1});
    }, 500);
  };

  removeCard = (id) => {
    console.log(id);
    if (id == 2) {
      setTimeout(() => {
        this.setState({listener: this.state.listener + 1});
      }, 100);
    }
    if (id == 4) {
      setTimeout(() => {
        this.setState({listener: this.state.listener + 1});
      }, 100);
    }
    if (id == 5) {
      setTimeout(() => {
        this.setState({listener: this.state.listener + 1});
      }, 100);
    }
  };

  YesorNoListener = (x) => {
    this.setState({YesorNoListener: this.state.YesorNoListener + x});
    this.state.YesorNoListener == 2
      ? setTimeout(() => {
          this.setState({listener: this.state.listener + 1});
        }, 500)
      : null;
    this.state.YesorNoListener == 4
      ? setTimeout(() => {
          this.setState({listener: this.state.listener + 1});
        }, 500)
      : null;
    this.state.YesorNoListener == 6
      ? setTimeout(() => {
          this.setState({listener: this.state.listener + 1});
        }, 500)
      : null;
  };

  Quiz4Listener = (x) => {
    x
      ? setTimeout(() => {
          this.setState({listener: this.state.listener + 1});
        }, 500)
      : null;
  };

  render() {
    switch (this.state.listener) {
      case 1:
        return (
          <View style={styles.MainContainer}>
            {this.state.DATA.slice(3, 5).map((item, key) => (
              <SwipeableCard
                key={key}
                item={item}
                removeCard={this.removeCard.bind(this, item.id)}
              />
            ))}
            <Text style={styles.info}>Geser Untuk Melanjutkan</Text>
          </View>
        );
        break;
      case 2:
        return (
          <BasicQuest
            DATA={[
              {
                dibaca: this.state.DATA[4].dibaca,
                arab: this.state.DATA[4].arab,
              },
              {
                dibaca: this.state.DATA[3].dibaca,
                arab: this.state.DATA[3].arab,
              },
            ]}
            Pertanyaan={this.state.DATA[4].dibaca}
            jawabanBetul={this.state.DATA[4].arab}
            next={() => this.next()}
          />
        );
        break;
      case 3:
        return (
          <View style={styles.MainContainer}>
            {this.state.DATA.slice(1, 3).map((item, key) => (
              <SwipeableCard
                key={key}
                item={item}
                removeCard={this.removeCard.bind(this, item.id)}
              />
            ))}
            <Text style={styles.info}>Geser Untuk Melanjutkan</Text>
          </View>
        );
        break;
      case 4:
        return (
          <BasicQuest
            DATA={[
              {
                dibaca: this.state.DATA[3].dibaca,
                arab: this.state.DATA[3].arab,
              },
              {
                dibaca: this.state.DATA[2].dibaca,
                arab: this.state.DATA[2].arab,
              },
            ]}
            Pertanyaan={this.state.DATA[2].dibaca}
            jawabanBetul={this.state.DATA[2].arab}
            next={() => this.next()}
          />
        );
        break;
      case 5:
        return (
          <View style={styles.MainContainer}>
            <YesorNo
              DATA={[
                {
                  dibaca: this.state.DATA[4].dibaca,
                  arab: this.state.DATA[4].arab,
                },
                {
                  dibaca: this.state.DATA[2].dibaca,
                  arab: this.state.DATA[2].arab,
                },
              ]}
              pertanyaan={this.state.DATA[4].dibaca}
              Listener={(x) => this.YesorNoListener(x)}
            />
            <YesorNo
              DATA={[
                {
                  dibaca: this.state.DATA[3].dibaca,
                  arab: this.state.DATA[3].arab,
                },
                {
                  dibaca: this.state.DATA[2].dibaca,
                  arab: this.state.DATA[2].arab,
                },
              ]}
              pertanyaan={this.state.DATA[2].dibaca}
              Listener={(x) => this.YesorNoListener(x)}
            />
          </View>
        );
        break;
      case 6:
        return (
          <BasicQuest
            DATA={[
              {
                dibaca: this.state.DATA[2].dibaca,
                arab: this.state.DATA[2].arab,
              },
              {
                dibaca: this.state.DATA[1].dibaca,
                arab: this.state.DATA[1].arab,
              },
            ]}
            Pertanyaan={this.state.DATA[1].dibaca}
            jawabanBetul={this.state.DATA[1].arab}
            next={() => this.next()}
          />
        );
        break;
      case 7:
        return (
          <View style={styles.MainContainer}>
            <MainApalau
              berapa={(x) => this.Quiz4Listener(x)}
              jawabanDZ1={this.state.DATA[2].arab}
              jawabanDZ2={this.state.DATA[4].arab}
              jawabanDZ3={this.state.DATA[3].arab}
              jawabanDZ4={this.state.DATA[1].arab}
              pertanyaanDZ1={this.state.DATA[2].dibaca}
              pertanyaanDZ2={this.state.DATA[4].dibaca}
              pertanyaanDZ3={this.state.DATA[3].dibaca}
              pertanyaanDZ4={this.state.DATA[1].dibaca}
            />
          </View>
        );
        break;
      case 8:
        return (
          <View style={styles.MainContainer}>
            {this.state.DATA.slice(0, 1).map((item, key) => (
              <SwipeableCard
                key={key}
                item={item}
                removeCard={this.removeCard.bind(this, item.id)}
              />
            ))}
            <Text style={styles.info}>Geser Untuk Melanjutkan</Text>
          </View>
        );
        break;
      case 9:
        return (
          <BasicQuest
            DATA={[
              {
                dibaca: this.state.DATA[4].dibaca,
                arab: this.state.DATA[4].arab,
              },
              {
                dibaca: this.state.DATA[1].dibaca,
                arab: this.state.DATA[1].arab,
              },
            ]}
            Pertanyaan={this.state.DATA[1].dibaca}
            jawabanBetul={this.state.DATA[1].arab}
            next={() => this.next()}
          />
        );
        break;
      case 10:
        return (
          <View style={styles.MainContainer}>
            <YesorNo
              DATA={[
                {
                  dibaca: this.state.DATA[0].dibaca,
                  arab: this.state.DATA[0].arab,
                },
                {
                  dibaca: this.state.DATA[1].dibaca,
                  arab: this.state.DATA[1].arab,
                },
              ]}
              pertanyaan={this.state.DATA[0].dibaca}
              Listener={(x) => this.YesorNoListener(x)}
            />
            <YesorNo
              DATA={[
                {
                  dibaca: this.state.DATA[4].dibaca,
                  arab: this.state.DATA[4].arab,
                },
                {
                  dibaca: this.state.DATA[1].dibaca,
                  arab: this.state.DATA[1].arab,
                },
              ]}
              pertanyaan={this.state.DATA[1].dibaca}
              Listener={(x) => this.YesorNoListener(x)}
            />
          </View>
        );
        break;
      case 11:
        return (
          <BasicQuest
            DATA={[
              {
                dibaca: this.state.DATA[4].dibaca,
                arab: this.state.DATA[4].arab,
              },
              {
                dibaca: this.state.DATA[0].dibaca,
                arab: this.state.DATA[0].arab,
              },
            ]}
            Pertanyaan={this.state.DATA[0].dibaca}
            jawabanBetul={this.state.DATA[0].arab}
            next={() => this.next()}
          />
        );
        break;
      case 12:
        return (
          <View style={styles.MainContainer}>
            <MainApalau
              berapa={(x) => this.Quiz4Listener(x)}
              jawabanDZ1={this.state.DATA[1].arab}
              jawabanDZ2={this.state.DATA[0].arab}
              jawabanDZ3={this.state.DATA[3].arab}
              jawabanDZ4={this.state.DATA[2].arab}
              pertanyaanDZ1={this.state.DATA[1].dibaca}
              pertanyaanDZ2={this.state.DATA[0].dibaca}
              pertanyaanDZ3={this.state.DATA[3].dibaca}
              pertanyaanDZ4={this.state.DATA[2].dibaca}
            />
          </View>
        );
        break;
      case 13:
        return (
          <View style={styles.MainContainer}>
            <YesorNo
              DATA={[
                {
                  dibaca: this.state.DATA[3].dibaca,
                  arab: this.state.DATA[3].arab,
                },
                {
                  dibaca: this.state.DATA[2].dibaca,
                  arab: this.state.DATA[2].arab,
                },
              ]}
              pertanyaan={this.state.DATA[2].dibaca}
              Listener={(x) => this.YesorNoListener(x)}
            />
            <YesorNo
              DATA={[
                {
                  dibaca: this.state.DATA[1].dibaca,
                  arab: this.state.DATA[1].arab,
                },
                {
                  dibaca: this.state.DATA[3].dibaca,
                  arab: this.state.DATA[3].arab,
                },
              ]}
              pertanyaan={this.state.DATA[3].dibaca}
              Listener={(x) => this.YesorNoListener(x)}
            />
          </View>
        );
        break;
      case 14:
        return (
          <View style={styles.MainContainer}>
            <MainApalau
              berapa={(x) => this.Quiz4Listener(x)}
              jawabanDZ1={this.state.DATA[3].arab}
              jawabanDZ2={this.state.DATA[0].arab}
              jawabanDZ3={this.state.DATA[2].arab}
              jawabanDZ4={this.state.DATA[1].arab}
              pertanyaanDZ1={this.state.DATA[3].dibaca}
              pertanyaanDZ2={this.state.DATA[0].dibaca}
              pertanyaanDZ3={this.state.DATA[2].dibaca}
              pertanyaanDZ4={this.state.DATA[1].dibaca}
            />
          </View>
        );
        break;
      case 15:
        return <Love />;
        break;
      default:
        if (this.state.DATA == null) {
          return <Text>NO DATA</Text>;
        } else {
          console.log(this.state.DATA);
          /* setTimeout(() => {
            this.setState({listener: 5});
          }, 800); */
          return <Text>LOAD</Text>;
        }
        break;
    }
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    color: '#000',
    position: 'relative',
    fontSize: 16,
    top: 210,
  },
});

export default connect(mapStateToProps, null)(myQuiz);
