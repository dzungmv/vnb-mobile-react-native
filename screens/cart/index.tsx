import { SafeAreaView, ScrollView, Text } from 'react-native';
import HeaderCmp from '../../components/common/header';

const CartSC: React.FC = () => {
    return (
        <SafeAreaView className='flex-1'>
            <ScrollView>
                <HeaderCmp title='Cart' />
            </ScrollView>
        </SafeAreaView>
    );
};

export default CartSC;
