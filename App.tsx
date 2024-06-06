import React from 'react'
import MyComponent from './src/MyComponent'
import { View, StyleSheet } from 'react-native'
import SearchData from './src/SearchListData';


const App = () => {
  return (
    <View style={styles.container}>
      <MyComponent data={SearchData} />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})