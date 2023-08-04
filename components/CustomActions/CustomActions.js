//import
import { useState } from "react";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

//import React Native components
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";

export const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
    const [image, setImage] = useState(null)

    const actionSheet = useActionSheet();

    const onActionPress = () => {
        const options = ['Choose from library', 'Take picture', 'Send location',
            'Cancel'];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        getLocation();
                    default:
                }
            },
        );
    };

    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissions?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();

            if (!result.canceled) {
                const imageURI = result.assets[0].uri;
                await uploadAndSendImage(imageURI)
            } else {
                Alert.alert("Action has been canceled.");
            }
            
        } else Alert.alert("Permissions haven't been granted.")
    }

    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();

        if (permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();

            if (!result.canceled){
                let imageURI = result.assets[0].uri
                await uploadAndSendImage(imageURI)
            } else {
                Alert.alert("Action has been canceled.")
            }
        } else {
            Alert.alert("Permission haven't been granted")
        }
    }

    const uploadAndSendImage = async (imageURI) => {
        const newUploadRef = ref(storage, generateReference(imageURI));
        //Upload the image to Firebase storage
        uploadBytes(newUploadRef, await uriToBlob(imageURI)).then(async (snapshot) => {
            console.log('File has been uploaded successfully');
            //Get the URL of the uploaded image
            const imageURL = await getDownloadURL(snapshot.ref)
            onSend({ image: imageURL })
        }).catch((error) => console.log(error))
    }

    //Fetch an image URI and then blob it (a way to aviod 'fetch()')
    const uriToBlob = (uri) => {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            // If successful -> return with blob
            xhr.onload = function () {
                resolve(xhr.response);
            };
            // reject on error
            xhr.onerror = function () {
                reject(new Error('uriToBlob failed'));
            };
            // Set the response type to 'blob'
            xhr.responseType = 'blob';
            // Initialize the request
            xhr.open('GET', uri, true);
            // Send the request. The 'null' argument means that no body content is given for the request
            xhr.send(null);
        });
    }

    //generate unique image name
    const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const imageName = uri.split("/")[uri.split("/").length - 1]
        return `${userID}-${timeStamp}-${imageName}`;
    }

    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();

        if (permissions?.granted) {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
                onSend({
                    location: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude
                    },
                });
            } else Alert.alert("Error occurred while fetching location");
        } else {
            Alert.alert("Permissions to read location aren't granted");
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onActionPress}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignSelf: "center"
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
        justifyContent: 'center'
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: 'transparent',
        textAlign: 'center',
    }
});