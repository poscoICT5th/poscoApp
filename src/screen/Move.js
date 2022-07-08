import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, StatusBar} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Move_first from './Move_first';

export default function TabViewExample() {
  const FirstRoute = () => (
    // <View style={[styles.scene, { backgroundColor: '#ffffff' }]}/>
<Move_first/>
  );

  const SecondRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
  );
  const finish = () => (
    <View style={[styles.scene, {backgroundColor: '#FFFFFF'}]} />
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
