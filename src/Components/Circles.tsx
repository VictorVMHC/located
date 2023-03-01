import React from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
interface Props{
  quantity?: 1 | 2,
  position?: 'top' | 'bottom' | 'both'
}
export const Circles = ({quantity = 2, position = 'both'}: Props) => {

  const {height, width} = useWindowDimensions();
  
  return (
    <View style={{position: 'absolute', width: width, height: height}}>
      {quantity == 1 
        && (position == 'both' || position == 'bottom' ) 
        && <View style={styles.ellipse6} ></View>
      } 
      {quantity == 1 
        && (position == 'both' || position == 'top' ) 
        && <View style={styles.ellipse5} ></View>
      } 
      {quantity == 2 
        && (position == 'both' || position == 'bottom' ) 
        && <View style={styles.ellipse1} ></View>
      } 
      {quantity == 2 
        && (position == 'both' || position == 'bottom' ) 
        && <View style={styles.ellipse2} ></View>
      }
      {quantity == 2 
        && (position == 'both' || position == 'top' ) 
        && <View style={styles.ellipse3} ></View>
      } 
      {quantity == 2 
        && (position == 'both' || position == 'top' ) 
        && <View style={styles.ellipse4} ></View>
      }  
      
    </View>
  )
}

const styles = StyleSheet.create({
ellipse1: {
  width: 350,
  height: 350,
  backgroundColor: 'rgba(255, 198, 0, .20)',
  position: 'absolute',
  borderRadius: 175,
  alignSelf: 'stretch',
  left: -120,
  bottom: -200,
},
ellipse2: {
  width: 500,
  height: 500,
  backgroundColor: 'rgba(255, 198, 0, .20)',
  position: 'absolute',
  borderRadius: 250,
  alignSelf: 'stretch',
  right: -200,
  bottom: -300,
},
ellipse3: {
  width: 500,
  height: 500,
  backgroundColor: 'rgba(255, 198, 0, .20)',
  position: 'absolute',
  borderRadius: 250,
  alignSelf: 'stretch',
  left: -100,
  top: -350,
},
ellipse4: {
  width: 350,
  height: 350,
  backgroundColor: 'rgba(255, 198, 0, .20)',
  position: 'absolute',
  borderRadius: 175,
  alignSelf: 'stretch',
  right: -120,
  top: -250,
},

ellipse5: {
  width: 500,
  height: 500,
  backgroundColor: 'rgba(255, 198, 0, .20)',
  position: 'absolute',
  borderRadius: 250,
  alignSelf: 'stretch',
  left: -50,
  top: -300,
},
ellipse6: {
  width: 500,
  height: 500,
  backgroundColor: 'rgba(255, 198, 0, .20)',
  position: 'absolute',
  borderRadius: 250,
  alignSelf: 'stretch',
  left: -50,
  bottom: -300,
}
})