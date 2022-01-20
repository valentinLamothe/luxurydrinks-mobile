import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { connect } from "react-redux";
import userActions from '../redux/actions/authActions';
import { showMessage, hideMessage } from "react-native-flash-message"


const CustomDrawer = props => {

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView>
                <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            {props.user !== null 
            ?  
             <TouchableOpacity onPress={() => props.logOut() ? showMessage({message: 'Cerraste Sesion, hasta pronto!', icon: 'success', backgroundColor: "black", color: 'white'}) : ''}>
                <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <AntDesign name="man" size={24} color="black" />
                    <Text style={{paddingLeft: 10}}>Cerrar Sesion</Text>
                    </View>
                </View>
             </TouchableOpacity>
            : 
            <>
            </> 
            }
        </View>
    )
}

const mapStateToProps = state => {
    return {
        user: state.authReducers.user,
        userImage: state.authReducers.img
    }
  }

const mapDispatchToProps = {
    logOut: userActions.logOut
  }

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);
