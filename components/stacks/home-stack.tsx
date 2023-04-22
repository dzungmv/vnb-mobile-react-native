import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeSC from '../../screens/home';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='HomeStack' component={HomeSC} />
            {/* <Stack.Screen name='ProductDetails' component={ProductDetails} /> */}
        </Stack.Navigator>
    );
};
