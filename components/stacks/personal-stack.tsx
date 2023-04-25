import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllOrderedSC from '../../screens/order/all-ordered';
import OrderedDetailsSC from '../../screens/order/ordered-details';
import PersonalSC from '../../screens/personal';
import RacketProductsSC from '../../screens/products/racket';

const Stack = createNativeStackNavigator();

export const PersonalStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='PersonalStack' component={PersonalSC} />
            <Stack.Screen name='AllOrderedStack' component={AllOrderedSC} />
            <Stack.Screen
                name='OrderedDetailsStack'
                component={OrderedDetailsSC}
            />
        </Stack.Navigator>
    );
};
