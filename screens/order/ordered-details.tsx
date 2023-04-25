import {
    CompositeNavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
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
import { AntDesign } from '@expo/vector-icons';
import HeaderCmp from '../../components/common/header';

import LoadingScreen from '../../components/common/loading-screen';
import NotFound from '../../components/common/not-found';
import { CartType, OrderType, UserTypes } from '../../components/types';
import moment from 'moment';

const OrderedDetailsSC = () => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();
    const user: UserTypes = useSelector((state: any) => state.user.user);

    const [isCancelPending, setIsCancelPending] = useState(false);

    const router = useRoute<
        RouteProp<
            Record<
                string,
                {
                    data: OrderType;
                }
            >,
            string
        >
    >();

    const { data } = router.params;

    const HANDLE = {
        cancelOrder: async () => {
            try {
                setIsCancelPending(true);
                await axios.put(
                    `http://localhost:8080/api/vnb/v1/user/update-order`,
                    {
                        orderId: data?._id,
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
                navigation.navigate('Ordered');
            } catch (error: any) {
                setIsCancelPending(false);
                Alert.alert(
                    error?.response?.data?.message || 'Something went wrong'
                );
            }
        },
    };

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='px-3'>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={32} color='black' />
                </TouchableOpacity>
            </View>
            {data ? (
                <ScrollView>
                    <View className='px-4 mt-7'>
                        <View className=' flex-row items-start'>
                            <View className='flex items-center'>
                                <View
                                    className='w-4 h-4 rounded-full'
                                    style={{
                                        backgroundColor:
                                            data?.status === 'cancelled' ||
                                            data?.status === 'returns'
                                                ? '#E2E8F0'
                                                : '#FF2461',
                                    }}></View>
                                <View
                                    className='w-[5px] h-[90px]'
                                    style={{
                                        backgroundColor:
                                            data?.status === 'cancelled' ||
                                            data?.status === 'returns'
                                                ? '#E2E8F0'
                                                : '#FF2461',
                                    }}></View>
                            </View>
                            <View className='ml-2 -mt-[6px]'>
                                <Text
                                    className='text-lg'
                                    style={{
                                        color:
                                            data?.status === 'cancelled' ||
                                            data?.status === 'returns'
                                                ? '#E2E8F0'
                                                : 'black',
                                    }}>
                                    Order placed
                                </Text>
                                <Text
                                    className='text-base'
                                    style={{
                                        color:
                                            data?.status === 'cancelled' ||
                                            data?.status === 'returns'
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
                                            data?.status === 'shipping' ||
                                            data?.status === 'completed'
                                                ? '#FF2461'
                                                : '#E2E8F0',
                                    }}></View>
                                <View
                                    className='w-[5px] h-[90px]'
                                    style={{
                                        backgroundColor:
                                            data?.status === 'shipping' ||
                                            data?.status === 'completed'
                                                ? '#FF2461'
                                                : '#E2E8F0',
                                    }}></View>
                            </View>
                            <View className='ml-2 -mt-[6px]'>
                                <Text
                                    className='text-lg '
                                    style={{
                                        color:
                                            data?.status === 'shipping' ||
                                            data?.status === 'completed'
                                                ? 'black'
                                                : '#E2E8F0',
                                    }}>
                                    Ordered Comfirm
                                </Text>
                                <Text
                                    className='text-base'
                                    style={{
                                        color:
                                            data?.status === 'shipping' ||
                                            data?.status === 'completed'
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
                                            data?.status === 'shipping' ||
                                            data?.status === 'completed'
                                                ? '#FF2461'
                                                : '#E2E8F0',
                                    }}></View>
                                <View
                                    className='w-[5px] h-[90px]'
                                    style={{
                                        backgroundColor:
                                            data?.status === 'shipping' ||
                                            data?.status === 'completed'
                                                ? '#FF2461'
                                                : '#E2E8F0',
                                    }}></View>
                            </View>
                            <View className='ml-2 -mt-[6px]'>
                                <Text
                                    className='text-lg '
                                    style={{
                                        color:
                                            data?.status === 'shipping' ||
                                            data?.status === 'completed'
                                                ? 'black'
                                                : '#E2E8F0',
                                    }}>
                                    Shipping
                                </Text>
                                <Text
                                    className='text-base'
                                    style={{
                                        color:
                                            data?.status === 'shipping' ||
                                            data?.status === 'completed'
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
                                            data?.status === 'completed'
                                                ? '#FF2461'
                                                : '#E2E8F0',
                                    }}></View>
                                {(data?.status === 'cancelled' ||
                                    data?.status === 'returns') && (
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
                                            data?.status === 'completed'
                                                ? 'black'
                                                : '#E2E8F0',
                                    }}>
                                    Order delivered
                                </Text>
                                <Text
                                    className='text-base'
                                    style={{
                                        color:
                                            data?.status === 'completed'
                                                ? 'black'
                                                : '#E2E8F0',
                                    }}>
                                    Your order has been delivered successfully
                                </Text>
                            </View>
                        </View>
                        {(data?.status === 'cancelled' ||
                            data?.status === 'returns') && (
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
                        {data?.products?.map((item: CartType) => {
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

                    <View className='mt-4 flex-row justify-between items-center mx-4 pt-2 border-t border-gray-200'>
                        <Text className='text-gray-500'>
                            {moment(data?.createdAt).format('LLL')}
                        </Text>
                        <View className='flex-row items-center'>
                            <Text className='text-base'>Total:</Text>

                            <Text className='text-base ml-1 text-primary font-medium'>
                                {data?.total?.toLocaleString()}
                            </Text>
                        </View>
                    </View>

                    <View className='px-4 mt-6'>
                        <Text className='font-semibold text-lg'>
                            Order information
                        </Text>

                        <View className='pl-5 pb-10'>
                            <Text className='text-base'>
                                Full name: {data?.fullname}
                            </Text>
                            <Text className='text-base'>
                                Phone: {data?.phone}
                            </Text>
                            <Text className='text-base'>
                                Address: {data?.address}
                            </Text>
                        </View>
                    </View>

                    {data?.status === 'pending' && (
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
            ) : (
                <NotFound title='Ordered empty' />
            )}

            {isCancelPending && <LoadingScreen />}
        </SafeAreaView>
    );
};

export default OrderedDetailsSC;
