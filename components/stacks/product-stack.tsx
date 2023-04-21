import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsSC from '../../screens/products';
import ProductDetails from '../../screens/products/product-details';

const Stack = createNativeStackNavigator();

export default function ProductStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='ProductsST' component={ProductsSC} />
            <Stack.Screen name='ProductDetails' component={ProductDetails} />
        </Stack.Navigator>
    );
}
