import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DrinkImage from '../assets/Gin.png'
import BackgroundImage from '../assets/fondoMarmol.jpg'

const MainScreen = ({navigation}) => {


    return (
      <ImageBackground source={BackgroundImage} style={{width: '100%', height: '100%'}}>
      <SafeAreaView style={styles.container}>
      <View style={{marginTop:20}}>
        <Text style={styles.title}>LUXURY DRINKS</Text>
      </View>
      <View style={styles.containerImg}>
      <Image source={DrinkImage}  style={styles.image} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, textShadowColor: 'rgba(0, 0, 0, 0.30)',
                      textShadowOffset: {width: 0, height: 0},
                      textShadowRadius: 10}}>Elegi la que mas te guste</Text>
        <AntDesign name="right" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
      </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize:30,
      fontWeight: 'bold',
      color: 'black'
    },
    button: {
      backgroundColor: 'red',
      padding: 20,
      width: '90%',
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 50
    },
    image: {
      width: 300,
      height:300,
      transform: [{ rotate: '-15deg' }]
    },
    containerImg: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export default MainScreen;