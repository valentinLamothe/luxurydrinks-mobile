import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, ImageBackground, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from "react-redux";
import productAction from '../redux/actions/productAction';
import LadrilloBackground from '../assets/fondoLadrillo.jpg'


const DrinkScreen = (props) => {

    const [price, setPrice] = useState(false)
    const [alpha, setAlpha] = useState(false)
    const { filterProducts, getDrinks, auxiliar, loading, drinks } = props;

    useEffect(() => {
        getDrinks()
    }, [])

    const handlePrice = () => {
        setPrice(!price)
        filterProducts("price", drinks, price)
      }
      const handleAlpha = () => {
        setAlpha(!alpha)
        filterProducts("alpha", drinks, alpha)
      }

    return (
        <SafeAreaView>
            <ImageBackground source={LadrilloBackground} style={{ width: "100%", height: "100%" }} >
                <ScrollView>
                    <View style={{flex: 1, justifyContent: "space-around", alignItems: "center", flexDirection: "row", marginTop: '5%'}} >
                        <TextInput 
                            style={{ flex: 1, width: '50%', alignItems: "center", margin: '4%', fontSize: 19, borderColor: 'black', borderWidth: '2px', borderRadius: 3, textAlign: 'center'}} 
                            placeholder="Busca un bebida..." 
                            onChange={(e) => filterProducts("search",drinks, e.nativeEvent.text)}
                            placeholderTextColor={'black'}
                        />
                    <TouchableOpacity onPress={() => handlePrice()}>
                        <Text style={{fontWeight: 'bold'}}>Precio{price ? "⬆": "⬇"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAlpha()}>
                        <Text style={{fontWeight: 'bold'}}>{alpha ? "AZ": "ZA"}</Text>
                    </TouchableOpacity>
                    </View>
                    
                    <View>
                        {auxiliar.map(drink => {
                            return <View key={drink._id} style={{ justifyContent: 'center', alignItems: 'center', margin: '5%' }}>
                                <Image source={{uri: drink.drinkImg}} style={{ width: 200, height: 200, marginBottom: '3%' }} />
                                <Text style={{fontSize: 17}}>{drink.drinkName}</Text>
                            </View>
                        })}
                    </View>
                    </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        drinks: state.productsReducer.products,
        loading: state.productsReducer.loading,
        auxiliar: state.productsReducer.auxiliar,
    }
}

const mapDispatchToProps = {
    getDrinks: productAction.fetchProducts,
    filterProducts: productAction.filterProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(DrinkScreen)
