import React from "react";
import {Text, View, StyleSheet, Button, FlatList, Image} from "react-native";
import axios from "axios";
import moment from "moment";

class App extends React.Component {
  constructor()
  {
    super();
    this.state = {
      count: 1,
      articles: []
    }
  }
  componentDidMount()
  {
    const url = "https://newsapi.org/v2/everything?q=bitcoin&from=2019-07-11&sortBy=publishedAt&apiKey=96840f34e16c4531bcfb6a0defc64c6e";
    axios
    .get(url)
    .then((res) => {
      this.setState({articles: res.data.articles})
    })
    .catch((err) => {
      alert(JSON.stringify(err))
    })
  }
  increment = () => {
   this.setState({count: this.state.count + 1});
  }
  render()
  {
    return(
      <View style={styles.main}>

        <View style={styles.toolbar}>
          <Text style={styles.text}>News App</Text>
          <Text style={styles.text}>MORE</Text>
        </View>
      
      <FlatList
      data={this.state.articles}
      renderItem={({item}) => {
        return(
          <View style={styles.box}>
              <Image 
              source={{uri: item.urlToImage}}
              style={{height: 200, width: "100%"}}
              />
              <View style={styles.textView}>
                <Text style={styles.up}>{item.author}</Text>
                <Text style={styles.up}>{moment(item.publishedAt).fromNow()}</Text>
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
          </View>
        )
      }}
      keyExtractor={item => item.title}
       />
      </View>
    )
  }
}

export default App;


const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  toolbar: {
    height: 60,
    flexDirection: "row",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 8,
    padding: 10
  },
  text: {
    fontSize: 20,
    color: "#ffffff"
  },
  box: {
    borderWidth: 1,
    borderColor: "#ffffff",
    padding: 10,
    backgroundColor: "#ffffff",
    elevation: 3,
    marginTop:5,
    marginHorizontal: 5
  },
  textView: {
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  up: {
    fontSize: 15,
 
  }
})