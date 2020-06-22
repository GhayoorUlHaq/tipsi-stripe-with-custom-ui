/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {PureComponent} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import stripe from 'tipsi-stripe';
import axios from 'axios';

stripe.setOptions({
  publishableKey: 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
});

export default class CardFormScreen extends PureComponent {
  constructor(props){
    super(props);
      this.state = {
        loading: false,
        token: null,
        cardNumber:'4242424242424242',
        month: '12',
        year: '21',
        cvc: '123',
        amount: '500',
        currency: 'usd'
    }
  }

  

  handleCardPayPress = async () => {
    try {
      this.setState({ loading: true, token: null })
      await stripe.createTokenWithCard({
          number: this.state.cardNumber,
          expMonth: parseInt(this.state.month),
          expYear: parseInt(this.state.year),
          cvc: this.state.cvc,
          name: 'Test User',
          currency: 'usd',
          addressLine1: '123 Test Street',
          addressLine2: 'Apt. 5',
          addressCity: 'Test City',
          addressState: 'Test State',
          addressCountry: 'Test Country',
          addressZip: '55555',
          loading: false
      }).then((token)=>{
        
        console.log(token);
          axios({
            method: "POST",
            url: 'http://localhost:3001/createStripePaymentIntent',
            data: {
                amount:parseInt(this.state.amount)*100,
                currency: this.state.currency,
                // token: this.state.token
            },
        }).then(response => {
            if(response.status === 200){
                alert("Payment Successful!");
            }else{
               alert("Error Making Payment!");
            }

            this.setState({ loading: false, token })
        }).catch((error)=> {
            console.log(error);
        })
      

    });
      
    } catch (error) {
      alert("Error Making Payment!");
      this.setState({ loading: false })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.spacer}></View> 
        <Text style={styles.title}>Stripe Payment</Text>
        <Text style={styles.subHeading}>Using local Node Server</Text>

        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.viewContainer}>
                  {/* card input */}
                <Text style={styles.inputHeading}>Enter Card Number</Text>
                <TextInput 
                  style={[styles.input,{width:170}]}
                  keyboardType={"number-pad"}
                  placeholder={"4242424242424242"}
                  value={this.state.cardNumber}
                  maxLength={16}
                  onChangeText={(cardNumber)=> this.setState({cardNumber})}
                /> 
                <View style={styles.border} /> 

                {/* Month year */}
                <Text style={styles.inputHeading}>Enter Expiry Month / Year</Text>
                <View style={{flexDirection: 'row'}}>
                  <TextInput 
                    style={[styles.input,{width:56}]}
                    keyboardType={"number-pad"}
                    placeholder={"MM"}
                    value={this.state.month}
                    maxLength={2}
                    onChangeText={(month)=> this.setState({month})}
                  /> 
                  <Text style={styles.slash}>/</Text>
                  <TextInput 
                    style={[styles.input,{width:56}]}
                    keyboardType={"number-pad"}
                    placeholder={"YY"}
                    value={this.state.year}
                    maxLength={2}
                    onChangeText={(year)=> this.setState({year})}
                  /> 
                </View>
                <View style={styles.border} /> 

                {/* cvc */}
                <Text style={styles.inputHeading}>Enter CVC</Text>
                <TextInput 
                  style={[styles.input,{width:60}]}
                  keyboardType={"number-pad"}
                  placeholder={"123"}
                  value={this.state.cvc}
                  maxLength={3}
                  onChangeText={(cvc)=> this.setState({cvc})}
                /> 


                <View style={styles.border} /> 

                {/* amount */}
                <Text style={styles.inputHeading}>Enter Amount</Text>
                <TextInput 
                  style={[styles.input,{width:70}]}
                  keyboardType={"number-pad"}
                  placeholder={"123"}
                  value={this.state.amount}
                  onChangeText={(amount)=> this.setState({amount})}
                /> 

                <View style={styles.border} /> 


                {/* currency */}
                <Text style={styles.inputHeading}>Enter currency</Text>
                <TextInput 
                  style={[styles.input,{width:70}]}
                  placeholder={"usd"}
                  value={this.state.currency}
                  onChangeText={(currency)=> this.setState({currency})}
                /> 

                <View style={styles.border} /> 

                <TouchableOpacity onPress={()=> this.handleCardPayPress()} style={styles.payButton} disabled={this.state.loading}>
                  <Text>{this.state.loading ? "Processing" : "Pay"}</Text>
                </TouchableOpacity>
          </View>      
        </ScrollView>
       
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  spacer: {
    marginTop:100
  },
  title: {
    fontSize: 25, fontWeight: 'bold'
  },
  subHeading: { 
    marginTop:5, 
    fontSize: 16
   },
  inputHeading: { 
    marginTop:5, 
    fontSize: 16,
    marginTop:20, 
    color: 'rgba(0,0,0,0.5)',
   },
   input: {
      backgroundColor: 'rgba(0,0,0,0.1)',
      width: 300,
      marginTop: 7,
      height: 30,
      paddingVertical:5,
      paddingHorizontal: 15,
      borderRadius:25
   },
   slash: {
     marginTop:10,
     fontSize:18,
     marginHorizontal:10,
     color: 'rgba(0,0,0,0.5)'
   },
   border: {
    borderBottomWidth:0.5,
    borderBottomColor: 'rgba(0,0,0,0.5)',
    width: 100,
    height: 1,
    marginTop: 30
   },
   payButton: {
     padding: 10, marginTop:20,
     borderRadius:20,
     borderColor: 'black',
     borderWidth:1,
     width:150,
     justifyContent: 'center',
     alignItems: 'center'
   },
   viewContainer: {
     alignItems: 'center'
   }
})
