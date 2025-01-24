import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';

const onboardingData = [
  { title: 'Trusted by millions of people, part of one', image: require('@/assets/images/Coinpay_Img_Three.png') },
  { title: 'Spend money abroad, and track your expense', image: require('@/assets/images/Coinpay_Img_Two.png') },
  { title: 'Receive Money From Anywhere In The World', image: require('@/assets/images/Coinpay_Img_One.png') },
];

const { width } = Dimensions.get('window');

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  const renderDotIndicator = () => (
    <View style={styles.dotContainer}>
      {onboardingData.map((_, idx) => (
        <View key={idx} style={[styles.dot, currentIndex === idx && styles.activeDot]} />
      ))}
    </View>
  );

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const nextIndex = currentIndex < onboardingData.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex);
    flatListRef.current.scrollToIndex({ index: nextIndex });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
      {renderDotIndicator()}
      <Text style={styles.title}>{onboardingData[currentIndex].title}</Text>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 100,
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 30,
    height: 5,
    borderRadius: 10,
    backgroundColor: '#ccc',
    marginHorizontal: 3,
  },
  activeDot: {
    width: 10,
    height: 7,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    width: '80%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default App;