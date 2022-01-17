import React, {useState} from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
// import { useDispatch } from "react-redux";
import { showMessage, hideMessage } from "react-native-flash-message"
import usersActions from '../redux/actions/authActions';
import LadrilloBackground from '../assets/fondoLadrillo.jpg'
import { connect } from "react-redux";

const SignUpScreen = (props) => {

  // const firstName = useRef();
  // const lastName = useRef();
  // const email = useRef();
  // const password = useRef();
  // const userImg = useRef();
  // const age = useRef();

  // const dispatch = useDispatch();


  // const crearUsuario = async (e) => {
  //   if (
  //     firstName.current.value !== "" &&
  //     lastName.current.value !== "" &&
  //     email.current.value &&
  //     password.current.value &&
  //     userImg.current.value &&
  //     age.current.value
  //   ) {
  //     try {
  //       const respuesta = await dispatch(
  //         usersActions.signUpUser({
  //           firstName: firstName.current.value,
  //           lastName: lastName.current.value,
  //           email: email.current.value,
  //           password: password.current.value,
  //           userImg: userImg.current.value,
  //           age: age.current.value
  //         })
  //       );

  //       if (respuesta.data.success) {
  //         showMessage({
  //           message: `Gracias por registrarte ${respuesta.data.response.newUser.firstName}`,
  //           type: "success",
  //         });
  //       } else if (respuesta.data.error) {
  //         showMessage({
  //           message: `${respuesta.data.error}`,
  //           type: "danger",
  //         });
  //       } else {
  //         respuesta.data.errors.map((e) => {
  //           showMessage({
  //             message: e.message,
  //             type: "danger",
  //           });
  //         });
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     showMessage({
  //       message: "Complete los campos porfavor!",
  //       type: "danger",
  //     });
  //   }
  // };


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
        message: 'There are fields incomplete, please complete them',
        type: 'danger'
      })
    } else {
      props.signUp(newUser)
      .then(response => {
        if(response.data.success) {
          showMessage({
            message: `Gracias por registrarte ${response.data.response.newUser.firstName}`,
            type: 'success'
          })
        } else if(response.data.error) {
            showMessage({
              type: 'danger',
              message: `${response.data.error}`
            })
        } else {
          response.data.errors.map(error => {
            showMessage({
              type: 'danger',
              message: error.message
            })
          })
        }
      })
      .catch(error => {
        console.log(error)
        showMessage({
          message: 'We are facing technical difficulties! Come back later!',
          type: 'danger'
        })
      })
    }
  }


    return (
        <>
            <SafeAreaView >
                <ImageBackground source={LadrilloBackground} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
                    <View style={{flex: 1, justifyContent:"center", alignItems: 'center'}}>
                            <View>
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 26, padding: 10}}>Sign up</Text>
                                    <TextInput style={{fontSize: 19, padding: 10, fontWeight: 'bold'}} type="text" onChangeText={e => {inputHandler(e, 'firstName')}} name="userName" placeholder="Nombre" />
                                    <TextInput style={{fontSize: 19, padding: 10, fontWeight: 'bold'}} type="text" onChangeText={e => {inputHandler(e, 'lastName')}} name="lastName" placeholder="Apellido" />
                                    <TextInput style={{fontSize: 19, padding: 10, fontWeight: 'bold'}} type="number" onChangeText={e => {inputHandler(e, 'age')}} name="age" placeholder="Edad" />
                                    {/* <Text className='text-danger'>{errorInput.userName}</Text> */}
                                    <TextInput style={{fontSize: 19, padding: 10, fontWeight: 'bold'}} type="text" onChangeText={e => {inputHandler(e, 'email')}} name="email" placeholder="E-mail" />
                                    {/* <Text className="text-danger">{errorInput.email}</Text> */}
                                    <TextInput style={{fontSize: 19, padding: 10, fontWeight: 'bold'}} onChangeText={e => {inputHandler(e, 'password')}} name="password" placeholder="Contraseña" secureTextEntry={true} />
                                    {/* <Text className="text-danger">{errorInput.password}</Text> */}
                                    <TextInput style={{fontSize: 19, padding: 10, fontWeight: 'bold'}} type="url" onChangeText={e => {inputHandler(e, 'userImg')}} name="userImage" placeholder="Imagen de perfil" />
                                    <TouchableOpacity name="signup_submit" onPress={() => submitForm()} value="Sign me up"><Text style={{ color: 'red', fontWeight: 'bold' }}>Sign Up</Text></TouchableOpacity>

                                    <Text>¿Ya tenes cuenta?</Text>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
                                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#c8102e'}}>Ingresa</Text>
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