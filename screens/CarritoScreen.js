import { View, Text, SafeAreaView, Alert, TouchableOpacity, Image, ImageBackground } from 'react-native';
import React, { useContext } from "react";
import { DataContext } from "../DataProvider";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import MarmolBackground from '../assets/fondoMarmol.jpg'

const CarritoScreen = () => {

    const value = useContext(DataContext);
    const [carrito, setCarrito] = value.carrito;
    const [total] = value.total;

    const stockActualizado = (producto) => {
        const res = producto.stock - producto.quantity;
        if (res > 5) {
            return res;
        } else if (res <= 5 && res > 0) {
            return <Text> " "</Text> + res + <Text>" Ultimas unidades!!"</Text>;
        } else {
            return <Text>" Sin stock"</Text>;
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
        Alert.alert(
            "El producto sera sacado del carrito!"
        ).then((result) => {
            if (result.isConfirmed) {
                Alert.alert(
                    "El producto ha sido borrado del carrito",
                );
                carrito.forEach((item, index) => {
                    if (item._id === id) {
                        item.quantity = 1;
                        carrito.splice(index, 1);
                    }
                });
                setCarrito([...carrito]);
            }
        });
    };

    const vaciarCarrito = () => {
        Alert.alert(
            "Desea vaciar el carrito?"
            //title: "Desea vaciar el carrito?",
            //   text: "Todos los productos seran borrados del carrito!",
            //   icon: "warning",
            //   showCancelButton: true,
            //   confirmButtonColor: "#d33",
            //   cancelButtonColor: "#d33",
            //   confirmButtonText: "Vaciar carrito!",
        ).then((result) => {
            if (result.isConfirmed) {
                Alert.alert(
                    "Los productos han sido borrados del carrito",
                );

                carrito.splice(0, carrito.length);
                setCarrito([...carrito]);
            }
        });
    };


    return (
        <SafeAreaView>
            <View>
                <ImageBackground
                    source={MarmolBackground}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Text>Carrito de compras</Text>
                    <View>
                        {carrito.length === 0 ? (
                            <Text>Carrito Vacio</Text>
                        ) : (
                            <>
                                {carrito.map((producto) => (
                                    <>
                                        <Image source={{ uri: producto.drinkImg }} alt={producto.drinkName} />
                                        <View>
                                            <Text> {producto.type + " " + producto.drinkName} </Text>
                                            <Text>${producto.price}</Text>
                                            <Text>
                                                Stock:
                                                {stockActualizado(producto)}
                                            </Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={() => increase(producto._id)}>
                                                <Text> <AntDesign name="arrowup" size={24} color="black" /></Text>
                                            </TouchableOpacity>
                                            <Text>{producto.quantity}</Text>
                                            <TouchableOpacity onPress={() => reduce(producto._id)}>
                                                <Text><AntDesign name="arrowdown" size={24} color="black" /></Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity onPress={() => removeProducto(producto._id)}>
                                            <Text><Entypo name="trash" size={24} color="black" /></Text>
                                        </TouchableOpacity>
                                    </>
                                ))}
                                ;
                            </>
                        )}
                    </View>

                    <View>
                        <Text>Total: ${total}</Text>
                        <View>
                            <View
                                style={{ height: 130 }}
                            >
                            </View>
                            <TouchableOpacity                                                                       
                                onPress={() => vaciarCarrito()}
                            >
                                <View>
                                    <Text>Vaciar <Entypo name="trash" size={24} color="black" /></Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

export default CarritoScreen