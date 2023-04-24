import { AntDesign, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { CartType, UserTypes } from '../../components/types';

import HeaderCmp from '../../components/common/header';
import AnimatedLottieView from 'lottie-react-native';

import animation from './../../components/ui-data/animation.json';
import {
    CompositeNavigationProp,
    useNavigation,
} from '@react-navigation/native';
import LoadingScreen from '../../components/common/loading-screen';

const CartSC: React.FC = () => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();

    const user: UserTypes = useSelector((state: any) => state.user.user);

    const [cart, setCart] = useState<CartType[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);

    const total = cart?.reduce((acc, curr: CartType) => {
        return acc + curr.product_price * curr.product_quantity;
    }, 0);

    const HANDLE = {
        removeCart: (id: string) => {
            const findCart = cart.findIndex((item) => item._id === id);

            if (findCart !== -1) {
                setCart((prev: CartType[]) => {
                    const copy = JSON.stringify(prev);
                    const data = JSON.parse(copy);

                    data.splice(findCart, 1);

                    return data;
                });
            }
        },
        checkout: async () => {
            try {
                setIsPending(true);
                await axios.post(
                    `http://localhost:8080/api/vnb/v1/user/checkout`,
                    {
                        cart,
                        total: total,
                    },
                    {
                        headers: {
                            authorization: user.tokens.accessToken,
                            'x-client-id': user.user._id,
                        },
                    }
                );
                setIsPending(false);
                navigation.navigate('CheckoutStack', { cart, total });
            } catch (error: any) {
                setIsPending(false);

                if (error?.response?.data?.type === 'out_of_stock') {
                    Alert.alert('Error', error?.response?.data?.stock);
                }

                Alert.alert('Error', 'Something went wrong!');
            }
        },
    };

    useEffect(() => {
        (async () => {
            if (!user.user?._id) {
                return;
            }

            const res = await axios.get(
                `http://localhost:8080/api/vnb/v1/user/get-cart`,
                {
                    headers: {
                        authorization: user?.tokens?.accessToken,
                        'x-client-id': user?.user?._id,
                    },
                }
            );

            setCart(res?.data?.data?.products);
        })();
    }, []);

    return (
        <SafeAreaView className='flex-1 bg-white relative'>
            <HeaderCmp title='Cart' />

            {cart && cart.length > 0 && (
                <View className=' absolute bottom-0 px-4 py-3 flex-row items-center justify-between left-0 right-0 z-10'>
                    <View className='flex-row items-center'>
                        <Text className=' text-base font-medium'>Total:</Text>
                        <Text className='pl-1 text-base font-medium text-primary'>
                            {total?.toLocaleString()}
                        </Text>
                    </View>

                    <TouchableOpacity
                        className='flex-row items-center py-2 px-5 rounded-lg bg-violet-600'
                        onPress={HANDLE.checkout}>
                        <Text className='text-lg mr-1 text-white'>
                            Checkout
                        </Text>
                        <AntDesign name='arrowright' size={24} color='white' />
                    </TouchableOpacity>
                </View>
            )}

            {cart && cart.length > 0 ? (
                <ScrollView className='px-4 mt-5'>
                    {cart?.map((item) => {
                        return (
                            <View
                                key={item._id}
                                className='flex-row items-center'>
                                <Image
                                    source={{
                                        uri: item?.product_image,
                                    }}
                                    className='w-[100px] h-[100px] object-contain'
                                />

                                <View className='flex-1'>
                                    <Text className='text-lg font-medium'>
                                        {item?.product_name}
                                    </Text>
                                    <View className='flex-row items-center justify-between'>
                                        <View className='flex-row items-center'>
                                            <Text className='text-base text-primary mr-1'>
                                                {item?.product_price?.toLocaleString()}
                                            </Text>

                                            <Text className='text-base text-gray-500'>
                                                x{item?.product_quantity}
                                            </Text>
                                        </View>

                                        <TouchableOpacity
                                            onPress={() =>
                                                HANDLE.removeCart(item._id)
                                            }>
                                            <Ionicons
                                                name='trash-bin'
                                                size={24}
                                                color='red'
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
            ) : (
                <View className='mt-5 flex justify-center items-center'>
                    <AnimatedLottieView
                        style={{
                            width: 300,
                            height: 300,
                        }}
                        source={animation}
                        autoPlay
                        loop
                    />
                    <Text className='mt-3 text-2xl font-semibold text-blue-500'>
                        No cart
                    </Text>
                </View>
            )}

            {isPending && <LoadingScreen />}
        </SafeAreaView>
    );
};

export default CartSC;
