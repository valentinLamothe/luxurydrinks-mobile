import React, {useState} from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { showMessage, hideMessage } from "react-native-flash-message"
import usersActions from '../redux/actions/authActions';
import LadrilloBackground from '../assets/fondoLadrillo.jpg'
import { connect } from "react-redux";


const SignInScreen = (props) => {

// const dispatch = useDispatch();

//   const email = useRef()
//   const password = useRef()

//   console.log(email.current);
//   console.log(password.current);

//   const loguearse = async(e) =>{
//     if(email.current.value !== '' && password.current.value !== ''){

//       try{
        
//         const respuesta = await dispatch(
//           usersActions.signInUser({
//             email: email.current.value,
//             password: password.current.value,
//           })
//           );

//           if(respuesta.data.success){
//             showMessage({
//               message: `Bienvenido ${respuesta.data.response.firstName}`,
//               type: 'success'
//             })
//             email.current.value = ''
//             password.current.value = ''
//           }else{
//             showMessage({
//             message: respuesta.data.response,
//             type: 'danger'
//           })}
          
//         }catch(err){console.log(err)}
//       }else{
//         showMessage({
//           type: 'danger',
//           message: 'Completa los campos'
//         })
//       }
//   }

const [signUser, setSignUser] = useState ({
  email: "", 
  password: "",
})

const [ errorInput, setErrorInput ] = useState(null)

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
          message: 'Completa los campos'
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
        <ImageBackground source={LadrilloBackground} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
            <View style={{flex: 1, justifyContent:"center", alignItems: 'center'}}>
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 26, padding: 10, textAlign: 'center' }}>Sign in </Text>
                    <TextInput  style={styles.inputStyle} onChangeText={e => {inputHandler(e, 'email')}}  placeholder="E-mail" />
                    <TextInput  style={styles.inputStyle} onChangeText={e => {inputHandler(e, 'password')}}  secureTextEntry={true}  placeholder="Contraseña" />
                    <TouchableOpacity style={{ backgroundColor: '#c8102e', width:'20%', padding: '2%', borderRadius: '3%'}} name="signup_submit" onPress={() => submitForm()} value="Sign me up">
                      <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>Sign in</Text>
                      </TouchableOpacity>
                    <Text style={{ marginTop: 10 }}>¿Todavia no tenes una cuenta?</Text>
                    <TouchableOpacity style={{backgroundColor: '#c8102e', width: '40%', padding: '2%'}} onPress={() => props.navigation.navigate('SignUp')}>
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

// const mapStateToProps = state => {
//   return {
//       userName: state.authReducer.userName,
//       email: state.authReducer.email,
//       userImage: state.authReducer.userImage
//   }
// }

const mapDispatchToProps = {
  signIn: usersActions.signInUser
}

export default connect (null, mapDispatchToProps) (SignInScreen)