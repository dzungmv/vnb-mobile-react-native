import { AntDesign, Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CartSC from '../../screens/cart';
import NofiicationsSC from '../../screens/notifications';
import PersonalSC from '../../screens/personal';
import { HomeStack } from '../stacks/home-stack';
import { ProductStack } from '../stacks/product-stack';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#FF2461',
                tabBarInactiveTintColor: 'gray',
            }}>
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name='ios-home'
                            size={30}
                            color={focused ? '#FF2461' : 'gray'}
                        />
                    ),
                }}
                name='Home'
                component={HomeStack}
            />

            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name='dropbox'
                            size={30}
                            color={focused ? '#FF2461' : 'gray'}
                        />
                    ),
                }}
                name='RootProducts'
                component={ProductStack}
            />

            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name='cart-sharp'
                            size={30}
                            color={focused ? '#FF2461' : 'gray'}
                        />
                    ),
                }}
                name='Cart'
                component={CartSC}
            />

            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Entypo
                            name='bell'
                            size={30}
                            color={focused ? '#FF2461' : 'gray'}
                        />
                    ),
                }}
                name='Notifications'
                component={NofiicationsSC}
            />

            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome
                            name='user'
                            size={30}
                            color={focused ? '#FF2461' : 'gray'}
                        />
                    ),
                }}
                name='Profile'
                component={PersonalSC}
            />
        </Tab.Navigator>
    );
}
