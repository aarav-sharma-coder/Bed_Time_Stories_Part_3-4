import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,KeyboardAvoidingView,ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {Header} from 'react-native-elements';
import db from '../config'
//import firebase from 'firebase'

export default class WriteStoryScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            author: '',
            storyText: '',
        }
    }

    submitStory = ()=>{
        db.collection("stories").add({
            title: this.state.title,
            author: this.state.author,
            storyText: this.state.storyText,
            //date: firebase.firestore.FieldValue.serverTimestamp().now().toDate()
        })
        this.setState({
            title: '',
            author: '',
            storyText: ''
        })
        
    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={styles.container}>
                <Header 
                    backgroundColor = {'blue'}
                    centerComponent = {{
                        text : 'Bed Time Stories',
                        style : { color: 'white', fontSize: 20}
                    }}
                />
                 <TextInput 
                    placeholder="Story Title"
                    onChangeText= {(text)=>{
                        this.setState({
                            title: text
                        })
                    }}
                    value={this.state.title}
                    style={styles.title}/>
                <TextInput
                    placeholder="Author"
                    onChangeText= {(text)=>{
                        this.setState({
                            author: text
                        })
                    }}
                    value={this.state.author}
                    style={styles.author} />
                <TextInput 
                    placeholder="Write your story"
                    onChangeText= {(text)=>{
                        this.setState({
                            storyText: text
                        })
                    }}
                    value={this.state.storyText}
                    style={styles.storyText}
                    multiline={true}/>
                
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={this.submitStory}
                    >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            
            </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title:{
      height: 40,
      borderWidth: 2,
      marginTop: 40,
      margin: 10
  },
  author: {
      height: 40,
      borderWidth: 2,
      margin: 10
  },
  storyText: {
      height: 250,
      borderWidth: 2,
      margin: 10
  },
  submitButton:{
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: 'yellow',
      width: 80,
      height: 40
  },
  buttonText: {
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold'
  }
});