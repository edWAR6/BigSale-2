import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from 'react-native';
import api from './api/dealsService';
import Deals from './components/deals';
import Detail from './components/detail';

export default function App() {
  const [ deals, setDeals ] = useState([]);
  const [ currentDealId, setCurrentDealId ] = useState(null);

  const titleXPos = new Animated.Value(0);

  useEffect(() => {
    (async () => {
      animateTitle();
      const deals = await api.fetchInitialDeals();
      // console.info(deals);
      setDeals(deals);
    })();
  }, []);

  const getCurrentDeal = () => deals.find(deal => deal.key === currentDealId);

  const unsetCurrentDealId = () => setCurrentDealId(null);

  const animateTitle = (direction = 1) => {
    // console.log('animating');
    const width = (Dimensions.get('window').width - 200) / 2;
    Animated.timing(titleXPos, {
      toValue: direction * width,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        animateTitle(direction * -1);
      }
    });
  };

  return (
    <>
      {
        currentDealId ? (
          <View style={styles.main}>
            <Detail deal={getCurrentDeal()} onBack={unsetCurrentDealId} />
          </View>
        ) : deals.length > 0 ? (
          <Deals deals={deals} onItemPress={setCurrentDealId} />
        ) : (
          <Animated.View style={[{ left: titleXPos }, styles.container]}>
            <Text style={styles.header}>BigSale App!</Text>
          </Animated.View>
        )
      }
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40
  },
});
