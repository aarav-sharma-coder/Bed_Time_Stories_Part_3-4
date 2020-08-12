import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import db from '../config'
import { ScrollView } from 'react-native-gesture-handler';



export default class Searchscreen extends React.Component {
    constructor(props){
      super(props)
      this.state = {
       allStories: [],
        lastVisibleStory: null,
        dataSource :[],
        search:''
      }
    }

    fetchMoreStories = async ()=>{
      var text = this.state.search.toUpperCase()
      var enteredText = text.split("")

      
      if (enteredText[0].toUpperCase() ===''){
      const query = await db.collection("stories").where('title','==',text).startAfter(this.state.lastVisibleStory).get()
      query.docs.map((doc)=>{
        this.setState({
         dataSource: [...this.state.dataSource, doc.data()],
          lastVisibleStory: doc
        })
      })
    }
      else if(enteredText[0].toUpperCase() === 't'){
        const query = await db.collection("stories").where('title','==',text).startAfter(this.state.lastVisibleStory).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allStories: [...this.state.allStories, doc.data()],
          lastVisibleStory: doc
        })
      })
    }
    }

    searchStories= async(text) =>{
      var enteredText = text.split("")  
      if (enteredText[0].toUpperCase() ===''){
        const story =  await db.collection("stories").where('title','==',text).get()
        story.docs.map((doc)=>{
          this.setState({
            dataSource:[...this.state.dataSource,doc.data()],
            lastVisibleStory: doc
        })
        })
      }
      
      else if(enteredText[0].toUpperCase() === 't'){
        const story = await db.collection('stories').where('title','==',text).get()
        story.docs.map((doc)=>{
           this.setState({
          allStories: [...this.state.allStories, doc.data()],
          lastVisibleStory: doc
        })
        })
      }
      }

    componentDidMount = async ()=>{
      const query = await db.collection("stories").get()
      query.docs.map((doc)=>{
        this.setState({
         dataSource: [],
          lastVisibleStory: doc
        })
      })
    }
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.searchBar}>
        <TextInput 
          style ={styles.bar}
          placeholder = "Enter Book Id or Student Id"
          onChangeText={(text)=>{this.setState({search:text})}}/>
          <TouchableOpacity
            style = {styles.searchButton}
            onPress={()=>{this.searchStories(this.state.search)}}
          >
            <Text>Search</Text>
          </TouchableOpacity>
          </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item})=>(
            <View style={{borderBottomWidth: 2}}>
              <Text>{"Title: " + item.title}</Text>
              <Text>{"Author: " + item.author}</Text>
            </View>
          )}
          keyExtractor= {(item, index)=> index.toString()}
          onEndReached ={this.fetchMoreStories}
          onEndReachedThreshold={0.7}
        /> 
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })