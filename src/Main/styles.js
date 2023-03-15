import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        fontSize: scale(23),
        fontWeight: 'bold',
        marginBottom: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: scale(14),
        color: "#000",
        width: "58%",
        opacity: .8

    },
    picker: {
        flex: 1,
    },
    timePicker: {
        fontSize: 18,
        color: '#007bff',
    },
    switch_Con: {
        width: "30%",
        marginLeft: "10%",
        justifyContent: "center",
        alignItems: "center"
    },
    picker_Label: {
        fontSize: scale(14),
        color: "#000"
    },
    time_Con: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center"
    },
    time_Label: {
        fontSize: scale(14),
        color: "#000"
    }
});

export default styles;