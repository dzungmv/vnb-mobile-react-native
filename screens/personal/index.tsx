import { AntDesign, Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';
import {
    Alert,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    CompositeNavigationProp,
    useNavigation,
} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCmp from '../../components/common/header';
import { UserTypes } from '../../components/types';
import { logout } from '../../components/_redux/user/userSlice';
import { useState } from 'react';
import axios from 'axios';
import LoadingScreen from '../../components/common/loading-screen';

const PersonalSC: React.FC = () => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();

    const user: UserTypes = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch();

    const [logoutPending, setLogoutPending] = useState<boolean>(false);

    const HANDLE = {
        logout: async () => {
            try {
                setLogoutPending(true);
                await axios.post(
                    `http://localhost:8080/api/vnb/v1/auth/logout`,
                    {},
                    {
                        headers: {
                            authorization: user.tokens.accessToken,
                            'x-client-id': user.user._id,
                        },
                    }
                );

                await dispatch(logout());
                setLogoutPending(false);
            } catch (error: any) {
                setLogoutPending(false);
                if (error?.response?.status === 401) {
                    dispatch(logout());
                }
            }
        },
    };

    return (
        <SafeAreaView className='flex-1 bg-blue-500'>
            <HeaderCmp title='Personal' titleColor='white' />

            <View className='px-4 mt-20 bg-white flex-1 rounded-t-[55px]'>
                <View className=' p-2 flex justify-center items-center -mt-12'>
                    <View className='w-[70px] h-[70px] bg-gray-200 flex justify-center items-center rounded-full relative'>
                        <View className='absolute top-0'>
                            <Entypo name='user' size={70} color='black' />
                        </View>
                    </View>

                    <Text className='ml-2 text-2xl font-bold mt-5'>
                        {user?.user?.name}
                    </Text>
                </View>

                <View className='mt-4'>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Ordered')}
                        className='w-[50%] px-4 mt-4 flex-row rounded-lg py-2 items-center'>
                        <View className='w-[40px] h-[40px] flex items-center justify-center rounded-3xl bg-red-500'>
                            <AntDesign name='tags' size={27} color='white' />
                        </View>

                        <Text className='ml-2 text-xl font-medium'>
                            Ordered
                        </Text>
                    </TouchableOpacity>
                    <View className='w-[50%] px-4 py-2 mt-4 flex-row rounded-lg'>
                        <View className='w-[40px] h-[40px] flex items-center justify-center rounded-3xl bg-violet-500'>
                            <Ionicons
                                name='cart-sharp'
                                size={27}
                                color='white'
                            />
                        </View>
                        <Text className='ml-2 text-xl font-medium'>Cart</Text>
                    </View>

                    <TouchableOpacity
                        className='w-[50%] px-4 py-2 mt-4 flex-row rounded-lg items-center'
                        onPress={HANDLE.logout}>
                        <View className='w-[40px] h-[40px] flex items-center justify-center rounded-3xl bg-black'>
                            <FontAwesome
                                name='sign-out'
                                size={27}
                                color='white'
                            />
                        </View>
                        <Text className='ml-2 text-xl font-medium'>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {logoutPending && <LoadingScreen />}
        </SafeAreaView>
    );
};

export default PersonalSC;
