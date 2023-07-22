//import
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    ImageBackground,
    TouchableOpacity 
} from "react-native"

import { useState } from "react"

//import images
import SVGImg from '../../assets/icon.svg'
const BackgroundImage = require('../../assets/Background-Image.png')

export const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    //default state value is the first color what can be chosen
    const [backgroundColor, setBackgroundColor] = useState('#090C08')

    return (
        <View style={styles.container}>
            <ImageBackground
                source={BackgroundImage}
                resizeMode="cover"
                style={styles.background}
            >
                {/* Rendering the title of the View \*/} 
                <View style={[styles.container, styles.titleContainer]}>
                    <Text style={styles.title}>Chat App</Text>
                </View>
                {/* Rendering the menu \*/} 
                <View style={[styles.container, styles.menu]}>
                    {/* Rendering Textinput \*/} 
                    <View style={styles.searchStyle}>
                        <SVGImg style={styles.imageStyle}/>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Your Name"
                            style={styles.textInput}
                        />
                    </View>
                    {/* Rendering custom color possibility for chat view \*/} 
                    <View style={styles.chooseColorContainer}>
                        <Text style={[styles.textInput ,styles.chooseColor]}>Choose Background Color:</Text>
                        <View style={styles.colorContainer}>
                            <TouchableOpacity 
                                style={[styles.circle, styles.black]}
                                onPress={() => {setBackgroundColor('#090C08')}}
                            ></TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.circle, styles.darkBrown]}
                                onPress={() => {setBackgroundColor('#474056')}}
                            ></TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.circle, styles.gray]}
                                onPress={() => {setBackgroundColor('#8A95A5')}}
                            ></TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.circle, styles.green]}
                                onPress={() => {setBackgroundColor('#B9C6AE')}}
                            ></TouchableOpacity>
                        </View>
                    </View>
                    {/* Rendering button to navigate to 'chat view' \*/} 
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Chat', { name: name, backgroundColor: backgroundColor })}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

//Styling is added from to the view from top-to-bottom
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: 'start',
        position: 'fixed',
        marginBottom: '7%'
    },
    searchStyle: {
        alignItems: "center",
        justifyContent: "start",
        flexDirection: "row",
        width: "88%",
        marginTop: 15,
        marginBottom: 45,
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
        width: '88%',
        alignSelf: 'flex-start',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 45
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
        marginLeft: 5
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
        height: 60,
        marginLeft: 'auto',
        marginRight: 'auto',
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