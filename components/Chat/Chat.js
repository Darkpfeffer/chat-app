//Import
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from "react-native"
import { GiftedChat, Bubble, Day } from "react-native-gifted-chat";

export const Chat = ({ route, navigation }) => {
    //Passing props from 'Start.js'
    const { name } = route.params;
    const { backgroundColor } = route.params
    const dark = ["#090C08", "#474056", "#8A95A5"]

    //declare states here
    const [messages, setMessages] = useState([])

    useEffect(() => {
        //Add static messages to "messages" state
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://avatarfiles.alphacoders.com/490/thumb-49027.jpg"
                },
            },
            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
            },
        ])
    }, [])

    useEffect(() => {
        //Setting the title to 'name'
        navigation.setOptions({ title: name })
    }, [])

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
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, newMessages)
        )
    }

    return (
        <>
            {/* Setting the background color to 'backgroundColor' prop\*/}
            <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                <GiftedChat
                    messages={messages}
                    renderBubble={renderBubble}
                    onSend={messages => onSend(messages)}
                    renderSystemMessage={renderSystemMessage}
                    renderDay={renderDay}
                    user={{
                        _id: 1
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