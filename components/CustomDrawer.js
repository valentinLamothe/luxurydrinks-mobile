import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { connect } from "react-redux";
import userActions from '../redux/actions/authActions';

const CustomDrawer = props => {

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView>
                <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
             <TouchableOpacity onPress={() => props.logOut()}>
                <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <AntDesign name="man" size={24} color="black" />
                    <Text style={{paddingLeft: 10}}>Cerrar Sesion</Text>
                    </View>
                </View>
             </TouchableOpacity>
        </View>
    )
}

const mapDispatchToProps = {
    logOut: userActions.logOut
  }

export default connect(null, mapDispatchToProps)(CustomDrawer);
