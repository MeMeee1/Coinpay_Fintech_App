import React, { useState, useRef, useEffect } from 'react';  
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, ActivityIndicator, Animated } from 'react-native';  
import { useFonts } from 'expo-font'; // Ensure you import useFonts  

const onboardingData = [  
  { title: 'Trusted by millions of people, part of one', image: require('@/assets/images/Coinpay_Img_Three.png') },  
  { title: 'Spend money abroad, and track your expense', image: require('@/assets/images/Coinpay_Img_Two.png') },  
  { title: 'Receive Money From Anywhere In The World', image: require('@/assets/images/Coinpay_Img_One.png') },  
];  

const { width } = Dimensions.get('window');  

const App = () => {  
  const [loaded] = useFonts({   
    Poppins: require('@/assets/fonts/Poppins-Bold.ttf'),  
  });  

  const [currentIndex, setCurrentIndex] = useState(0);  
  const flatListRef = useRef(null);  
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value for fade effect  
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale value for button  

  // Fade in and Button scale animation  
  useEffect(() => {  
    Animated.timing(fadeAnim, {  
      toValue: 1,  
      duration: 300,  
      useNativeDriver: true,  
    }).start();  

    Animated.spring(scaleAnim, {  
      toValue: 1.1,  
      friction: 3,  
      tension: 100,  
      useNativeDriver: true,  
    }).start();  

    // Reset animations when changing slide  
    return () => {  
      fadeAnim.setValue(0);  
      scaleAnim.setValue(1);  
    };  
  }, [currentIndex]);  

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
    if (index !== currentIndex) {  
      setCurrentIndex(index);  
    }  
  };  

  const handleNext = () => {  
    const nextIndex = currentIndex < onboardingData.length - 1 ? currentIndex + 1 : 0;  
    setCurrentIndex(nextIndex);  
    flatListRef.current.scrollToIndex({ index: nextIndex });  
  };  

  // Show a loading indicator until the font is loaded  
  if (!loaded) {  
    return <ActivityIndicator size="large" color="#0000ff" />;  
  }  

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
      <Animated.View style={{ ...styles.titleContainer, opacity: fadeAnim }}>  
        <Text style={styles.title}>{onboardingData[currentIndex].title}</Text>  
      </Animated.View>  
      <TouchableOpacity   
        style={styles.button}   
        onPress={handleNext}  
        activeOpacity={0.7} // Add some feedback effect  
      >  
        <Animated.Text style={{ ...styles.buttonText, transform: [{ scale: scaleAnim }] }}>  
          {currentIndex === onboardingData.length - 1 ? "Continue" : "Next"}  
        </Animated.Text>  
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
  titleContainer: {  
    marginHorizontal: 20,  
    marginVertical: 20,  
  },  
  title: {  
    fontSize: 24,  
    textAlign: 'center',  
    fontFamily: 'Poppins',  
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
