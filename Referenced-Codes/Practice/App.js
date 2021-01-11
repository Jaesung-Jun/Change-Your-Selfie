import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Animated} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  state={  
    progressStatus: 0,  
}  
anim = new Animated.Value(0);  
componentDidMount(){  
    this.onAnimate();  
}  
onAnimate = () =>{  
    this.anim.addListener(({value})=> {  
        this.setState({progressStatus: parseInt(value,10)});  
    });  
    Animated.timing(this.anim,{  
         toValue: 100,  
         duration: 5000,                      // loadingBar timing
    }).start();  
} 

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerText}> 선택한 이미지</Text>
          </View>


          <View style={styles.showImage}>
              {/* where to put image */}
          </View>


          <View style={styles.loadingState}>
              <Text style={styles.loadingLabel}>Loading...</Text>
          </View>

          <View style={styles.loadingBar}>  
              <Animated.View  
                style={[  
                    styles.inner,{width: this.state.progressStatus +"%"},   
                ]}  
              />  
              <Animated.Text style={styles.label}>  
                    {this.state.progressStatus }%
              </Animated.Text>  
          </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
      width: '100%',
      height: '15%',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
  },
  headerText: {
      fontSize: 30,
      color: 'black',
      fontWeight: 'bold',
  },
  showImage: {
      width: '85%',
      height: '40%',
  },
  loadingState: {
    width: '100%',
    height: '5%',
    paddingLeft: "12%",
    paddingBottom: 5,
    justifyContent: 'flex-end',
  },
  loadingLabel: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    flexDirection: 'row',
  },
  loadingBar: {  
    width: "80%",  
    height: 40,
    padding: 3,  
    borderColor: "#FAA",  
    borderWidth: 3,  
    borderRadius: 30,
    marginLeft: "10%",
    justifyContent: "center",
  },  
  inner:{  
    width: "100%",  
    height: 30,  
    borderRadius: 15,  
    backgroundColor:"#AAff10",  
  },  
  label:{  
    fontSize:23,  
    color: "black",  
    position: "absolute",  
    zIndex: 1,  
    marginLeft: 10,
    alignSelf: "center",  
  }, 
});





// ***ActivityIndicator spinner***

// import React from "react";
// import { ActivityIndicator, StyleSheet, View } from "react-native";

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={[styles.container, styles.horizontal]}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <ActivityIndicator size="small" color="#00ff00" />
//         <ActivityIndicator size="large" color="#0000ff" />
//         <ActivityIndicator size="small" color="#00ff00" />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center"
//   },
//   horizontal: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     padding: 10
//   }
// });