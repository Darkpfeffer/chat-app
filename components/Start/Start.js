//import
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Alert
} from "react-native"
import { useState } from "react"
//import firebase funcions
import { getAuth, signInAnonymously } from "firebase/auth"

//import images
import SVGImg from '../../assets/icon.svg'
const BackgroundImage = require('../../assets/Background-Image.png')

export const Start = ({ navigation, db }) => {
    const [name, setName] = useState('');
    //default state value is the first color what can be chosen
    const [backgroundColor, setBackgroundColor] = useState('#090C08')

    //Signing the user in anonimously
    const auth = getAuth();
    const AnonymousSignIn = () => {
        signInAnonymously(auth).then(
            result => {
                navigation.navigate("Chat", { name: name, backgroundColor: backgroundColor, userID: result.user.uid });
                Alert.alert("Signed in Successfully!");
            }
        ).catch((error) => {
            Alert.alert(`Unable to sign in. Please try again later! 
            \n Error: ${error}`)
        })
    } 

    return (
        <ImageBackground
            source={BackgroundImage}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.container}>
                {/* Rendering the title of the View \*/}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Chat App</Text>
                </View>
                {/* Rendering the menu \*/}
                <View style={styles.menu}>
                    {/* Rendering Textinput \*/}
                    <View style={styles.searchStyle}>
                        <SVGImg style={styles.imageStyle} />
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Your Name"
                            style={styles.textInput}
                        />
                    </View>
                    {/* Rendering custom color possibility for chat view \*/}
                    <View style={styles.chooseColorContainer}>
                        <Text style={[styles.textInput, styles.chooseColor]}>Choose Background Color:</Text>
                        <View style={styles.colorContainer}>
                            <TouchableOpacity
                                style={[styles.circle, styles.black]}
                                onPress={() => { setBackgroundColor('#090C08') }}
                            ></TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.circle, styles.darkBrown]}
                                onPress={() => { setBackgroundColor('#474056') }}
                            ></TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.circle, styles.gray]}
                                onPress={() => { setBackgroundColor('#8A95A5') }}
                            ></TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.circle, styles.green]}
                                onPress={() => { setBackgroundColor('#B9C6AE') }}
                            ></TouchableOpacity>
                        </View>
                    </View>
                    {/* Rendering button to navigate to 'chat view' \*/}
                    <TouchableOpacity
                        onPress={() => AnonymousSignIn()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
                {Platform.OS === "ios"?
                    <KeyboardAvoidingView behavior="padding" />
                : null}
            </View>
        </ImageBackground>
    )
}

//Styling is added from to the view from top-to-bottom
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%'
    },
    titleContainer: {
        justifyContent: 'start',
        marginTop: '22%'
    },
    title: {
        fontSize: 45,
        fontWeight: "600",
        color: '#fff'
    },
    menu: {
        backgroundColor: '#fff',
        width: "88%",
        height: "44%",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '7%'
    },
    searchStyle: {
        alignItems: "center",
        justifyContent: "start",
        flexDirection: "row",
        width: "88%",
        marginTop: 15,
        padding: 11,
        borderWidth: 2,
        borderColor: 'rgba(117, 112, 131, 0.5)',
    },
    imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
        opacity: 0.8
    },
    textInput: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 0.5
    },
    chooseColorContainer: {
        width: '88%'
    },
    chooseColor: {
        opacity: 1
    },
    colorContainer: {
        flexDirection: 'row'
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 5,
        marginBottom: 5
    },
    black: {
        backgroundColor: '#090C08'
    },
    darkBrown: {
        backgroundColor: '#474056'
    },
    gray: {
        backgroundColor: '#8A95A5'
    },
    green: {
        backgroundColor: '#B9C6AE'
    },
    button: {
        width: '88%',
        height: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#757083'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    }
})