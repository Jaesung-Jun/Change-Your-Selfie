import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';

class PickerComponent extends Component{

    state = {
        country:'canada'
    }

    render(){
        return (
            <View>
                <Picker
                    style={{height:50,width:250}}
                    selectedValue={this.state.country}
                    onValueChange={(val,idx)=>
                        this.setState({country:val})
                    }
		>
                    <Picker.Item label="Korea" value="korea"/>
                    <Picker.Item label="Canada" value="canada"/>
                </Picker>
            </View>
        )
    }
}
export default PickerComponent;