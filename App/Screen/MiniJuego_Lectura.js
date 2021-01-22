import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, LayoutAnimation, Button, } from 'react-native';
import Sound from 'react-native-sound';

import Lectura_item from '../Components/MiniJuego_Lectura_items/Lectura_item.js'
import Header from '@components/Header'

import ModalEjercicio from '@screen/ModalEjercicio'
import listaCuentos from '@cuentos/listaCuentos'
import AsyncStorage from '@react-native-community/async-storage'

export default class MiniJuego_Lectura extends Component {

    constructor(props) {
      super();
      this.state = { 
        valueArray: [], 
        disabled: false, 
        personaje: 0, 
        mostrarModal : false,
        pregEnun: " ",
        preg1: " ",
        preg2: " ",
        preg3: " ",
        resp: " ",
        progreso: 0,
        addprogress: 0,
      }
      this.addNewEle = false;
      this.index = 0;
      this.indiceImg = Math.random() * (5 - 0) + 0
      //console.log(props.route.params.arrObj[props.route.params.id_cuento])
      //console.log(props.route.params)
      //console.log(Object.keys(listaCuentos[this.props.route.params.id_cuento])[1])
    }

    afterAnimationComplete = () => {
      this.index += 1;
      this.setState({ disabled: false });
    }
  
    addMore = () => {
      this.addNewEle = true;
      //Evaluar si la key es una pregunta, es es así mostrar el modal
      let auxkey = Object.keys(listaCuentos[this.props.route.params.id_cuento])[this.state.personaje];
      let cadKey = String(auxkey);

      cadKey = cadKey.split("_",1)[0]; 

      if( cadKey == "pregunta"){
        this.setState({
          pregEnun: listaCuentos[this.props.route.params.id_cuento][auxkey].p, 
          preg1: listaCuentos[this.props.route.params.id_cuento][auxkey].a,
          preg2: listaCuentos[this.props.route.params.id_cuento][auxkey].b,
          preg3: listaCuentos[this.props.route.params.id_cuento][auxkey].c,
          resp: listaCuentos[this.props.route.params.id_cuento][auxkey].respuesta,
          addprogress: listaCuentos[this.props.route.params.id_cuento][auxkey].progreso,
        });
     
        this.setState({mostrarModal: true});
        

      }else if(cadKey == "fin"){

        const storeData = async (value) => {
          try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@items_key', jsonValue)
          } catch (e) {
            console.log("no se pudo guardar");
          }
        }
  
        //recuperar el objeto del cuento
        var obj = this.props.route.params.arrObj[this.props.route.params.id_cuento]
        var numLecs = obj['numLec'];
        if( obj['pc'] == 100 ){
          //No se hace nada
        }else{
        obj['pc'] = obj['pc'] + (100/numLecs);
        storeData(this.props.route.params.arrObj);
        }
          var whoosh = new Sound('lesson_complete.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
              console.log('failed to load the sound', error);
              return;
            }
            
            whoosh.play((success) => {
              if (success) {
                //console.log('successfully finished playing');
              } else {
                //console.log('playback failed due to audio decoding errors');
              }
            });
          });
            this.props.navigation.goBack()
        
      }
      else{
        let cad = Object.values(listaCuentos[this.props.route.params.id_cuento])[this.state.personaje];
        const newlyAddedValue = { id: "id_" + this.index, text: cad };
    
        this.setState({
          disabled: true,
          valueArray: [...this.state.valueArray, newlyAddedValue]
        });
      }
      
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

    incrementarPersonaje = () => {
      this.setState((state) => {
        // Importante: lee `state` en vez de `this.state` al actualizar.
        return {personaje: state.personaje + 1}
      });
    }

    desactivarModal = () => {
      this.setState( (state) => {
        this.setState( { mostrarModal: false} )
      })
    }

    incrementarProgreso = () => {
      this.setState( (state) => {
        this.setState({progreso: state.progreso+state.addprogress, personaje: state.personaje+1});
      })
    }

    pruebaprogreso = () => {
      
      if( this.state.progreso == 110 ){
        var whoosh = new Sound('lesson_complete.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          
          // Play the sound with an onEnd callback
          whoosh.play((success) => {
            if (success) {
              //console.log('successfully finished playing');
            } else {
              //console.log('playback failed due to audio decoding errors');
            }
          });
        }); 

        this.props.navigation.goBack()
      }else{
        var antes = this.state.progreso
        this.setState({progreso: antes+10})}
    }
    
    render() {


      return (
        
        
        <View style={styles.container} >
        <Header navigation={this.props.navigation} progreso={this.state.progreso} indexImg={this.indiceImg} nombre={this.props.route.params.nombre}/>  
          
          <ScrollView
            ref={scrollView => this.scrollView = scrollView}
            onContentSizeChange={() => {
              this.addNewEle && this.scrollView.scrollToEnd();
            }}
          >
            
            <View style={{ flex: 1, padding: 4 }}>
              {this.state.valueArray.map(ele => {
                return (
                  <Lectura_item
                    key={ele.id}
                    quienHabla={Object.keys(listaCuentos[this.props.route.params.id_cuento])[this.state.personaje]}
                    item={ele}
                    clikHandler = {this.incrementarPersonaje}
                    removeItem={(id) => this.remove(id)}
                    afterAnimationComplete={this.afterAnimationComplete}
                  />
                )
              })}
            </View>
          </ScrollView>
          
          <ModalEjercicio mostrar={this.state.mostrarModal} accionCerrarModal={this.desactivarModal}
            enunciado={this.state.pregEnun}
            pregunta1={this.state.preg1}
            pregunta2={this.state.preg2}
            pregunta3={this.state.preg3}
            respuesta={this.state.resp}
            accionIncrementar={this.incrementarProgreso}
          />
          
          

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