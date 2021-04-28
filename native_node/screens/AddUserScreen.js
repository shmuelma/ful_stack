// screens/AddUserScreen.js

import React, { Component } from 'react';
import { Alert,Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';

class AddUserScreen extends Component {
  constructor(prpops) {
    super(prpops);
    this.state = {
      name: '',
      email: '',
      errorname:'',
      isLoading: false,
    };
  }


  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
/*
  async addpress() {
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: {
                name: this.state.name,
                email: this.state.email
            }
        })
    };
    
    const response = await fetch('http://localhost:5001/sever-apinode/us-central1/app/api/create', requestOptions);
    console.log("*** result: " + response.status + " " + response.ok);
    if (!response.status) {
        alert("There was a problem adding the user");
    } else {
        // Close the dialog
    }
    const data = await response.json();
//    this.setState({ name: data });
//     alert()
}
*/
async selectAll() {
    try {
      console.log('http://localhost:5001/sever-apinode/us-central1/app/api/readAll');
      console.log('calling read all endpoint');

      this.exampleItems = [];
      const output = await fetch('http://localhost:5001/sever-apinode/us-central1/app/api/readAll');
      const outputJSON = await output.json();
      this.exampleItems = outputJSON;
      console.log('Success');
      console.log(outputJSON);
    } catch (error) {
      console.log(error);
    }
  }

  // really this is create but the flow is that
  // click the "create item" button which appends a blank value to the array, then click save to actually create it permanently
  async saveItem(item) {
    let rjx = /[a-zA-Z]+$/
    let isvalid=rjx.test(this.state.name)
    console.warn(isvalid)
    
       if(!isvalid){
        alert('the name is not leagle!')

       }
    
    try {
      console.log('http://localhost:5001/sever-apinode/us-central1/app/api/create');
      console.log('calling create item endpoint with: ' + item.item);

      const requestBody = {
        id: item.id,
        item: item.item
      };

      const createResponse =
        await fetch('http://localhost:5001/sever-apinode/us-central1/app/api/create', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers:{
            'Content-Type': 'application/json'
          }
        });
      console.log('Success');
      console.log(createResponse.status);
      this.selectAll();
    } catch (error) {
      console.log(error);
    }
  }


  storeUser() {
    if(this.state.name === ''){
     alert('Fill at your name!')
    } else {
      this.setState({
        isLoading: true,
      });      
      
      
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Name'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          />
        </View>
        <View style={styles.inputGroup}>
          
        </View>
        <View style={styles.button}>
          <Button
            title='Add User'
            onPress={() => this.saveItem()} 
            color="#19AC52"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddUserScreen;