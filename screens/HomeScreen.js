import { Text, View,SafeAreaView, ScrollView, ImageBackground, TouchableOpacity, Image, StyleSheet } from "react-native"
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import Drinks from './DrinkScreen';
import CustomDrawer from '../components/CustomDrawer';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import BackgroundImage from '../assets/fondoLadrillo.jpg';
import ImageLogo from '../assets/logoluxury.png';
import ImageDrink from '../assets/Home.jpeg'
import CarouselRender from '../components/CarouselRender';
import FirstHomeImage from '../assets/1home.png';
import SecondHomeImage from '../assets/2home.png';
import usersActions from '../redux/actions/authActions';
import { connect } from "react-redux";
import CarritoScreen from '../screens/CarritoScreen';
import { AntDesign } from '@expo/vector-icons';


const Drawer = createDrawerNavigator(); 

const HomeScreen = ({navigation}) => {

    return(
      <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}>
      <ImageBackground source={BackgroundImage} style={{width: "100%", height: "100%"}} >
        <ScrollView>
            <View style={{
                flexDirection:'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                backgroundColor:'#c8102e'
                }}>
                <ImageBackground source={ImageLogo} style={{width: 140, height: 50, margin: '2%'}}/>
                <TouchableOpacity style={{ borderRadius: 5, padding: 5, margin: '2%'}} onPress={() => navigation.openDrawer()}>
                <Text style={{color: 'white', padding: 10, fontWeight: 'bold', fontSize: 20}}>MENU</Text>
                </TouchableOpacity>
            </View>
          <ImageBackground source={ImageDrink} style={{width: '100%', height: 400}}>
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
          <View style={{borderColor: '#c8102e', borderWidth: 3, padding: '2%', width: '90%', height: 450, marginLeft: '5%', marginBottom: '8%', paddingBottom: '10%'}}>
                <CarouselRender />
          </View>
          <View style={{backgroundColor: '#c8102e', width: '90%', height: 450, marginLeft: '5%', marginBottom: '8%', flex: 1, borderRadius: '3%'}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', marginLeft: '4%', marginBottom: '2%', marginTop: '7%', textShadowColor: 'rgba(0, 0, 0, 0.75)',textShadowOffset: {width: 0, height: 0},textShadowRadius: 10}}>Hot Negroni</Text>
                <Text style={{color: 'white', width: '90%', fontSize: 20, marginLeft: '4%', marginBottom: '6%', fontWeight: '600', textShadowColor: 'rgba(0, 0, 0, 0.40)',textShadowOffset: {width: 0, height: 0},textShadowRadius: 10}}>"EMPIEZA EL 2022 DISFRUTANDO DE UN BEEFEATER GIN HOT NEGRONI".</Text>
                <Image source={FirstHomeImage} style={{width: '100%', height: '65%'}} />
            </View>
          </View>
          <View style={{backgroundColor: '#c8102e', width: '90%', height: 450, marginLeft: '5%', borderRadius: '3%', marginBottom: '5%'}}>
              <Image source={SecondHomeImage} style={{width: '100%', height: '65%'}} />
              <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold', marginLeft: '5%', marginTop: '5%', textShadowColor: 'rgba(0, 0, 0, 0.75)',
              textShadowOffset: {width: 0, height: 0},
              textShadowRadius: 10}}>Smashing Basil Punch</Text>
              <Text style={{color: 'white', width: '90%', fontSize: 20, fontWeight: '600', marginLeft: '5%', marginTop: '3%', textShadowColor: 'rgba(0, 0, 0, 0.40)',textShadowOffset: {width: 0, height: 0},textShadowRadius: 10}}>"EL DELICIOSO SABOR DE LA ALBAHACA Y EL GIN".</Text>
          </View>
        </ScrollView>
    </ImageBackground>
    </SafeAreaView>
    )
}

const HomeNavigate = (props) => {
    return (
    <Drawer.Navigator 
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
            headerShown: false,
            drawerActiveTintColor: '#c8102e',
            drawerLabelStyle: {marginLeft: -20, fontWeight: 'bold'}}
        }>
        <Drawer.Screen name="Inicio" component={HomeScreen} options={{
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
        { props.user !== null ?
          <>
            <Drawer.Screen name="Carrito" component={CarritoScreen} options={{
                headerShown: false, 
                drawerIcon: () => {
                  return <AntDesign name="shoppingcart" size={24} color="black" />
                }
              }} />
          </> 
          :
        <Drawer.Screen name="Registrarse" component={SignUpScreen} options={{
          headerShown: false, 
          drawerIcon: () => {
            return <Feather name="user-plus" size={24} color="black" />
          }
        }} />
      }
        {props.user !== null ? 
              <Drawer.Screen name="Perfil" component={SignInScreen} options={{
                headerShown: false, 
                drawerIcon: () => {
                  return <AntDesign name="user" size={24} color="black" />
                }
              }} />
              :
              <Drawer.Screen name="Ingresar" component={SignInScreen} options={{
                headerShown: false, 
                drawerIcon: () => {
                  return <Entypo name="login" size={24} color="black" />
                }
              }} />
              
      }
        
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

const mapStateToProps = state => {
  return {
      user: state.authReducers.user,
      userImage: state.authReducers.img
  }
}

const mapDispatchToProps = {
  signIn: usersActions.signInUser
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeNavigate)
