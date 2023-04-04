import { StyleSheet, View, Text, Image } from 'react-native'
import { scale } from 'react-native-size-matters'

export default NoInternet = () => {
    return (
        <View style={styles.main}>
            <Image
                source={require('../../assets/no-internet.png')}
                resizeMode='contain'
                style={styles.img} />
            <Text style={styles.txt}>Please check your Internet Connection</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: scale(100),
        height: scale(100)
    },
    txt: {
        fontSize: scale(16),
        marginTop: scale(10)
    }
})