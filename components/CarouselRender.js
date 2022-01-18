import React, {useEffect} from 'react'
import Carousel from 'react-native-snap-carousel'
import { View, Text, Image } from 'react-native'
import productAction from '../redux/actions/productAction';
import { connect } from "react-redux";


const CarouselRender = (props) => {

    const { getDrinks, drinks, loading } = props;

    useEffect(() => {
        getDrinks();
    }, [])

    const renderItem = ({ item }) => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} key={item.id}>
                <Image source={{uri: item.drinkImg }} style={{width: 280, height: 350, marginBottom: '2%'}} />
                    <Text 
                        style={{ color: 'white', 
                        textAlign: 'center', 
                        fontSize: 25,
                        fontWeight: 'bold', 
                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 10
                        }}>
                        {item.drinkName}
                    </Text>
                
            </View >
        )
    }

    return (

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Carousel
            data={drinks.slice(1, 5)}
            sliderWidth={900}
            itemWidth={450}
            renderItem={renderItem}
            layout={"default"}
            loop={true}
            autoplay={true}
        />

    </View>

    );
}

const mapStateToProps = state => {
    return {
        drinks: state.productsReducer.products,
        loading: state.productsReducer.loading,
    }
}

const mapDispatchToProps = {
    getDrinks: productAction.fetchProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(CarouselRender)