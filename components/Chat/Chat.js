//Import
import { addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import MapView from "react-native-maps"
//import React Native components
import { StyleSheet, View, Text, Platform, 
    KeyboardAvoidingView, Alert, InputAccessoryView } from "react-native"
//import Gifted Chat components
import { GiftedChat, Bubble, Day, dayjs, InputToolbar } from "react-native-gifted-chat";

//Import self-made components
import { CustomActions } from "../CustomActions/CustomActions";

export const Chat = ({ route, navigation, db, isConnected, storage }) => {
    //Passing props from 'Start.js'
    const { name } = route.params;
    const { backgroundColor } = route.params
    const { userID } = route.params
    const dark = ["#090C08", "#474056", "#8A95A5"]

    //declare states here
    const [messages, setMessages] = useState([])


    let unsubMessages;
    useEffect(() => {
        if (isConnected === true) {
            /*The code orders the messages by time in descending order, so the most 
            recent message will be shown in the chat at the bottom */
            unsubMessages = onSnapshot(query(collection(db, "messages"),
            orderBy("createdAt", "desc")), (documentsSnapshot) => {
                let message = [];
                documentsSnapshot.forEach(doc => {
                    message.push({ id: doc.id, ...doc.data()})
                    let lastMessage = message[message.length - 1]
                    let newDate = new Date(lastMessage.createdAt.seconds * 1000 
                        + lastMessage.createdAt.nanoseconds/1000000)
                    lastMessage.createdAt = newDate;
                });
                storeMessages(message)
                setMessages(message)
    
                //Clean up code
                return () => {
                    if(unsubMessages) unsubMessages()
                }
            },
            (error) => {
                Alert.alert(`Something gone wrong \n Error:${error}`)
            })
        } else {
            loadCachedMessages();
        }
    }, [])

    useEffect(() => {
        //Setting the title to 'name'
        navigation.setOptions({ title: name })
    }, [])

    //Store messages locally
    const storeMessages = async (message) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(message))
        } catch (error) {
            console.log(error)
        }
    }

    //Get locally stored messages when device isn't connected to a network
    const loadCachedMessages = async() => {
        try{
            const cachedMessages = await AsyncStorage.getItem("messages") || [];
            setMessages(JSON.parse(cachedMessages))
        } catch (error) {
            console.log(error)
        }
    }

    //Function to set the message bubbles' color
    const renderBubble = (props) => {
        if (backgroundColor === "#090C08") {
            return <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#647596"
                    },
                    left: {
                        backgroundColor: "#FFF"
                    }
                }}
            />
        } else if (backgroundColor === "#474056") {
            return <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#727637"
                    },
                    left: {
                        backgroundColor: "#FFF"
                    }
                }}
            />
        } else if (backgroundColor === "#8A95A5") {
            return <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#000"
                    },
                    left: {
                        backgroundColor: "#FFF"
                    }
                }}
            />
        } else if (backgroundColor === "#B9C6AE") {
            return <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#000"
                    },
                    left: {
                        backgroundColor: "#4a4c87"
                    },
                }}
                textStyle={{
                    left: {
                        color: '#FFF'
                    }
                }}
            />
        }
    }

    //render readable system messages at different background colors
    const renderSystemMessage = (props) => {
        if (dark.includes(backgroundColor)) {
            return (
                <View style={[styles.container, 
                    styles.systemContainer]}
                >
                    <View>
                        <Text
                            {...props}
                            style={styles.systemTextDark}
                        >{props.currentMessage.text}</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={[styles.container,
                    styles.systemContainer]}
                >
                    <View>
                        <Text
                            {...props}
                            style={styles.systemTextLight}
                        >{props.currentMessage.text}</Text>
                    </View>
                </View>
            )
        }
    }

    //Add custom color to message dates
    const renderDay = (props) => {
        if(dark.includes(backgroundColor)) {
            return <Day 
                {...props} 
                textStyle={{
                    color: '#FFF',
                    opacity: 0.8
                }}/>
        } else {
            return <Day 
                {...props} 
                textStyle={{
                    color: '#000',
                    opacity: 0.8
                }}/>
        }
    }  

    //Add new messages to the existing messages
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    }

    //Render and input bar or a text depending on the network status
    const renderInputToolbar = (props) => {
        if (isConnected === true) return <InputToolbar {...props} />;
        else return (
            dark.includes(backgroundColor) ? (
                <Text style={styles.systemTextDark}>No network connection</Text>
                ) : (<Text style={styles.systemTextLight}>No network connection</Text>)
        );
    }

    const renderCustomActions = (props) => {
        return <CustomActions {...props} storage={storage} />;
    }

    const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView 
                    style={{ 
                        width: 150, 
                        height: 100, 
                        borderRadius: 13, 
                        margin: 10
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            )
        }
        return null;
    }

    return (
        <>
            {/* Setting the background color to 'backgroundColor' prop\*/}
            <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                <GiftedChat
                    messages={messages}
                    renderBubble={renderBubble}
                    onSend={messages => onSend(messages)}
                    renderActions={renderCustomActions}
                    renderSystemMessage={renderSystemMessage}
                    renderDay={renderDay}
                    renderUsernameOnMessage={true}
                    renderInputToolbar={renderInputToolbar}
                    renderCustomView={renderCustomView}
                    user={{
                        _id: userID,
                        name: name
                    }}
                />
                {/* Doesn't let keyboard to cover components on the view\*/}
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    systemContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    systemTextLight: {
        color: '#000',
        opacity: 0.8
    },
    systemTextDark: {
        color: '#FFF',
        opacity: 0.8
    }
})