import React, {useState} from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native'
import { showMessage, hideMessage } from "react-native-flash-message"
import usersActions from '../redux/actions/authActions';
import MarmolBackground from '../assets/fondoMarmol.jpg'
import { connect } from "react-redux";
import backgroundUser from '../assets/fondoLadrillo.jpg'


const SignInScreen = (props) => {

console.log('userPropscuandomeregistro:', props);


const [signUser, setSignUser] = useState ({
  email: "", 
  password: "",
})


const inputHandler = (e, field, value) => {
  setSignUser({
      ...signUser, 
      [field]: e || value
  })
}

const submitForm = () => {
  let info = Object.values(signUser).some(infoUser => infoUser === "")
  if(info) {
      showMessage({
          type: 'danger',
          message: 'Hay campos incompletos, porfavor completar',
          icon: 'danger'
      })
  } else {
    props.signIn(signUser)
      .then(response => {
        console.log('ernestSchuber:', response);
          if(!response.data.success) {
              showMessage({
               type: 'danger',
               message: 'Email o/y contraseña incorrecta',
               icon: 'danger'
             })
          } else {
              showMessage({
                  type: 'success',
                  message: `Bienvenido ${response.data.response.user.firstName}!`,
                  icon: 'success',
                  backgroundColor: 'black',
                  color: 'white'
              })
          }
      })
      .catch((err) => showMessage({
          type: 'danger',
          message: err
      }))
  }
}

    console.log("clg signin screen: ",props)
    return (
      <>

        {props.user !== null
          ?
          <SafeAreaView>
            <ImageBackground source={MarmolBackground} style={{width: '100%', height: '100%'}}>
              <View style={{flex: 1, justifyContent:"center", alignItems: 'center'}}>
                <Text style={{fontSize: 30, fontWeight: '900', width: '80%'}}>Nombre: <Text style={{color: '#c8102e'}}>{props.user.firstName || props.user.newUser.firstName}</Text></Text>
                <Text style={{fontSize: 30, fontWeight: '900', width: '80%'}}>Email: <Text style={{color: '#c8102e'}}>{props.user.email || props.user.newUser.email}</Text></Text>
                <Text style={{fontSize: 30, fontWeight: '900', width: '80%', marginBottom: '5%'}}>Edad: <Text style={{color: '#c8102e'}}>{props.user.age || props.user.newUser.age}</Text></Text>
                <Image source={{uri: (props.user.userImg || props.user.newUser.userImg)}} style={{width: '70%', height: '43%', borderRadius: 200, borderWidth: 3}} />
          <TouchableOpacity onPress={() => props.navigation.navigate('Inicio')} style={{backgroundColor:'#c8102e', padding: '5%', borderRadius: 5, marginTop: '10%'}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '900'}}>Volver al sitio</Text>
          </TouchableOpacity>
          </View>
          </ImageBackground>
          </SafeAreaView>
          :
          <>
           <ImageBackground source={MarmolBackground} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
            <View style={{flex: 1, justifyContent:"center", alignItems: 'center'  }}>
                <View style={{flex: 1, justifyContent:"center", alignItems: 'center' ,shadowColor: '#171717',shadowOffset: {width: -2, height: 4},shadowOpacity: 0.2,shadowRadius: 3,backgroundColor: '#ffffff76' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 26, padding: 10, textAlign: 'center' }}>Bienvenido</Text>
                    <TextInput  style={styles.inputStyle} onChangeText={e => {inputHandler(e, 'email')}}  placeholder="E-mail" />
                    <TextInput  style={styles.inputStyle} onChangeText={e => {inputHandler(e, 'password')}}  secureTextEntry={true}  placeholder="Contraseña" />
                    <TouchableOpacity style={{ backgroundColor: '#c8102e', width:'30%', padding: '2%', boderRadius: 3}} name="signup_submit" onPress={() => submitForm()} value="Sign me up">
                      <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18}}>Ingresar</Text>
                      </TouchableOpacity>
                    <Text style={{ margin: '5%', fontSize: 17, fontWeight: '400' }}>¿Todavia no tenes una cuenta?</Text>
                    <TouchableOpacity style={{backgroundColor: '#c8102e', width: '40%', padding: '2%' , boderRadius: 3}} onPress={() => props.navigation.navigate('SignUp')}>
                      <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Registrate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
          </>
         }

       
        </>
    )
}


const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 19,
    padding: 10, 
    fontWeight: 'bold', 
    textAlign: 'center'
  }
})

const mapStateToProps = state => {
  return {
      user: state.authReducers.user,
  }
}

const mapDispatchToProps = {
  signIn: usersActions.signInUser
}

export default connect (mapStateToProps, mapDispatchToProps) (SignInScreen)