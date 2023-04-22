import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetails from '../../screens/products/product-details';
import TabNavigation from '../tabs/TabNavigation';

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='Root' component={TabNavigation} />
        </Stack.Navigator>
    );
}
