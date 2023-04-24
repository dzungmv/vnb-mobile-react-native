import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartSC from '../../screens/cart';
import CheckOutSC from '../../screens/cart/checkout';

const Stack = createNativeStackNavigator();

export const CartStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='CartStack' component={CartSC} />
            <Stack.Screen name='CheckoutStack' component={CheckOutSC} />
        </Stack.Navigator>
    );
};
