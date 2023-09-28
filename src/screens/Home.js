import React,{useState,useEffect} from 'react'
import {View,Text,Image,FlatList,StyleSheet,TouchableOpacity} from 'react-native'
import firestore from '@react-native-firebase/firestore'

export default function Home({user,navigation}){
    
    const [users,setUsers] = useState(null)
    const getUsers = async ()=>{
             const querySanp = await firestore().collection('users').where('uid','!=',user.uid).get()
             const allusers = querySanp.docs.map(docSnap=>docSnap.data())
             setUsers(allusers)
    }
    useEffect(()=>{
        getUsers()
    },[])

    const RenderCard=({item})=>{
        return (
            <TouchableOpacity onPress={()=>navigation.navigate('chat',{name:item.name,uid:item.uid})}>
            <View style={styles.mycard}>
                <Image source={{uri:item.pic}} style={styles.img}/>
                <View>
                    <Text style={styles.text}>
                        {item.name}
                    </Text>
                    <Text style={styles.text}>
                        {item.email}
                    </Text>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
    return (
        <View>
            
            <FlatList 
              data={users}
              renderItem={({item})=> {return <RenderCard item={item} /> }}
               keyExtractor={(item)=>item.uid}
            />
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    img:{width:60,height:60,borderRadius:30,backgroundColor:"green"},
    text:{
        fontSize:18,
        marginLeft:15,
    },
    mycard:{
        flexDirection:"row",
        margin:5,
        padding:7,
        backgroundColor:"white",
        borderBottomWidth:1,
        borderBottomColor:'#AA336A'
    },
  });