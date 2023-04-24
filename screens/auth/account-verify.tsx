import {
    CompositeNavigationProp,
    useNavigation,
} from '@react-navigation/native';
import axios from 'axios';
import { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../../components/common/loading-screen';
import { UserTypes } from '../../components/types';
import { setVerified } from '../../components/_redux/user/userSlice';

const AccountVerifySC = () => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();
    const dispatch = useDispatch();
    const user: UserTypes = useSelector((state: any) => state.user.user);

    const [otp, setOtp] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const [loadingResend, setLoadingResend] = useState<boolean>(false);

    const HANDLE = {
        resendOTP: async () => {
            try {
                setLoadingResend(true);
                await axios.post(
                    `http://localhost:8080/api/vnb/v1/auth/send-otp`,
                    {
                        email: user?.user?.email,
                    },
                    {
                        headers: {
                            authorization: user?.tokens?.accessToken,
                            'x-client-id': user?.user?._id,
                        },
                    }
                );
                setLoadingResend(false);
                Alert.alert(
                    'Resend OTP successfully',
                    'Please check your email to get new OTP code!'
                );
            } catch (error: any) {
                setLoadingResend(false);
                Alert.alert(
                    'Error',
                    error?.response?.data?.message || 'Something went wrong!'
                );
            }
        },

        verifyAccount: async () => {
            if (!otp || otp.length < 6) {
                Alert.alert('Error', 'OTP must be 6 digists!');
                return;
            }

            try {
                setLoading(true);
                await axios.post(
                    `http://localhost:8080/api/vnb/v1/auth/verify-account`,
                    {
                        otp,
                        email: user?.user?.email,
                    },
                    {
                        headers: {
                            authorization: user?.tokens?.accessToken,
                            'x-client-id': user?.user?._id,
                        },
                    }
                );

                await dispatch(setVerified(true));
                setLoading(false);
                Alert.alert(
                    'Verify account successfully',
                    'You can use our services now!'
                );
                navigation.push('Root');
            } catch (error: any) {
                setLoading(false);
                Alert.alert(
                    'Error verify account',
                    error?.response?.data?.message || 'OTP is invalid!'
                );
            }
        },
    };
    return (
        <SafeAreaView className='flex-1 bg-whit flex items-center justify-center'>
            <View className='flex items-center justify-center px-7'>
                <Text className=' text-[32px] font-semibold'>
                    Verify account
                </Text>
                <Text className='text-center mt-6 text-base'>
                    We have sent a verification code to your email. Please check
                    your email and enter the code below to verify your account.
                </Text>
            </View>

            <View className='mt-24'>
                <TextInput
                    placeholder='Enter your OTP code'
                    keyboardType='numeric'
                    maxLength={6}
                    onChangeText={(text) => setOtp(text)}
                    className='border text-2xl text-center py-4 px-20 border-gray-400 rounded-xl'
                />
            </View>

            <View className='px-14 mt-5'>
                <TouchableOpacity
                    className=' px-16 rounded-xl bg-green-500'
                    onPress={HANDLE.verifyAccount}>
                    <Text className='text-center text-2xl text-white py-4 '>
                        Verify
                    </Text>
                </TouchableOpacity>
            </View>

            <View className='px-10 mt-10 flex-row justify-center items-center'>
                <Text className='text-lg text-center'>
                    Didn't receive the code?
                </Text>
                <TouchableOpacity className='ml-2' onPress={HANDLE.resendOTP}>
                    <Text className='text-lg text-violet-500'>Resend code</Text>
                </TouchableOpacity>
            </View>

            {(loading || loadingResend) && <LoadingScreen />}
        </SafeAreaView>
    );
};

export default AccountVerifySC;
