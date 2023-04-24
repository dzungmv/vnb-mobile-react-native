import {
    CompositeNavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import { useRef, useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { CartType, UserTypes } from '../../components/types';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CheckOutSC = () => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();
    const router =
        useRoute<
            RouteProp<
                Record<string, { cart: CartType[]; total: number }>,
                string
            >
        >();

    const total = router.params?.total;
    const cart = router.params?.cart;

    const user: UserTypes = useSelector((state: any) => state.user.user);

    const fullnameRef = useRef<TextInput>(null);
    const phoneRef = useRef<TextInput>(null);
    const addressRef = useRef<TextInput>(null);

    const [payment, setPayment] = useState('cod');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [isPending, setIsPending] = useState(false);

    const HANDLE = {
        order: async () => {
            if (fullname === '') {
                Alert.alert('Please enter your name');
                fullnameRef.current?.focus();
                return;
            }

            if (phone === '') {
                Alert.alert('Please enter your phone number');
                phoneRef.current?.focus();
                return;
            }

            if (address === '') {
                Alert.alert('Please enter your address');
                addressRef.current?.focus();
                return;
            }

            try {
                const data = {
                    fullname,
                    phone,
                    address,
                    payment,
                    products: cart,
                    total,
                };
                setIsPending(true);
                await axios.post(
                    `http://localhost:8080/api/vnb/v1/user/order`,
                    { data },
                    {
                        headers: {
                            authorization: user.tokens.accessToken,
                            'x-client-id': user.user._id,
                        },
                    }
                );
                setIsPending(false);

                Alert.alert('Success', 'Order successfully');
                navigation.navigate('Ordering');
            } catch (error: any) {
                setIsPending(false);
                Alert.alert(
                    'Error',
                    error?.response?.data?.message || 'Something went wrong'
                );
            }
        },
    };

    return (
        <SafeAreaView className='flex-1 bg-white relative'>
            <View className='px-4'>
                <Text className='text-2xl font-bold'>CheckOut</Text>
            </View>

            <ScrollView className='px-4 mt-5'>
                <View>
                    <Text className='text-base text-gray-600'>Name</Text>
                    <TextInput
                        ref={fullnameRef}
                        onChangeText={setFullname}
                        className='border h-12 rounded-lg px-3 border-gray-300'
                        style={{
                            textAlignVertical: 'center',
                            fontSize: 16,
                        }}
                    />
                </View>

                <View className='mt-3'>
                    <Text className='text-base text-gray-600'>
                        Mobile phone
                    </Text>
                    <TextInput
                        ref={phoneRef}
                        onChangeText={setPhone}
                        keyboardType='numeric'
                        className='border h-12 rounded-lg px-3 border-gray-300'
                        style={{
                            textAlignVertical: 'center',
                            fontSize: 16,
                        }}
                    />
                </View>

                <View className='mt-3'>
                    <Text className='text-base text-gray-600'>Address</Text>
                    <TextInput
                        ref={addressRef}
                        onChangeText={setAddress}
                        className='border h-12 rounded-lg px-3 border-gray-300'
                        style={{
                            textAlignVertical: 'center',
                            fontSize: 16,
                        }}
                    />
                </View>

                <View className='mt-7'>
                    <Text className='text-base'>Payment method</Text>

                    <View className=' rounded-lg bg-pink-100 mt-2'>
                        <RadioButton.Group
                            value={payment}
                            onValueChange={(value) => setPayment(value)}>
                            <RadioButton.Item
                                value='cod'
                                label='Cash on delivery'
                            />

                            <RadioButton.Item value='banking' label='Banking' />
                        </RadioButton.Group>
                        {payment === 'banking' && (
                            <Animatable.View
                                animation='zoomIn'
                                easing={'ease-in'}
                                duration={300}
                                className='mx-4 mb-4 rounded-lg bg-blue-50 p-2'>
                                <Text>Test branch, Test branch</Text>
                                <Text>Account number: 0000000000000</Text>
                                <Text>Account owner: Test</Text>
                                <Text>
                                    (Content of transfer: Name + Order phone
                                    number)
                                </Text>
                            </Animatable.View>
                        )}
                    </View>

                    <View>
                        <Text className='text-base mt-5'>Products</Text>
                        <View>
                            {cart?.map((item: CartType) => {
                                return (
                                    <View
                                        key={item._id}
                                        className='flex-row items-center mt-2'>
                                        <Image
                                            source={{
                                                uri: item?.product_image,
                                            }}
                                            className='w-[80px] h-[80px]'
                                        />

                                        <View className='flex-1'>
                                            <Text className='text-base font-medium'>
                                                {item?.product_name}
                                            </Text>
                                            <View className='flex-row items-center'>
                                                <Text className='text-base text-primary'>
                                                    {item?.product_price}
                                                </Text>
                                                <Text className='text-base text-gray-500 ml-1'>
                                                    x{item?.product_quantity}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View className=' absolute bottom-0 px-4 py-3 flex-row items-center justify-between left-0 right-0 z-10 bg-white'>
                <View className='flex-row items-center'>
                    <Text className=' text-base font-medium'>Total:</Text>
                    <Text className='pl-1 text-base font-medium text-primary'>
                        {total?.toLocaleString()}
                    </Text>
                </View>

                <TouchableOpacity
                    className='flex-row items-center py-2 px-5 rounded-lg bg-violet-600'
                    onPress={HANDLE.order}>
                    <Text className='text-lg mr-1 text-white'>Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CheckOutSC;
