import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import LoginSC from '../../screens/auth/login';
import RegisterSC from '../../screens/auth/register';
import StartUpSC from '../../screens/start-up';
import TabNavigation from '../tabs/TabNavigation';
import { UserTypes } from '../types';

const Stack = createNativeStackNavigator();

export default function MainStack() {
    const isLogged: UserTypes = useSelector((state: any) => state.user.user);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            {isLogged?.tokens?.accessToken ? (
                <Stack.Screen name='Root' component={TabNavigation} />
            ) : (
                <Stack.Group>
                    <Stack.Screen name='Hello' component={StartUpSC} />
                    <Stack.Screen name='Login' component={LoginSC} />
                    <Stack.Screen name='Register' component={RegisterSC} />
                </Stack.Group>
            )}
        </Stack.Navigator>
    );
}
