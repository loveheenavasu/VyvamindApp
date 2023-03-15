import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, TextInput } from "react-native";


const Test = () => {
    const [count, setCount] = useState(1);

    return (
        <SafeAreaView>
            <View style={{ width: "100%", height: "100%", }} >
                <TextInput
                    style={{ width: "100%", height: 45, borderRadius: 5, borderWidth: 1, borderColor: "grey" }}
                />
                <TouchableOpacity
                    style={{ width: 100, height: 45, borderRadius: 10, backgroundColor: "red" }}
                >
                    <Text>add Number</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

export default Test;