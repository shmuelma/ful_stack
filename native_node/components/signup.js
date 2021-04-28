// components/signup.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';

export default class Signup extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      emailerror:'',
      passworderror:'',
      isLoading: false
    }
  }
  
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    let rjx = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/
    let isvalid=rjx.test(this.state.email)
    console.warn(isvalid)
    
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } 
    if(!isvalid){
        this.setState({emailerror:"email field must be alphabetic"})
        //Alert.alert('"email field must be alphabetic"')

    }
    if(this.state.password.length<8){
        Alert.alert("password must be length least 8 digits")

      }
    else {
    //   this.setState({
    //     isLoading: true,
    //   })
      
      auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('login')
      })
      .catch(error => alert(error.message))      
    }
        }
   emailValodator=()=>{
       if(this.state.email=="")
       {
        this.setState({emailerror:"email field can not be empty"})
       }
       
}
       
   
   passwordValodator=()=>{
    if(this.state.password=="")
    {
     this.setState({passworderror:"password field can not be empty"})
    }
    if(this.state.password.length<8)
    {
     this.setState({passworderror:"password must be length least 8 digits"})
    }
}
  render() {
    // if(this.state.isLoading){
    //   return(
    //     <View style={styles.preloader}>
    //       <ActivityIndicator size="large" color="#9E9E9E"/>
    //     </View>
    //   )
    // }    
    return (
      <View style={styles.container}>  
              
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          onBlur={()=>this.emailValodator()}
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <Text style={{color:'red'}}>{this.state.emailerror}</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          onBlur={()=>this.passwordValodator()}
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={8}
          secureTextEntry={true}
        />  
       <Text style={{color:'red'}}>{this.state.passworderror}</Text>
 
        <Button
          color="#3740FE"
          title="Signup"
          onPress={() => this.registerUser()}
        />

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('login')}>
          Already Registered? Click here to login
        </Text>                          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});