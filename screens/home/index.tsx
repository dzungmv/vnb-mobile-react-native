import type { CompositeNavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';
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
        <SafeAreaView className='flex-1 bg-white'>
            <HeaderCmp title='Home' isHome />

            <View className='mt-10'>
                <CatalogCmp />
            </View>

            {pendingVerify && <LoadingScreen />}
        </SafeAreaView>
    );
};

export default HomeSC;
