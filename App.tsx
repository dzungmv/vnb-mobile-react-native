import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeSC from './screens/home';
import ProductsSC from './screens/products';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={HomeSC} />
                <Tab.Screen name='Products' component={ProductsSC} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
