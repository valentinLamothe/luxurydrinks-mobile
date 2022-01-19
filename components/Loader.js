import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import LottieView from 'lottie-react-native';

const Loader = () => {
  return (
        <LottieView style={{flex:1}} source={require('../assets/loadingPosta.json')} autoplay loop/>
  );
};

export default Loader;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
