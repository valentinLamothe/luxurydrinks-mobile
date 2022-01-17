import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, ImageBackground, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from "react-redux";
import productAction from '../redux/actions/productAction';


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


    const bodyBackground = { uri: "https://i.imgur.com/Hg8tLfI.jpg" };

    return (
        <SafeAreaView>
            <ScrollView>
                <ImageBackground source={bodyBackground} style={{ width: "100%", height: "100%" }} >
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}} >
                        <TextInput 
                            style={{ flex: 1, justifyContent: "center", width: '50%', alignItems: "center", textAlign: "center" }} 
                            placeholder="Busca un bebida..." 
                            onChange={(e) => filterProducts("search",drinks, e.nativeEvent.text)}
                        />
                    </View>
                    <TouchableOpacity onPress={() => handlePrice()}>
                        <Text>Precio{price ? "⬆": "⬇"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAlpha()}>
                        <Text>{alpha ? "AZ": "ZA"}</Text>
                    </TouchableOpacity>
                    <View>
                        {auxiliar.map(drink => {
                            return <View key={drink._id} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{uri: drink.drinkImg}} style={{ width: 200, height: 200 }} />
                                <Text>{drink.drinkName}</Text>
                            </View>

                        })}
                    </View>
                </ImageBackground>
            </ScrollView>
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
