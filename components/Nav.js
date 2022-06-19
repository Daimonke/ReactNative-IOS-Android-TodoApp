import React from 'react'
import { Button, View } from 'react-native'
import { Text } from 'react-native-paper'

const Nav = ({ navigation }) => {
    return (
        <View>
            <Text>Hello</Text>
            <Button title="Add" onPress={() => navigation.navigate('Add')} />
        </View>
    )
}

export default Nav