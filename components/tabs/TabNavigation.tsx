import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import MainStack from '../stacks/main-stack';
import CartSC from '../../screens/cart';
import PersonalSC from '../../screens/personal';
import NofiicationsSC from '../../screens/notifications';
import ProductsSC from '../../screens/products';

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
                component={MainStack}
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
                name='Products'
                component={ProductsSC}
            />

            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Entypo
                            name='shopping-cart'
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
