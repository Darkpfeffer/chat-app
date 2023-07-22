import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native"

export const Chat = ({ route, navigation }) => {
    //Passing props from 'Start.js'
    const { name } = route.params;
    const { backgroundColor } = route.params 

    useEffect(() => {
        //Setting the title to 'name'
        navigation.setOptions({ title: name })
    }, [])
    return(
        <>
            {/* Setting the background color to 'backgroundColor' prop\*/}
            <View style={[styles.container, {backgroundColor: backgroundColor}]}>
                <Text>Hello Screen2!</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})