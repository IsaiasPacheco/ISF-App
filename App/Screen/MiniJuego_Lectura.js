import React, { Component } from 'react';
import { AppRegistry,TouchableOpacity, View, StyleSheet, ScrollView, Image, LayoutAnimation, Button, } from 'react-native';

import Lectura_item from '../Components/MiniJuego_Lectura_items/Lectura_item.js'
import Header from '@components/Header'

export default class MiniJuego_Lectura extends Component {

    constructor() {
      super();
      this.state = { valueArray: [], disabled: false }
      this.addNewEle = false;
      this.index = 0;
    }
  
    afterAnimationComplete = () => {
      this.index += 1;
      this.setState({ disabled: false });
    }
  
    addMore = () => {
      this.addNewEle = true;
      const newlyAddedValue = { id: "id_" + this.index, text: this.index + 1 };
  
      this.setState({
        disabled: true,
        valueArray: [...this.state.valueArray, newlyAddedValue]
      });
    }
  
    remove(id) {
      this.addNewEle = false;
      const newArray = [...this.state.valueArray];
      newArray.splice(newArray.findIndex(ele => ele.id === id), 1);
  
      this.setState(() => {
        return {
          valueArray: newArray
        }
      }, () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      });
    }

    
    
    render() {
      return (
        
        <View style={styles.container} >
          
          
          <ScrollView
            ref={scrollView => this.scrollView = scrollView}
            onContentSizeChange={() => {
              this.addNewEle && this.scrollView.scrollToEnd();
            }}
          >
            <Header progreso={0} indexImg={0} />
            <View style={{ flex: 1, padding: 4 }}>
              {this.state.valueArray.map(ele => {
                return (
                  <Lectura_item
                    key={ele.id}
                    item={ele}
                    removeItem={(id) => this.remove(id)}
                    afterAnimationComplete={this.afterAnimationComplete}
                  />
                )
              })}
            </View>
          </ScrollView>
        
          <Button title="Continuar" color="#58CC00" onPress={this.addMore} /> 
        
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create(
    {
      container: {
        flex: 1,
      },
      addBtn: {
        position: 'absolute',
        right: 25,
        bottom: 25,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'white'
      },
      btnImage: {
        resizeMode: 'contain',
        width: '100%',
  
      },
    });