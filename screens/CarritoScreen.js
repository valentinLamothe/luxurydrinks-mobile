import { View, Text, SafeAreaView, Alert, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useContext } from "react";
import { DataContext } from "../DataProvider";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import MarmolBackground from '../assets/fondoMarmol.jpg'

const CarritoScreen = () => {

    const value = useContext(DataContext);
    const [carrito, setCarrito] = value.carrito;
    const [total] = value.total;

    console.log('entro a la screen de carrito');
    console.log('carritoScreen', carrito);


    const stockActualizado = (producto) => {
        const res = producto.stock - producto.quantity;
        if (res > 5) {
            return res;
        } else if (res <= 5 && res > 0) {
            return " " + res + " Ultimas unidades!!";
        } else {
            return " Sin stock";
        }
    };
    const reduce = (id) => {
        carrito.forEach((item) => {
            if (item._id === id) {
                item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
            }
            setCarrito([...carrito]);
        });
    };
    const increase = (id) => {
        carrito.forEach((item) => {
            if (item._id === id && item.stock > item.quantity) {
                item.quantity += 1;
            }
            setCarrito([...carrito]);
        });
    };

    const removeProducto = (id) => {
            carrito.forEach((item, index) => {
                if (item._id === id) {
                    item.quantity = 1;
                    carrito.splice(index, 1);
                }
            });
            setCarrito([...carrito]);
    };
    

    const vaciarCarrito = () => {
                carrito.splice(0, carrito.length);
                setCarrito([...carrito]);
    };
    

    return (
        <SafeAreaView>
                <ImageBackground
                    source={MarmolBackground}
                    style={{ width: '100%', height: '100%' }}
                >
            <ScrollView>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{fontSize: 25, fontWeight: '900', margin: '5%'}}>
                        Carrito de compras
                    </Text>
                </View>
                    <View>
                        {carrito.length === 0 ? (
                            <View style={{alignItems: 'center', marginTop: '10%', marginBottom: '10%', backgroundColor: '#c8102e', padding: 10, marginRight: '2.5%', marginLeft: '2.5%'}}>
                                <Text style={{fontSize: 20, fontWeight: '900', color: 'white'}}>
                                    Carrito Vacio
                                </Text>
                            </View>
                        ) : (
                            <View>
                                {carrito.map((producto, index) => (
                                    <View style={{flex: 1, alignItems: 'center', margin: 10, backgroundColor: '#ffffff76',
                                    shadowColor: '#171717',
                                    shadowOffset: {width: -2, height: 4},
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3, 
                                    borderRadius: 6, 
                                    padding: 15,
                                    marginLeft: '10%',
                                    marginRight: '10%'}} key={index}>
                                        <Image source={{ uri: producto.drinkImg }} style={{width: 200, height: 200}} />
                                        <View style={{flex: 1, alignItems: 'center'}}>
                                            <Text style={{marginBottom: '2%', marginTop: '2%'}}>
                                                {producto.drinkName} 
                                            </Text>
                                            <Text style={{marginBottom: '2%'}}>
                                                ${producto.price}
                                            </Text>
                                            <Text style={{marginBottom: '2%'}}>
                                                Stock:
                                                {stockActualizado(producto)}
                                            </Text>
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#ffffff76',
                                    shadowColor: '#171717',
                                    shadowOffset: {width: -2, height: 4},
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3, 
                                    borderRadius: 6, 
                                    padding: 15,}}>
                                        <View style={{alignItems: 'center', paddingRight: 10}}>
                                            <TouchableOpacity onPress={() => increase(producto._id)}>
                                                <Text> 
                                                    <AntDesign name="arrowup" size={30} color="black" />
                                                </Text>
                                            </TouchableOpacity>
                                            <Text style={{fontSize:20, marginTop: '5%'}}>{producto.quantity}</Text>
                                            <TouchableOpacity onPress={() => reduce(producto._id)}>
                                                <Text>
                                                    <AntDesign name="arrowdown" size={30} color="black" />
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => removeProducto(producto._id)}>
                                            <Text>
                                                <Entypo name="trash" size={30} color="black" />
                                            </Text>
                                        </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#ffffff76',
                                    shadowColor: '#171717',
                                    shadowOffset: {width: -2, height: 4},
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3, 
                                    borderRadius: 6, 
                                    padding: 15,}}>
                        <Text style={{fontSize: 20, fontWeight: "500"}}>Total: ${total}</Text>
                        <View style={{marginTop: '4%'}}>
                            <TouchableOpacity                                                                       
                                onPress={() => vaciarCarrito()}
                            >
                                <View style={{flex:1,alignItems: 'center'}}>
                                    <Text><Entypo name="trash" size={30} color="black" /> Vaciar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                </ImageBackground>
        </SafeAreaView>
    )
}

export default CarritoScreen