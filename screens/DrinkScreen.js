import React, { useEffect, useState, useContext } from 'react';
import { View, Text, SafeAreaView, Image, ImageBackground, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
import productAction from '../redux/actions/productAction';
import marmolBackground from '../assets/fondoMarmol.jpg'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { DataContext } from "../DataProvider";

const DrinkScreen = (props) => {


    const values = useContext(DataContext);
    const addCarrito = values.addCarrito;
    const carrito = values.carrito;
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
            <ImageBackground source={marmolBackground} style={{ width: "100%", height: "100%" }} >
                <ScrollView>
                    {drinks.length === 0 ? 
                    <ActivityIndicator />
                 :
                 <>
                 <View style={{flex: 1, justifyContent: "space-around", alignItems: "center", flexDirection: "row", marginTop: '5%'}} >
                 <TextInput 
                     style={{ width: '50%', alignItems: "center", margin: '4%', fontSize: 19, borderColor: 'black', borderWidth: 2, borderRadius: 4, textAlign: 'center', fontWeight: 'bold', padding: '1%',}} 
                     placeholder="Busca un bebida..." 
                     onChange={(e) => filterProducts("search",drinks, e.nativeEvent.text)}
                     placeholderTextColor={'black'}
                 />
             <TouchableOpacity style={{backgroundColor: '#ca8a04', padding: '1.5%', boderRadius: 3}} onPress={() => handlePrice()}>
                 <Text style={{fontWeight: 'bold'}}>Precio{price ? <Entypo name="arrow-up" size={21} color="black" />: <Entypo name="arrow-down" size={18} color="black" />}</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{backgroundColor: '#ca8a04', padding: '2%', boderRadius: 3}} onPress={() => handleAlpha()}>
                 <Text style={{fontWeight: 'bold', marginRight: '1%'}}>{alpha ? "AZ": "ZA"}</Text>
             </TouchableOpacity>
             </View>
             <View>
                 <Text style={{flex: 1, fontSize: 20, fontWeight: 'bold'}}>{carrito.length}</Text>
             </View>
             <View>
                {auxiliar.length > 0 ?
                    auxiliar.map(drink => {
                        return <View 
                                key={drink._id} 
                                style={{ 
                                    justifyContent: 'center', 
                                    alignItems: 'center', 
                                    margin: '7%', 
                                    backgroundColor: '#ffffff76',
                                    shadowColor: '#171717',
                                    shadowOffset: {width: -2, height: 4},
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3, 
                                    borderRadius: 6, 
                                    padding: 15 
                            }}>
                            <View style={{ flexDirection: 'row'}}>
                            <Image source={{uri: drink.drinkImg}} style={{ width: 230, height: 300, marginBottom: '3%' }} />
                            <TouchableOpacity onPress={() => props.navigation.navigate('OneDrink', {params: drink._id})}>
                            <AntDesign name="infocirlce" size={28} color="#c8102e" />
                            </TouchableOpacity>
                            </View>
                            <Text style={{fontSize: 17, marginRight: '5%', fontWeight: '300'}}>{drink.drinkName}</Text>
                            <Text style={{marginRight: '5%', fontWeight: '400', fontSize: 17, marginTop: '2%'}}><Text style={{color: '#0d9488'}}>Precio</Text>:${drink.price}</Text>
                            <TouchableOpacity onPress={() => addCarrito(drink._id) } style={{marginRight: '5%' , backgroundColor: '#c8102e', padding: '2.5%', marginTop: '2.5%', borderRadius: 3}}>
                                <Text style={{fontWeight: '300', color: 'white', fontSize: 16}}>Agregar al carrito</Text>
                            </TouchableOpacity>
                        </View>
                    })
                    : 
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',marginTop: '20%',marginLeft: '5%', backgroundColor: '#c8102e', width: '90%', padding: 3}}>
                    <Text style={{fontSize: 25, color: 'white', fontWeight: '900'}}>No hay ese tipo de bebidas</Text>
                    </View>
                }
             </View>
             </>
                 }
                    
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
