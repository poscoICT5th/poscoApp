import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, StatusBar} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Move_first from './Move_first';
import Move_second from './Move_second';
import Move_third from './Move_third';

export default function TabViewExample() {
  const [moveList, setMoveList] = useState([]);
  //axios
  useEffect(() => {
    console.log('useeffect');
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

  const FirstRoute = () => <Move_first moveList={moveList} />;

  const SecondRoute = () => <Move_second moveList={moveList} />;
  const finish = () => (
    // <View style={[styles.scene, {backgroundColor: '#FFFFFF'}]} />
    <Move_third moveList={moveList} />
  );
  const initialLayout = {width: Dimensions.get('window').width};

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    3: finish,
  });

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'first', title: '이동예정'},
    {key: 'second', title: '이동중'},
    {key: '3', title: '이동완료'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
});
