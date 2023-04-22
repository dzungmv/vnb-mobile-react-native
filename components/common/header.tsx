import { Image, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import Search from '../search';
import { Logo } from '../../assets';

interface HeaderProps {
    title: string;
    titleColor?: any;
    isHome?: boolean;
}
const HeaderCmp = ({ title, isHome = false, titleColor }: HeaderProps) => {
    const [searchContainer, setSearchContainer] = useState<boolean>(false);
    return (
        <>
            <View className='flex-row items-center justify-between px-4'>
                {!isHome ? (
                    <Text
                        className=' text-2xl font-bold'
                        style={{
                            color: `${titleColor}`,
                        }}>
                        {title}
                    </Text>
                ) : (
                    <Image
                        source={Logo}
                        className='w-[60px] h-[60px] object-cover'
                    />
                )}
                <TouchableOpacity
                    className=' h-10 w-10 flex items-center justify-center rounded-full bg-gray-300'
                    onPress={() => setSearchContainer(!searchContainer)}>
                    <FontAwesome name='search' size={25} />
                </TouchableOpacity>
            </View>
            {searchContainer && (
                <Search closeSearch={() => setSearchContainer(false)} />
            )}
        </>
    );
};

export default HeaderCmp;
