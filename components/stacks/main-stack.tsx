import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeSC from '../../screens/home';

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='MainFC' component={HomeSC} />
            {/* <Stack.Screen name='ProductDetails' component={ProductDetails} /> */}
        </Stack.Navigator>
    );
}
