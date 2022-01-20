import { View, Text, SafeAreaView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react';
import productAction from '../redux/actions/productAction';
import { connect } from "react-redux";
import marmolBackground from '../assets/fondoMarmol.jpg'



const OneDrinkScreen = (props) => {

  const { drinks, fetchProducts, route } = props;

  const id = route.params.params;

  useEffect(() =>{
    fetchProducts();
  }, []);

  const currentGin = drinks.find(drink => drink._id === id)

    return (
        <SafeAreaView>
            <ImageBackground source={marmolBackground} style={{height: '100%', width: '100%'}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 30, fontWeight: '900', marginBottom: '5%', marginTop: '3%', color: '#c8102e'}}>Detalle de la bebida</Text>
                    <Image source={{uri: currentGin.drinkImg}} 
                    style={{
                        width: 350,
                        height: 350,
                        marginBottom: '3%' }} 
                    />
                <Text style={{fontWeight: 'bold', fontSize: 22, marginBottom: '2%'}}>{currentGin.drinkName}</Text>
                <Text style={{fontSize: 20, marginBottom: '2%', fontWeight: '900'}}>$ {currentGin.price}</Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Unidades: {currentGin.stock}</Text> 
                <TouchableOpacity onPress={() => props.navigation.navigate('Inicio')} style={{backgroundColor:'#c8102e', padding: '5%', borderRadius: 5, marginTop: '14%'}}>
                  <Text style={{color: 'white', fontSize: 20, fontWeight: '900'}}>Volver al sitio</Text>
                </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )    
}

const mapStateToProps = (state) => {
    return {
      drinks: state.productsReducer.products,
    };
  };
  
  const mapDispatchToProps = {
    fetchProducts: productAction.fetchProducts,
  };

export default connect(mapStateToProps, mapDispatchToProps)(OneDrinkScreen);