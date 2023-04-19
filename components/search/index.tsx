import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

const Search: React.FC = () => {
    return (
        <SafeAreaView className='flex-1 w-full absolute bg-white h-[100vh]'>
            <View className='flex-row px-5 gap-2 items-center'>
                <TouchableOpacity>
                    <Entypo name='chevron-thin-left' size={25} />
                </TouchableOpacity>
                <TextInput
                    placeholder='Search VNBSHOP'
                    numberOfLines={10}
                    multiline={true}
                    className='bg-gray-200 flex-1 py-2 rounded-2xl text-lg flex-row items-center px-3 align-text-top'
                />
            </View>
        </SafeAreaView>
    );
};

export default Search;
