import {
    CompositeNavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

import { FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons';

import { ProductType, UserTypes } from '../../components/types';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../../components/common/loading-screen';
import axios from 'axios';
import { logout } from '../../components/_redux/user/userSlice';

const ProductDetails = () => {
    const width = Dimensions.get('window').width;

    const navigation = useNavigation<CompositeNavigationProp<any, any>>();
    const dispatch = useDispatch();
    const router =
        useRoute<RouteProp<Record<string, { data: ProductType }>, string>>();

    const user: UserTypes = useSelector((state: any) => state.user.user);

    const product = router?.params?.data;

    const [quantity, setQuantity] = useState(1);
    const [isPending, setIsPending] = useState(false);
    const [pendingVerify, setPendingVerify] = useState(false);

    const HANDLE = {
        setQuantityIncrease: () => {
            if (quantity > product?.quantity) {
                return;
            }
            setQuantity((prev) => prev + 1);
        },

        setQuantityDecrease: () => {
            setQuantity((prev) => (prev <= 1 ? 1 : prev - 1));
        },

        addToCart: async () => {
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
                                    navigation.navigate(
                                        'AccountVerifyHomeStack'
                                    );
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
                return;
            }

            const data = {
                productId: product._id,
                product_name: product.name,
                product_price: product.price,
                product_image: product.image,
                product_quantity: quantity,
            };

            try {
                setIsPending(true);
                await axios.post(
                    `http://localhost:8080/api/vnb/v1/user/add-cart`,
                    {
                        product: data,
                    },
                    {
                        headers: {
                            authorization: user?.tokens?.accessToken,
                            'x-client-id': user?.user?._id,
                        },
                    }
                );
                setIsPending(false);
                Alert.alert('Success', 'Added to cart successfully', [
                    {
                        text: 'OK',
                    },
                    {
                        text: 'View cart',
                        onPress: () => {
                            navigation.navigate('Cart');
                        },
                    },
                ]);
            } catch (error: any) {
                setIsPending(false);
                if (error?.response?.status === 401) {
                    dispatch(logout());
                }
            }
        },
    };

    return (
        <SafeAreaView className='flex-1 bg-white relative'>
            <ScrollView>
                <View className='px-4'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                            name='arrow-back-sharp'
                            size={35}
                            color='black'
                        />
                    </TouchableOpacity>
                </View>
                <View className=''>
                    <Image
                        source={{ uri: product?.image }}
                        className='w-full h-[320px] rounded-[10px] !mix-blend-multiply'
                        resizeMode='contain'
                    />
                </View>

                <View className='px-4 mt-5'>
                    <Text className='text-[22px] font-medium '>
                        {product?.name}
                    </Text>
                    <Text className='mt-4 text-lg text-primary'>
                        {product?.price?.toLocaleString()}₫
                    </Text>

                    <View className=''>
                        {product?.endows?.map((item, index: number) => {
                            return (
                                <View
                                    className='flex-row items-center gap-2 mt-1'
                                    key={index}
                                    style={{
                                        width: width - 10,
                                    }}>
                                    <FontAwesome5
                                        name='check-circle'
                                        size={15}
                                        color='violet'
                                    />
                                    <Text>{item}</Text>
                                </View>
                            );
                        })}
                    </View>

                    <View className='mt-10'>
                        <View className='flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <TouchableOpacity
                                    className=' mr-1'
                                    onPress={HANDLE.setQuantityDecrease}>
                                    <AntDesign
                                        name='minuscircle'
                                        size={32}
                                        color={
                                            quantity === 1 ? 'gray' : 'black'
                                        }
                                    />
                                </TouchableOpacity>
                                <TextInput
                                    className='flex px-10 border border-gray-300 rounded-xl'
                                    textAlign='center'
                                    keyboardType='numeric'
                                    value={quantity.toString()}
                                    onChangeText={(num) =>
                                        setQuantity(Number(num))
                                    }
                                    style={{
                                        textAlignVertical: 'center',
                                        paddingBottom: 0,
                                        paddingTop: 0,
                                        height: 32,
                                        fontSize: 18,
                                    }}
                                />
                                <TouchableOpacity
                                    className=' ml-1'
                                    onPress={HANDLE.setQuantityIncrease}>
                                    <AntDesign
                                        name='pluscircle'
                                        size={32}
                                        color='black'
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                className='flex justify-center items-center py-3 px-3 rounded-[10px] bg-black'
                                onPress={HANDLE.addToCart}>
                                <Text className='text-white text-xl font-medium'>
                                    <Ionicons name='cart' size={20} /> Add to
                                    cart
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {product?.description &&
                        product?.description?.length > 0 && (
                            <View className='mt-14'>
                                <Text className='text-xl font-medium'>
                                    Description
                                </Text>

                                <View>
                                    <RenderHtml
                                        contentWidth={width}
                                        source={{ html: product?.description }}
                                    />
                                </View>
                            </View>
                        )}
                </View>
            </ScrollView>

            {isPending && <LoadingScreen />}
        </SafeAreaView>
    );
};

export default ProductDetails;
