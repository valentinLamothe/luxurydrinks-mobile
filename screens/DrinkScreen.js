import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, ImageBackground, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from "react-redux";
import productAction from '../redux/actions/productAction';
import LadrilloBackground from '../assets/fondoLadrillo.jpg'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';



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
                            style={{ width: '50%', alignItems: "center", margin: '4%', fontSize: 19, borderColor: 'black', borderWidth: 2, borderRadius: 4, textAlign: 'center', fontWeight: 'bold', padding: '1%',}} 
                            placeholder="Busca un bebida..." 
                            onChange={(e) => filterProducts("search",drinks, e.nativeEvent.text)}
                            placeholderTextColor={'black'}
                        />
                    <TouchableOpacity style={{backgroundColor: '#ca8a04', padding: '1.5%', borderRadius: '3%'}} onPress={() => handlePrice()}>
                        <Text style={{fontWeight: 'bold'}}>Precio{price ? <Entypo name="arrow-up" size={21} color="black" />: <Entypo name="arrow-down" size={18} color="black" />}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#ca8a04', padding: '2%', borderRadius: '3%'}} onPress={() => handleAlpha()}>
                        <Text style={{fontWeight: 'bold', marginRight: '1%'}}>{alpha ? "AZ": "ZA"}</Text>
                    </TouchableOpacity>
                    </View>
                    
                    <View>
                        {auxiliar.map(drink => {
                            return <View key={drink._id} style={{ justifyContent: 'center', alignItems: 'center', margin: '7%' }}>
                                <View style={{ flexDirection: 'row'}}>
                                <Image source={{uri: drink.drinkImg}} style={{ width: 200, height: 200, marginBottom: '3%' }} />
                                <TouchableOpacity onPress={() => props.navigation.navigate('OneDrink', {params: drink._id})}>
                                <AntDesign name="infocirlce" size={28} color="#c8102e" />
                                </TouchableOpacity>
                                </View>
                                <Text style={{fontSize: 17, marginRight: '5%', fontWeight: '300'}}>{drink.drinkName}</Text>
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
