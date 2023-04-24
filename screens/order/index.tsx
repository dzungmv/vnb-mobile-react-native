import {
    CompositeNavigationProp,
    useNavigation,
} from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
} from 'react-native';
import { View } from 'react-native-animatable';
import { useSelector } from 'react-redux';
import HeaderCmp from '../../components/common/header';
import LoadingScreen from '../../components/common/loading-screen';
import { CartType, OrderType, UserTypes } from '../../components/types';

const OrderSC = () => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();
    const user: UserTypes = useSelector((state: any) => state.user.user);
    const [ordered, setOrdered] = useState<OrderType[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [isCancelPending, setIsCancelPending] = useState(false);

    const data: OrderType[] = ordered?.sort((x: OrderType, y: OrderType) => {
        return new Date(x.updatedAt) < new Date(y.updatedAt) ? 1 : -1;
    });

    const HANDLE = {
        cancelOrder: async () => {
            try {
                setIsCancelPending(true);
                await axios.put(
                    `http://localhost:8080/api/vnb/v1/user/update-order`,
                    {
                        orderId: data[0]?._id,
                        status: 'cancelled',
                    },
                    {
                        headers: {
                            authorization: user?.tokens?.accessToken,
                            'x-client-id': user?.user?._id,
                        },
                    }
                );

                setIsCancelPending(false);
                Alert.alert('Order cancelled');
                // refresh
                navigation.navigate('Ordered');
            } catch (error: any) {
                setIsCancelPending(false);
                Alert.alert(
                    error?.response?.data?.message || 'Something went wrong'
                );
            }
        },
    };

    useEffect(() => {
        (async () => {
            try {
                setIsPending(true);
                const res = await axios.get(
                    `http://localhost:8080/api/vnb/v1/user/get-order`,
                    {
                        headers: {
                            authorization: user?.tokens?.accessToken,
                            'x-client-id': user?.user?._id,
                        },
                    }
                );

                setOrdered(res?.data?.data?.orders);
                setIsPending(false);
            } catch (error) {
                setIsPending(false);
            }
        })();
    }, []);

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <HeaderCmp title='Ordered' />
            <ScrollView>
                <View className='px-4 mt-7'>
                    <View className=' flex-row items-start'>
                        <View className='flex items-center'>
                            <View
                                className='w-4 h-4 rounded-full'
                                style={{
                                    backgroundColor:
                                        data[0]?.status === 'cancelled' ||
                                        data[0]?.status === 'returns'
                                            ? '#E2E8F0'
                                            : '#FF2461',
                                }}></View>
                            <View
                                className='w-[5px] h-[90px]'
                                style={{
                                    backgroundColor:
                                        data[0]?.status === 'cancelled' ||
                                        data[0]?.status === 'returns'
                                            ? '#E2E8F0'
                                            : '#FF2461',
                                }}></View>
                        </View>
                        <View className='ml-2 -mt-[6px]'>
                            <Text
                                className='text-lg'
                                style={{
                                    color:
                                        data[0]?.status === 'cancelled' ||
                                        data[0]?.status === 'returns'
                                            ? '#E2E8F0'
                                            : 'black',
                                }}>
                                Order placed
                            </Text>
                            <Text
                                className='text-base'
                                style={{
                                    color:
                                        data[0]?.status === 'cancelled' ||
                                        data[0]?.status === 'returns'
                                            ? '#E2E8F0'
                                            : 'black',
                                }}>
                                Your order is being prepared
                            </Text>
                        </View>
                    </View>
                    <View className=' flex-row items-start'>
                        <View className='flex items-center'>
                            <View
                                className='w-4 h-4 rounded-full'
                                style={{
                                    backgroundColor:
                                        data[0]?.status === 'shipping' ||
                                        data[0]?.status === 'completed'
                                            ? '#FF2461'
                                            : '#E2E8F0',
                                }}></View>
                            <View
                                className='w-[5px] h-[90px]'
                                style={{
                                    backgroundColor:
                                        data[0]?.status === 'shipping' ||
                                        data[0]?.status === 'completed'
                                            ? '#FF2461'
                                            : '#E2E8F0',
                                }}></View>
                        </View>
                        <View className='ml-2 -mt-[6px]'>
                            <Text
                                className='text-lg '
                                style={{
                                    color:
                                        data[0]?.status === 'shipping' ||
                                        data[0]?.status === 'completed'
                                            ? 'black'
                                            : '#E2E8F0',
                                }}>
                                Ordered Comfirm
                            </Text>
                            <Text
                                className='text-base'
                                style={{
                                    color:
                                        data[0]?.status === 'shipping' ||
                                        data[0]?.status === 'completed'
                                            ? 'black'
                                            : '#E2E8F0',
                                }}>
                                Store has been shipped your order
                            </Text>
                        </View>
                    </View>
                    <View className=' flex-row items-start'>
                        <View className='flex items-center'>
                            <View
                                className='w-4 h-4 rounded-full'
                                style={{
                                    backgroundColor:
                                        data[0]?.status === 'shipping' ||
                                        data[0]?.status === 'completed'
                                            ? '#FF2461'
                                            : '#E2E8F0',
                                }}></View>
                            <View
                                className='w-[5px] h-[90px]'
                                style={{
                                    backgroundColor:
                                        data[0]?.status === 'shipping' ||
                                        data[0]?.status === 'completed'
                                            ? '#FF2461'
                                            : '#E2E8F0',
                                }}></View>
                        </View>
                        <View className='ml-2 -mt-[6px]'>
                            <Text
                                className='text-lg '
                                style={{
                                    color:
                                        data[0]?.status === 'shipping' ||
                                        data[0]?.status === 'completed'
                                            ? 'black'
                                            : '#E2E8F0',
                                }}>
                                Shipping
                            </Text>
                            <Text
                                className='text-base'
                                style={{
                                    color:
                                        data[0]?.status === 'shipping' ||
                                        data[0]?.status === 'completed'
                                            ? 'black'
                                            : '#E2E8F0',
                                }}>
                                Store has been shipped your order
                            </Text>
                        </View>
                    </View>
                    <View className='flex-row items-start'>
                        <View className='flex items-center'>
                            <View
                                className='w-4 h-4 rounded-full'
                                style={{
                                    backgroundColor:
                                        data[0]?.status === 'completed'
                                            ? '#FF2461'
                                            : '#E2E8F0',
                                }}></View>
                            {(data[0]?.status === 'cancelled' ||
                                data[0]?.status === 'returns') && (
                                <View
                                    className='w-[5px] h-[90px]'
                                    style={{
                                        backgroundColor: '#E2E8F0',
                                    }}></View>
                            )}
                        </View>
                        <View className='ml-2 -mt-[6px]'>
                            <Text
                                className='text-lg'
                                style={{
                                    color:
                                        data[0]?.status === 'completed'
                                            ? 'black'
                                            : '#E2E8F0',
                                }}>
                                Order delivered
                            </Text>
                            <Text
                                className='text-base'
                                style={{
                                    color:
                                        data[0]?.status === 'completed'
                                            ? 'black'
                                            : '#E2E8F0',
                                }}>
                                Your order has been delivered successfully
                            </Text>
                        </View>
                    </View>
                    {(data[0]?.status === 'cancelled' ||
                        data[0]?.status === 'returns') && (
                        <View className='flex-row items-start'>
                            <View className='flex items-center'>
                                <View
                                    className='w-4 h-4 rounded-full'
                                    style={{
                                        backgroundColor: 'red',
                                    }}></View>
                            </View>
                            <View className='ml-2 -mt-[6px]'>
                                <Text
                                    className='text-lg'
                                    style={{
                                        color: 'red',
                                    }}>
                                    Order cancelled
                                </Text>
                                <Text
                                    className='text-base'
                                    style={{
                                        color: 'red',
                                    }}>
                                    Your order has been cancelled
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
                <View className='px-4 mt-10'>
                    {data[0]?.products?.map((item: CartType) => {
                        return (
                            <View
                                key={item?._id}
                                className='flex-row items-center'>
                                <Image
                                    source={{ uri: item?.product_image }}
                                    className='w-[80px] h-[80px]'
                                />

                                <View className='flex-1 ml-2'>
                                    <Text className='text-base font-medium'>
                                        {item?.product_name}
                                    </Text>
                                    <Text className='text-base text-primary'>
                                        {item?.product_price?.toLocaleString()}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>

                <View className='mt-4 flex-row justify-end mx-4 pt-2 border-t border-gray-200'>
                    <Text className='text-base'>Total:</Text>

                    <Text className='text-base ml-1 text-primary font-medium'>
                        {data[0]?.total?.toLocaleString()}
                    </Text>
                </View>

                <View className='px-4 mt-6'>
                    <Text className='font-semibold text-lg'>
                        Order information
                    </Text>

                    <View className='pl-5 pb-10'>
                        <Text className='text-base'>
                            Full name: {data[0]?.fullname}
                        </Text>
                        <Text className='text-base'>
                            Phone: {data[0]?.phone}
                        </Text>
                        <Text className='text-base'>
                            Address: {data[0]?.address}
                        </Text>
                    </View>
                </View>

                {data[0]?.status === 'pending' && (
                    <View className='mb-10 px-4'>
                        <TouchableOpacity
                            className='border border-gray-400 py-3 rounded-xl flex items-center'
                            onPress={HANDLE.cancelOrder}>
                            <Text className='font-medium text-lg text-gray-600'>
                                Cancel order
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            {isPending || (isCancelPending && <LoadingScreen />)}
        </SafeAreaView>
    );
};

export default OrderSC;
