import React, {useState} from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
// import { useDispatch } from "react-redux";
import { showMessage, hideMessage } from "react-native-flash-message"
import usersActions from '../redux/actions/authActions';
import marmolBackground from '../assets/fondoMarmol.jpg'
import { connect } from "react-redux";

const SignUpScreen = (props) => {

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: null,
    userImg: ""
  })

  const inputHandler = (e, field, value) => {
    setNewUser({
      ...newUser,
      [field]: e || value
    })
  }

  const submitForm = () => {
    let info = Object.values(newUser).some(infoUser => infoUser === '')
    if(info) {
      showMessage({
        message: 'Hay campos incompletos, porfavor completar',
        type: 'danger',
        icon: 'danger'
      })
    } else {
      props.signUp(newUser)
      .then(response => {
        if(response.data.success) {
          showMessage({
            message: `Gracias por registrarte ${response.data.response.newUser.firstName}`,
            type: 'success',
            icon: 'success',
            backgroundColor: 'black',
            color: 'white'
          })
        } else if(response.data.error) {
            showMessage({
              type: 'danger',
              message: `${response.data.error}`,
              icon: 'danger'
            })
        } else {
          response.data.errors.map(error => {
            showMessage({
              type: 'danger',
              message: error.message,
              icon: 'danger'
            })
          })
        }
      })
      .catch(error => {
        console.log(error)
        showMessage({
          message: 'Estamos con problemas tecnicos! Porfavor vuelve mas tarde!',
          type: 'danger',
          icon: 'danger'
        })
      })
    }
  }


    return (
        <>
            <SafeAreaView >
                <ImageBackground source={marmolBackground} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
                    <View style={{flex: 1, justifyContent:"center", alignItems: 'center'}}>
                            <View>
                                <View style={{ shadowColor: '#171717',shadowOffset: {width: -2, height: 4},shadowOpacity: 0.2,shadowRadius: 3,backgroundColor: '#ffffff76', paddingLeft: '14%', paddingRight: '14%', borderRadius: 8}}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 26, padding: 10, textAlign: 'center', marginBottom: '5%', paddingTop: 40}}>Registrarse</Text>
                                    <TextInput style={{fontSize: 19, padding: 10, fontWeight: 'bold', borderWidth: 1, marginBottom: '4%', borderRadius: 3}} type="text" onChangeText={e => {inputHandler(e, 'firstName')}} placeholder="Nombre" />
                                    <TextInput style={{fontSize: 19, padding: 10, fontWeight: 'bold', borderWidth: 1, marginBottom: '4%', borderRadius: 3}} type="text" onChangeText={e => {inputHandler(e, 'lastName')}} name="apellido" placeholder="Apellido" />
                                    <TextInput style={{fontSize: 19, padding: 10, fontWeight: 'bold', borderWidth: 1, marginBottom: '4%', borderRadius: 3}} type="number" onChangeText={e => {inputHandler(e, 'age')}} name="age" placeholder="Edad" />
                                    <TextInput style={{fontSize: 19, padding: 10, fontWeight: 'bold', borderWidth: 1, marginBottom: '4%', borderRadius: 3}} type="text" onChangeText={e => {inputHandler(e, 'email')}} name="email" placeholder="E-mail" />
                                    <TextInput style={{fontSize: 19, padding: 10, fontWeight: 'bold', borderWidth: 1, marginBottom: '4%', borderRadius: 3}} onChangeText={e => {inputHandler(e, 'password')}} name="password" placeholder="Contraseña" secureTextEntry={true} />
                                    <TextInput style={{fontSize: 19, padding: 10, fontWeight: 'bold', borderWidth: 1, marginBottom: '4%', borderRadius: 3}} type="url" onChangeText={e => {inputHandler(e, 'userImg')}} name="userImage" placeholder="Imagen de perfil" />
                                    <TouchableOpacity name="signup_submit" onPress={() => submitForm()} value="Sign me up">
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#c8102e', textAlign: 'center', margin: '2%' }}>
                                    Registrate
                                    </Text>
                                    </TouchableOpacity>
                                    <Text style={{textAlign: 'center', marginTop: '6%', marginBottom: '6%', fontSize: 17, fontWeight: '400'}}>¿Ya tenes cuenta?</Text>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
                                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#c8102e', textAlign: 'center'}}>Ingresa</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                </ImageBackground>
            </SafeAreaView>
        </>
    )
}

// const mapStateToProps = state => {
//   return {     
//     userName: state.authReducer.userName     
//   }     
// }

const mapDispatchToProps = {
  signUp: usersActions.signUpUser
}

export default connect(null, mapDispatchToProps)(SignUpScreen)