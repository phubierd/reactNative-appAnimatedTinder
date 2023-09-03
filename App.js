import { StatusBar } from 'expo-status-bar';
import { Animated, Dimensions, PanResponder, StyleSheet, Text, View } from 'react-native';
import { users as usersArray } from './utils/data'
import { useCallback, useEffect, useRef, useState } from 'react';
import Card from './components/Card';
import Footer from './components/Footer';

const { width, height } = Dimensions.get('screen')

export default function App() {
  const [users, setUsers] = useState(usersArray)

  // animated value for swipe and titl
  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;

  // Panresponder config
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy })
      titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1)
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;

      if (isActionActive) {
        // Swipe the card off the screen
        Animated.timing(swipe, {
          duration: 2000,
          toValue: {
            x: direction * 500,
            y: dy
          },
          useNativeDriver: true
        }).start(removeTopCard)
      } else {
        // return the card to its original position
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5
        })
      }
    }
  })


  //remove the top card from the users array
  const removeTopCard = useCallback(() => {
    setUsers((pre) => pre.slice(1));
    swipe.setValue({
      x: 0,
      y: 0
    })
  }, [swipe])

  // handle user choice (left or right)
  const handleChoice = useCallback((direction) => {
    Animated.timing(swipe.x, {
      toValue: direction * 500,
      duration: 2000,
      useNativeDriver: true
    }).start(removeTopCard)
  }, [removeTopCard, swipe.x])

  useEffect(() => {
    if (!users.length) {
      setUsers(usersArray)
    }
  }, [users.length])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      {
        users.map(({ name, age, distance, id, image, location }, index) => {
          const isFirst = index === 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};
          return (
            <Card key={name} name={name} age={age} distance={distance} image={image} location={location} isFirst={isFirst}
              swipe={swipe}
              titlSign={titlSign}
              {...dragHandlers}
            />
          )
        }).reverse()
      }

      <Footer handleChoice={handleChoice} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
