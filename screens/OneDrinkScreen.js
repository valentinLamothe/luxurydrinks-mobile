import { View, Text, SafeAreaView, Image, ImageBackground } from 'react-native'
import { useEffect, useState } from 'react';
import productAction from '../redux/actions/productAction';
import { connect } from "react-redux";
import LadrilloBackground from '../assets/fondoLadrillo.jpg'



const OneDrinkScreen = (props) => {

  const { drinks, fetchProducts, route } = props;

  const id = route.params.params;

  useEffect(() =>{
    fetchProducts();
  }, []);

  const currentGin = drinks.find(drink => drink._id === id)

    return (
        <SafeAreaView>
            <ImageBackground source={LadrilloBackground} style={{height: '100%', width: '100%'}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 30, fontWeight: '900', marginBottom: '15%', color: '#c8102e'}}>Detalle de la bebida</Text>
                    <Image source={{uri: currentGin.drinkImg}} 
                    style={{
                        width: 350,
                        height: 350,
                        marginBottom: '5%' }} 
                    />
                <Text style={{fontWeight: 'bold', fontSize: 22, marginBottom: '2%'}}>{currentGin.drinkName}</Text>
                <Text style={{fontSize: 20, marginBottom: '2%', fontWeight: '900'}}>$ {currentGin.price}</Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Stock: {currentGin.stock}</Text> 
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