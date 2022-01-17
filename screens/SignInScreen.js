import React, {useRef} from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useDispatch } from "react-redux";
import { showMessage, hideMessage } from "react-native-flash-message"
import usersActions from '../redux/actions/authActions';

const SignIn = ({navigation}) => {

const dispatch = useDispatch();

  const email = useRef()
  const password = useRef()

  const loguearse = async(e) =>{
    if(email.current.value !== '' && password.current.value !== ''){

      try{
        
        const respuesta = await dispatch(
          usersActions.signInUser({
            email: email.current.value,
            password: password.current.value,
          })
          );

          if(respuesta.data.success){
            showMessage({
              message: `Bienvenido ${respuesta.data.response.firstName}`,
              type: 'success'
            })
            email.current.value = ''
            password.current.value = ''
          }else{
            showMessage({
            message: respuesta.data.response,
            type: 'danger'
          })}
          
        }catch(err){console.log(err)}
      }else{
        showMessage({
          type: 'danger',
          message: 'Completa los campos'
        })
      }
  }



    const backgroundImage = { uri: 'https://i.imgur.com/ERFa48c.jpg' };

    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
            <View style={{flex: 1, justifyContent:"center", alignItems: 'center'}}>
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 26, padding: 10, textAlign: 'center' }}>Sign in </Text>
                    <TextInput style={styles.inputStyle} ref={email} type="text" name="email" placeholder="E-mail" />
                    <TextInput style={styles.inputStyle} ref={password} secureTextEntry={true} name="password" placeholder="Contraseña" />
                    <TouchableOpacity style={{ backgroundColor: '#c8102e', width:'20%', padding: '2%', borderRadius: '3%'}} name="signup_submit" onPress={() => loguearse()} value="Sign me up">
                      <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>Sign in</Text>
                      </TouchableOpacity>
                    <Text style={{ marginTop: 10 }}>¿Todavia no tenes una cuenta?</Text>
                    <TouchableOpacity style={{backgroundColor: '#c8102e', width: '40%', padding: '2%'}} onPress={() => navigation.navigate('SignUp')}>
                      <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Registrate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
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

export default SignIn