import React,{useEffect,useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import SignupScreen from './screens/Signup';
import LoginScreen from './screens/Login';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth'
import HomeScreen from './screens/Home';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ChatScreen from './screens/Chat';
import firestore from '@react-native-firebase/firestore'



const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
  },
};


const Stack = createStackNavigator();

const Navigation = ()=>{
  const [user,setuser] = useState('')
  useEffect(()=>{
   const unregister =  auth().onAuthStateChanged(userExist=>{
      if(userExist){
       
        firestore().collection('users')
        .doc(userExist.uid)
        .update({
          status:"online"
        })
        setuser(userExist)


      } 
 
      else setuser("")
    })

    return ()=>{
      unregister()
    }

  },[])


  
  return (
    <NavigationContainer>
      <Stack.Navigator
         screenOptions={{
          headerTintColor:"#AA336A"
        }}
      
      >
        {user?
        <>
        <Stack.Screen name="home" options={{
            headerRight:()=><MaterialIcons
            name="account-circle"
            size={34}
            color="#AA336A"
            style={{marginRight:10}}
            onPress={()=>auth().signOut()}
                
            />,
            title:"Klann"
        }}>
        {props =><HomeScreen {...props} user={user} />}
        
        </Stack.Screen>
        <Stack.Screen name="chat" options={({route})=>({title:route.params.name})}>
          {props=><ChatScreen {...props} user={user}/>}
        </Stack.Screen>
        </>
        :
        <>
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="signup" component={SignupScreen} options={{headerShown:false}}/>
        </>
      }
        
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const App = () => {


  return (
    <>
      <PaperProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="green" />
       <View style={styles.container}>
         <Navigation />
       </View>
      </PaperProvider>

    </>
  );
};

const styles = StyleSheet.create({
   container:{
     flex:1,
     backgroundColor:"white"
   }
});

export default App;