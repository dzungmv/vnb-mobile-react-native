import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsSC from '../../screens/products';
import ProductDetails from '../../screens/products/product-details';

const Stack = createNativeStackNavigator();
export const ProductStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='Products' component={ProductsSC} />
            <Stack.Screen name='ProductDetails' component={ProductDetails} />
        </Stack.Navigator>
    );
};
