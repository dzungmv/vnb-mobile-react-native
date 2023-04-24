import { AntDesign, Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import CartSC from '../../screens/cart';
import NofiicationsSC from '../../screens/notifications';
import OrderSC from '../../screens/order';
import PersonalSC from '../../screens/personal';
import { CartStack } from '../stacks/cart-stack';
import { HomeStack } from '../stacks/home-stack';
import { ProductStack } from '../stacks/product-stack';
import { UserTypes } from '../types';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    const user: UserTypes = useSelector((state: any) => state.user.user);

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
                name='Products'
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
                component={CartStack}
            />

            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name='tags'
                            size={30}
                            color={focused ? '#FF2461' : 'gray'}
                        />
                    ),
                }}
                name='Ordering'
                component={OrderSC}
            />

            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarBadge: !user?.user?.verified ? '!' : undefined,
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
