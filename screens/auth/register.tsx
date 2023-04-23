import { Ionicons } from '@expo/vector-icons';
import {
    Alert,
    Image,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import axios from 'axios';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Logo } from '../../assets';
import LoadingScreen from '../../components/common/loading-screen';
import { setUser } from '../../components/_redux/user/userSlice';
import {
    CompositeNavigationProp,
    useNavigation,
} from '@react-navigation/native';

const RegisterSC: React.FC = () => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch();

    const nameRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);

    const validateEmail = (email: string) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleRegister = async () => {
        if (name.length === 0) {
            Alert.alert(
                'Name is required',
                'Please enter your name to continue'
            );
            nameRef?.current?.focus();
            return;
        }

        if (email.length === 0) {
            Alert.alert(
                'Email is required',
                'Please enter your email to continue'
            );
            emailRef?.current?.focus();
            return;
        }

        if (password.length === 0) {
            Alert.alert(
                'Password is required',
                'Please enter your password to continue'
            );
            passwordRef?.current?.focus();
            return;
        }

        if (confirmPassword.length === 0) {
            Alert.alert(
                'Confirm is required',
                'Please confirm your password to continue'
            );
            confirmPasswordRef?.current?.focus();
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert(
                'Password does not match',
                'Please confirm your password to continue'
            );
            confirmPasswordRef?.current?.focus();
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Invalid email', 'Please enter a valid email');
            emailRef?.current?.focus();
            return;
        }
        6;

        try {
            setLoading(true);
            const res = await axios.post(
                'http://localhost:8080/api/vnb/v1/auth/register',
                {
                    name,
                    email,
                    password,
                }
            );

            await dispatch(setUser(res?.data?.metadata));

            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            Alert.alert('Wrong Credentials', error?.response?.data?.message);
        }
    };
    return (
        <SafeAreaView className='flex-1 relative'>
            <View className='mt-20 px-6'>
                <View className=' flex justify-center items-center'>
                    <Image className='w-[80px] h-[80px]' source={Logo} />
                </View>

                <View className='mt-10'>
                    <Text className='text-base text-gray-500'>Name</Text>
                    <TextInput
                        ref={nameRef}
                        onChangeText={setName}
                        autoCapitalize='none'
                        className='border-b-[1px] border-gray-300 py-4 text-base'
                    />
                </View>

                <View className='mt-5'>
                    <Text className='text-base text-gray-500'>Email</Text>
                    <TextInput
                        ref={emailRef}
                        onChangeText={setEmail}
                        autoCapitalize='none'
                        className='border-b-[1px] border-gray-300 py-4 text-base'
                    />
                </View>

                <View className='mt-5'>
                    <Text className='text-base text-gray-500'>Password</Text>
                    <View className=' relative'>
                        <TextInput
                            ref={passwordRef}
                            secureTextEntry={!showPassword}
                            onChangeText={setPassword}
                            autoCapitalize='none'
                            className='border-b-[1px] border-gray-300 py-4 text-base'
                        />
                        {password && password.length > 0 && (
                            <TouchableOpacity
                                onPress={() => setShowPassword((prev) => !prev)}
                                className=' absolute right-0 bottom-5'>
                                {showPassword ? (
                                    <Ionicons
                                        name='md-eye-outline'
                                        size={24}
                                        color='black'
                                    />
                                ) : (
                                    <Ionicons
                                        name='md-eye-off-outline'
                                        size={24}
                                        color='black'
                                    />
                                )}
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View className='mt-5'>
                    <Text className='text-base text-gray-500'>Password</Text>
                    <View className=' relative'>
                        <TextInput
                            ref={confirmPasswordRef}
                            secureTextEntry={!showConfirmPassword}
                            onChangeText={setConfirmPassword}
                            autoCapitalize='none'
                            className='border-b-[1px] border-gray-300 py-4 text-base'
                        />
                        {confirmPassword && confirmPassword.length > 0 && (
                            <TouchableOpacity
                                onPress={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                                className=' absolute right-0 bottom-5'>
                                {showConfirmPassword ? (
                                    <Ionicons
                                        name='md-eye-outline'
                                        size={24}
                                        color='black'
                                    />
                                ) : (
                                    <Ionicons
                                        name='md-eye-off-outline'
                                        size={24}
                                        color='black'
                                    />
                                )}
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View className='mt-10'>
                    <TouchableOpacity
                        className=' bg-green-500 rounded-lg'
                        onPress={handleRegister}>
                        <Text className='text-white text-lg font-medium py-4 rounded-lg text-center'>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text className='text-center mt-5 text-base text-gray-700'>
                        Already have an account?
                    </Text>
                </TouchableOpacity>
            </View>

            {loading && <LoadingScreen />}
        </SafeAreaView>
    );
};

export default RegisterSC;
