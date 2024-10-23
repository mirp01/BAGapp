import { StyleSheet, View, Text } from 'react-native';
import  ButtonPrimary from '@/components/ButtonPrimary';
import { Colors } from '@/constants/Colors';

export function MainMenu() {
    return (
        <View style={styles.container}>
            <View>
                
            </View>
            <View>
                <ButtonPrimary title = 'profile' hasMargin/>
                <ButtonPrimary title = 'rewards' hasMargin />
                <ButtonPrimary title = 'rankings' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        height: "100%",
        width: "100%",
        padding: "5%",
        paddingTop: "12%",
        justifyContent: "space-between",
        flexDirection: "row",
    },
});