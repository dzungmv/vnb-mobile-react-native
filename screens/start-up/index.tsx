import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import {
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Hero, Logo } from '../../assets';

const StartUpSC: React.FC = () => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    return (
        <SafeAreaView className='flex-1 bg-white relative'>
            <View className='flex-row items-center gap-4 px-5'>
                <Image
                    source={Logo}
                    className='w-[60px] h-[60px] object-cover'
                />
            </View>

            <View className='mt-5 px-5'>
                <Text className='text-[38px] text-gray-500'>
                    Enjoy shopping with
                </Text>
                <Text className='text-[42px] text-primary font-bold'>
                    VNB Shop
                </Text>

                <Text className='text-[#3c6027] mt-5'>
                    VNB Shop is a platform that helps you to buy and sell your
                    products online
                </Text>
            </View>

            <View className='w-[400px] h-[400px] rounded-full bg-[#24afc1] absolute bottom-36 -right-36'></View>
            <View className='w-[400px] h-[400px] rounded-full  bg-[#fccf47] absolute -bottom-28 -left-36'></View>

            <View className='flex-1 relative items-center justify-center'>
                <Animatable.Image
                    animation='bounceIn'
                    easing={'ease-in'}
                    source={Hero}
                    className='w-[420px] h-[370px] object-cover'
                />

                <TouchableOpacity
                    onPress={() => navigation.push('Login')}
                    className=' absolute bottom-20'>
                    <View className='bg-primary px-10 py-4 rounded-[55px]'>
                        <Text className='text-[20px] font-medium text-white '>
                            Go to shopping
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default StartUpSC;
