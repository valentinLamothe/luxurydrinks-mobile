import { Text, View,SafeAreaView, ScrollView, ImageBackground, TouchableOpacity, Image, StyleSheet } from "react-native"
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import Drinks from './DrinkScreen';
import CustomDrawer from '../components/CustomDrawer';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


const Drawer = createDrawerNavigator(); 

const HomeScreen = ({navigation}) => {

    const imageUser = { uri: "https://i.imgur.com/kGvMbiI.jpg"  };

    const imageLogo = { uri: "https://i.imgur.com/N38IJLG.png"  };

    const imageDrink = { uri: "https://i.imgur.com/HiwTa7s.jpg" };

    const bodyBackground = { uri: "https://i.imgur.com/Hg8tLfI.jpg" };

    return(
      <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}>
      <ImageBackground source={bodyBackground} style={{width: "100%", height: "100%"}} >
        <ScrollView style={{}}>
            <View style={{
                flexDirection:'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                backgroundColor:'#c8102e'
                }}>
                <ImageBackground source={imageLogo} style={{width: 140, height: 50, margin: '2%'}}/>
                {/* <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Bienvenido a Luxury Drinks</Text> */}
                {/* <ImageBackground  
                source={imageUser} 
                style={{width: 35, height: 35}} 
                imageStyle={{borderRadius: 25}} 
                /> */}
                <TouchableOpacity style={{ borderRadius: 5, padding: 5, margin: '2%'}} onPress={() => navigation.openDrawer()}>
                <Text style={{color: 'white', padding: 10, fontWeight: 'bold', fontSize: 20}}>MENU</Text>
                </TouchableOpacity>
            </View>
          <ImageBackground source={imageDrink} style={{width: '100%', height: 400}}>
            <View style={{justifyContent: 'center', alignItems: 'center', height: 400}}>
            <Text style={styles.titleStyle}>EL GIN</Text>
            <Text style={styles.titleStyle}>MÁS</Text>
            <Text style={styles.titleStyle}>PREMIADO</Text>
            <Text style={styles.titleStyle}>DEL MUNDO</Text>
            <TouchableOpacity style={{padding: 15, backgroundColor: '#c8102e', borderRadius: '5%', marginTop: '5%'}}
              onPress={() => navigation.navigate('Drinks')}
            >
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase'}}>Descubrí más</Text>
            </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: '10%'}}>
            <Text style={{color: '#c8102e', fontSize: 28, fontWeight: 'bold'}}>CONOCE</Text>
            <Text style={{color: '#c8102e', fontSize: 28, fontWeight: 'bold'}}>NUESTRAS</Text>
            <Text style={{color: '#c8102e', fontSize: 28, fontWeight: 'bold'}}>NOVEDADES</Text>
          </View>
          <View style={{backgroundColor: '#c8102e', width: '90%', height: 450, marginLeft: '5%', marginBottom: '8%'}}>

          </View>
          <View style={{backgroundColor: '#c8102e', width: '90%', height: 450, marginLeft: '5%', marginBottom: '8%'}}>

          </View>
          <View style={{backgroundColor: '#c8102e', width: '90%', height: 450, marginLeft: '5%'}}>

          </View>
        </ScrollView>
    </ImageBackground>
    </SafeAreaView>
    )
}

const HomeNavigate = () => {
    return (
    <Drawer.Navigator 
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
            headerShown: false,
            drawerActiveTintColor: '#c8102e',
            drawerLabelStyle: {marginLeft: -20, fontWeight: 'bold'}}
        }>
        <Drawer.Screen name="Home" component={HomeScreen} options={{
          headerShown: false,
          drawerIcon: () => {
            return <Entypo name="home" size={24} color="black" />
          }
        }} />
        <Drawer.Screen name="Tienda" component={Drinks} options={{
          headerShown: false,
          drawerIcon: () => {
            return <Entypo name="drink" size={24} color="black" />
          }
        }} />
        <Drawer.Screen name="Registrarse" component={SignUpScreen} options={{
                        
          headerShown: false, 
          drawerIcon: () => {
            return <Feather name="user-plus" size={24} color="black" />
          }
        }} />
        <Drawer.Screen name="Ingresar" component={SignInScreen} options={{
          headerShown: false, 
          drawerIcon: () => {
            return <Entypo name="login" size={24} color="black" />
          }
        }} />
    </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 38, 
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10
  }
})


export default HomeNavigate