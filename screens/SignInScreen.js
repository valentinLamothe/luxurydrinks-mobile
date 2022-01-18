import React, {useState} from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native'
import { showMessage, hideMessage } from "react-native-flash-message"
import usersActions from '../redux/actions/authActions';
import MarmolBackground from '../assets/fondoMarmol.jpg'
import { connect } from "react-redux";
import backgroundUser from '../assets/fondoLadrillo.jpg'


const SignInScreen = (props) => {

  if(props.user !== null) {
    <View>Bienvenido {props.user.role}</View>
  } else {
    
  }


console.log('userProps:', props.user);


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
          message: 'Hay campos incompletos, porfavor completar'
      })
  } else {
    props.signIn(signUser)
      .then(response => {
          if(!response.data.success) {
              showMessage({
               type: 'danger',
               message: 'Email o/y contraseña incorrecta'
             })
          } else {
              showMessage({
                  type: 'success',
                  message: `Bienvenido ${response.data.response.firstName}!`
              })
          }
      })
      .catch((err) => showMessage({
          type: 'danger',
          message: err
      }))
  }
}


    return (
      <>

        {props.user !== null
          ?
          <SafeAreaView>
            <ImageBackground source={backgroundUser} style={{width: '100%', height: '100%'}}>
              <View style={{flex: 1, justifyContent:"center", alignItems: 'center'}}>
                <Text style={{fontSize: 30, marginBottom: '5%', fontWeight: '900'}}>Bienvenido: {props.user.firstName}</Text>
                <Text>Email: {props.user.email}</Text>
                <Image source={{uri: props.user.userImg}} style={{width: 200, height: 300, borderRadius: 100}} />
          <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={{backgroundColor:'#c8102e', padding: '5%', borderRadius: 5, marginTop: '10%'}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '900'}}>Volver al sitio</Text>
          </TouchableOpacity>
          </View>
          </ImageBackground>
          </SafeAreaView>
          :
          <>
           <ImageBackground source={MarmolBackground} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
            <View style={{flex: 1, justifyContent:"center", alignItems: 'center'}}>
                <View style={{flex: 1, justifyContent:"center", alignItems: 'center'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 26, padding: 10, textAlign: 'center' }}>Ingresar</Text>
                    <TextInput  style={styles.inputStyle} onChangeText={e => {inputHandler(e, 'email')}}  placeholder="E-mail" />
                    <TextInput  style={styles.inputStyle} onChangeText={e => {inputHandler(e, 'password')}}  secureTextEntry={true}  placeholder="Contraseña" />
                    <TouchableOpacity style={{ backgroundColor: '#c8102e', width:'30%', padding: '2%', borderRadius: '3%'}} name="signup_submit" onPress={() => submitForm()} value="Sign me up">
                      <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18}}>Ingresar</Text>
                      </TouchableOpacity>
                    <Text style={{ margin: '5%', fontSize: 17, fontWeight: '400' }}>¿Todavia no tenes una cuenta?</Text>
                    <TouchableOpacity style={{backgroundColor: '#c8102e', width: '40%', padding: '2%' , borderRadius: '3%'}} onPress={() => props.navigation.navigate('SignUp')}>
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
      userImage: state.authReducers.img
  }
}

const mapDispatchToProps = {
  signIn: usersActions.signInUser
}

export default connect (mapStateToProps, mapDispatchToProps) (SignInScreen)