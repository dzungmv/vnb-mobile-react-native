import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsSC from '../../screens/products';
import AccessoriesProductsSC from '../../screens/products/accessories';
import BackpackProductsSC from '../../screens/products/backpack';
import BagProductsSC from '../../screens/products/bag';
import PantProductsSC from '../../screens/products/pant';
import ProductDetails from '../../screens/products/product-details';
import RacketProductsSC from '../../screens/products/racket';
import ShirtProductsSC from '../../screens/products/shirt';
import ShoesProductsSC from '../../screens/products/shoes';
import SkirtProductsSC from '../../screens/products/skirt';

const Stack = createNativeStackNavigator();
export const ProductStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='ProductsStack' component={ProductsSC} />
            <Stack.Screen name='ProductDetails' component={ProductDetails} />
            <Stack.Screen name='RacketProducts' component={RacketProductsSC} />
            <Stack.Screen name='ShoesProducts' component={ShoesProductsSC} />
            <Stack.Screen name='ShirtProducts' component={ShirtProductsSC} />
            <Stack.Screen name='SkirtProducts' component={SkirtProductsSC} />
            <Stack.Screen name='PantProducts' component={PantProductsSC} />
            <Stack.Screen name='BagProducts' component={BagProductsSC} />
            <Stack.Screen
                name='BackpackProducts'
                component={BackpackProductsSC}
            />
            <Stack.Screen
                name='AccessoriesProducts'
                component={AccessoriesProductsSC}
            />
        </Stack.Navigator>
    );
};
