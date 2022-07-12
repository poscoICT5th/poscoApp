import React, {useEffect, useState} from 'react';
import {Animated, View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Move_first from './Move_first';
import Move_second from './Move_second';
import Move_third from './Move_third';
import axios from 'axios';
import MoveModal from './MoveModal';
import { NativeBaseProvider } from 'native-base';
import Stagger1 from './Stagger1';
const Move = props => {
  const [moveList, setMoveList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  //axios
  useEffect(() => {
    axios.defaults.baseURL = 'http://35.77.44.58:8080/move';
    axios
      .get('/move')
      .then(res => {
        setMoveList(res.data);
        console.log(res.data);
        // first();
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const FirstRoute = () => (
    <Move_first moveList={moveList} style={{backgroundColor: '#ffffff'}} />
  );
  const SecondRoute = () => <Move_second moveList={moveList} />;
  const ThirdRoute = () => (
    <Move_third
      moveList={moveList}
      style={[styles.container, {backgroundColor: '#ffffff'}]}
    />
  );
  const [state, setState] = useState({
    index: 0,
    routes: [
      {key: 'first', title: '이동예정'},
      {key: 'second', title: '이동중'},
      {key: 'third', title: '이동완료'},
    ],
  });
  _handleIndexChange = index => setState({...state, index: index});

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => setState({...state, index: i})}>
              <Animated.Text style={{opacity}}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (


    <TabView
      navigationState={state}
      renderScene={_renderScene}
      renderTabBar={_renderTabBar}
      onIndexChange={_handleIndexChange}
      />

     
  );
};
export default Move;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'gray.300',
    
  },
});
