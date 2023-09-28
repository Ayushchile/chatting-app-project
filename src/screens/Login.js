import React,{useState} from 'react'
import { View, Text ,Image,StyleSheet,KeyboardAvoidingView,TouchableOpacity,ActivityIndicator} from 'react-native'
import { TextInput,Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth'
export default function SignupScreen({navigation}) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    if(loading){
        return  <ActivityIndicator size="large" color="#AA336A" />
    }
    const userLogin = async ()=>{
        setLoading(true)
        if(!email || !password){
               alert("Please add all the fields!")
               return 
        }
        try{
          const result =  await auth().signInWithEmailAndPassword(email,password)
            setLoading(false)
        }catch(err){
            alert("Something went wrong... Please try again!")
        }
       

    }
    return (
        <KeyboardAvoidingView behavior="position">
            <View style={styles.box1}>
                <Text style={styles.text}>Welcome to Klann!</Text>
                <Image style={styles.img} source={require('../assets/klann.png')} />
            </View>
            <View style={styles.box2}>
            
                 <TextInput label="Email" value={email} onChangeText={(text)=>setEmail(text)} mode="outlined"/>
                <TextInput label="Password" mode="outlined" value={password} onChangeText={(text)=>setPassword(text)} secureTextEntry/>
                 <Button mode="contained" onPress={()=>userLogin()} >Login</Button>
                <TouchableOpacity onPress={()=>navigation.navigate('signup')}><Text style={{textAlign:"center"}}>Don't have an account ?</Text></TouchableOpacity>
               
            </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    text:{
        fontSize:22,
        color:"#AA336A",
        margin:10
    },
    img:{
        width:200,
        height:200
    },
    box1:{
        alignItems:"center"
    },
    box2:{
        paddingHorizontal:40,
        justifyContent:"space-evenly",
        height:"50%"
    }
 });