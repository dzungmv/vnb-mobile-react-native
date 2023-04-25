import type { CompositeNavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { kawasaki, yonex } from '../../assets';
import HeaderCmp from '../../components/common/header';
import LoadingScreen from '../../components/common/loading-screen';
import { UserTypes } from '../../components/types';
import CatalogCmp from './catalog';

const HomeSC: React.FC = () => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();

    const user: UserTypes = useSelector((state: any) => state.user.user);
    const [pendingVerify, setPendingVerify] = useState<boolean>(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            bottomTabBarVisible: true,
        });
    }, []);

    useEffect(() => {
        if (!user?.user?.verified) {
            Alert.alert(
                'Account not verified',
                'Please verify your email to use our services',
                [
                    {
                        text: 'Later',
                    },
                    {
                        text: 'Verify now',
                        onPress: async () => {
                            try {
                                setPendingVerify(true);
                                await axios.post(
                                    `http://localhost:8080/api/vnb/v1/auth/send-otp`,
                                    {
                                        email: user?.user?.email,
                                    },
                                    {
                                        headers: {
                                            authorization:
                                                user?.tokens?.accessToken,
                                            'x-client-id': user?.user?._id,
                                        },
                                    }
                                );
                                setPendingVerify(false);
                                navigation.navigate('AccountVerifyHomeStack');
                            } catch (error: any) {
                                setPendingVerify(false);
                                Alert.alert(
                                    'Error',
                                    error?.response?.data?.message ||
                                        'Something went wrong!'
                                );
                            }
                        },
                    },
                ]
            );
        }
    }, []);

    return (
        <SafeAreaView className='flex-1 bg-white '>
            <HeaderCmp title='Home' isHome />

            <ScrollView>
                <View className='mt-10'>
                    <CatalogCmp />
                </View>

                <View className='px-3 mt-5 flex-row items-center'>
                    <View className='w-[50%] h-[500px]'>
                        <View className='h-[60%] border border-gray-200 px-1 rounded-xl flex justify-between p-2 relative overflow-hidden'>
                            <Image
                                source={yonex}
                                resizeMode='contain'
                                className='w-[100px] h-[100px] -mt-8'
                            />

                            <View>
                                <Text className='text-base text-start '>
                                    Yonex Co., Ltd. is a Japanese sports
                                    equipment manufacturing company. Yonex
                                    produces equipment and apparel for tennis,
                                    badminton, golf, and running
                                </Text>
                            </View>
                            <View className='bg-[#3644b7] w-[100px] h-[100px] absolute z-[-1] rounded-full right-[-50] top-[-20]'></View>
                        </View>

                        <View className='h-[40%] border border-gray-200 px-1 rounded-xl mt-4 flex justify-between p-2 bg-[#f5e3c2]'>
                            <Image
                                source={kawasaki}
                                resizeMode='contain'
                                className='w-[100px] h-[100px] -mt-10'
                            />

                            <View>
                                <Text className='text-base'>
                                    KAWASAKI Badminton was founded in 1915 in
                                    Japan, and created world first carbon racket
                                    in 1983 named
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className='w-[50%] h-[500px]'>
                        <View className='h-[40%] border border-gray-200 px-1 rounded-xl flex justify-between p-2 relative z-1 overflow-hidden'>
                            <Image
                                source={yonex}
                                resizeMode='contain'
                                className='w-[100px] h-[100px] -mt-8'
                            />

                            <View>
                                <Text className='text-base text-start'>
                                    Yonex Co., Ltd. is a Japanese sports
                                    equipment manufacturing company.
                                </Text>
                            </View>

                            <View className='bg-[#925ff6] w-[100px] h-[100px] absolute z-[-1] rounded-full right-[-50]'></View>
                        </View>

                        <View className='h-[60%] border border-gray-200 px-1 rounded-xl mt-4 flex justify-between p-2 bg-[#925ff6]'>
                            <Image
                                source={kawasaki}
                                resizeMode='contain'
                                className='w-[100px] h-[100px] -mt-10'
                            />

                            <View>
                                <Text className='text-base'>
                                    KAWASAKI Badminton was founded in 1915 in
                                    Japan, and created world first carbon racket
                                    in 1983 named
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {pendingVerify && <LoadingScreen />}
        </SafeAreaView>
    );
};

export default HomeSC;
