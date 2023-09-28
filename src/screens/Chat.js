import React,{useState,useEffect} from 'react'
import {View,Text} from 'react-native'
import { GiftedChat ,Bubble} from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'

export default function Chat({user,route}){
    const [messages, setMessages] = useState([])
    const {uid} = route.params;    //uid of user with we are chatting
    const getAllMessages= async ()=>{
        const docid= uid > user.uid? user.uid+"-"+uid : uid+"-"+user.uid
        const querySnap= await firestore().collection('chatroom')
        .doc(docid)
        .collection('messages')
        .orderBy('createdAt','desc')
        .get()
        const allmsg =querySnap.docs.map(docSnap=>{
            return {
                ...docSnap.data(),
                createdAt:docSnap.data().createdAt.toDate()
            }
            
        })
        setMessages(allmsg)
    }
    useEffect(() => {
        getAllMessages()
        
      }, [])
    
      const onSend =(messagesArray) => {
        const msg=messagesArray[0]
        const mymsg={
            ...msg,
            sentBy:user.uid,
            sentTo:uid,
            createdAt:new Date()
        }
        setMessages(previousMessages =>GiftedChat.append(previousMessages, mymsg))
        const docid= uid > user.uid? user.uid+"-"+uid : uid+"-"+user.uid //to generate same docid for two users chatting with each other

        firestore().collection('chatroom')
        .doc(docid)  //created to add security rules in future
        .collection('messages')
        .add({...mymsg, createdAt:firestore.FieldValue.serverTimestamp()}) //to get the server time bcause it will same for all users
      }
    return (
        <View style={{flex:1}}>
            <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: user.uid,
                    }}
                    renderBubble={(props)=>{
                        return <Bubble        //provide styling to sender and receiver msgs
                        {...props}
                        wrapperStyle={{
                          right: {
                            backgroundColor: "#AA336A"
                          },
                          left: {
                            backgroundColor: "pink"
                          }
                        }}
                      />
                    }}
                    />
        </View>
    )
}