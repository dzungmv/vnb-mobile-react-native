import {
    CompositeNavigationProp,
    useNavigation,
} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { View } from 'react-native-animatable';
import { useSelector } from 'react-redux';
import HeaderCmp from '../../components/common/header';
import NotFound from '../../components/common/not-found';
import { CartType, OrderType, UserTypes } from '../../components/types';

const AllOrderedSC = () => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();
    const user: UserTypes = useSelector((state: any) => state.user.user);
    const [ordered, setOrdered] = useState([]);
    const [isPending, setIsPending] = useState(false);

    const data: OrderType[] = ordered?.sort((x: OrderType, y: OrderType) => {
        return new Date(x.updatedAt) < new Date(y.updatedAt) ? 1 : -1;
    });
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
        <SafeAreaView className='flex-1 bg-blue-500'>
            <HeaderCmp title='Ordered' titleColor='white' />

            {data && data?.length > 0 ? (
                <ScrollView className=' mt-5'>
                    <View className='px-4'>
                        {data?.map((item: OrderType, index: number) => {
                            return (
                                <TouchableOpacity
                                    key={item._id}
                                    className='mt-4 bg-white rounded-lg shadow-md p-2'
                                    onPress={() =>
                                        navigation.navigate(
                                            'OrderedDetailsStack',
                                            { data: item }
                                        )
                                    }>
                                    <View className='pb-2'>
                                        {item?.products?.map(
                                            (product: CartType) => {
                                                return (
                                                    <View
                                                        key={product._id}
                                                        className='flex-row items-center mb-4'>
                                                        <Image
                                                            source={{
                                                                uri: product?.product_image,
                                                            }}
                                                            className='w-[80px] h-[80px]'
                                                        />

                                                        <View className='flex-1 ml-2'>
                                                            <Text className='text-lg font-medium'>
                                                                {
                                                                    product?.product_name
                                                                }
                                                            </Text>
                                                            <View className='flex-row items-center text-base'>
                                                                <Text className='text-base text-primary'>
                                                                    {product?.product_price?.toLocaleString()}
                                                                </Text>
                                                                <Text className='text-gray-600 ml-1'>
                                                                    x
                                                                    {
                                                                        product.product_quantity
                                                                    }
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                );
                                            }
                                        )}
                                    </View>

                                    <View className='flex-row justify-between items-center border-t border-gray-200 pt-2'>
                                        <Text>
                                            {moment(item?.updatedAt).format(
                                                'LLL'
                                            )}
                                        </Text>
                                        <View className='flex-row items-center'>
                                            <Text className='text-lg'>
                                                Total:
                                            </Text>
                                            <Text className='text-lg text-primary font-medium ml-1'>
                                                {item?.total?.toLocaleString()}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>
            ) : (
                <NotFound title='No Ordered' titleColor='white' />
            )}
        </SafeAreaView>
    );
};

export default AllOrderedSC;
