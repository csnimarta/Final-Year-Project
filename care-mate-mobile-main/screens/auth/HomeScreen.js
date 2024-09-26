import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import * as React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import NotificationIcon from '../../assets/images/notifications-icon.svg';
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  SHADOW_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from '../../constants/Colors';
import Carousel, {
  Pagination,
  ICarouselInstance,
} from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { SvgUri } from 'react-native-svg';
import axios from 'axios';
import { baseUrl } from '../../IPConfig';
import { useToast } from 'react-native-toast-notifications';
import UserContext from '../../context/UserProvider';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const HomeScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const carouselRef = React.useRef(null);
  const progress = useSharedValue < Number > 0;
  const [progressIndex, setProgressIndex] = React.useState(0);
  const [categories, setCategories] = React.useState([]);
  const [gridCategories, setGridCategories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { user } = React.useContext(UserContext);

  const onPressPagination = (index) => {
    carouselRef.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const swiperAssets = [
    {
      name: 'maid',
      url: 'https://res.cloudinary.com/dsek1jm9h/image/upload/v1715342552/33467286_8040816_r2xvfm.jpg',
    },
    {
      name: 'beauty',
      url: 'https://res.cloudinary.com/dsek1jm9h/image/upload/v1715341739/3189767_kjlnzp.jpg',
    },
    {
      name: 'cook',
      url: 'https://res.cloudinary.com/dsek1jm9h/image/upload/v1715341939/10309255_yrvekw.jpg',
    },
  ];

  const [serviceProviders, setServiceProviders] = React.useState([]);

  const handleCategoryClick = async (category) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/service/getServicesWithProviders`,
      );
      let tempProviders = [];
      response.data.forEach((item) => {
        if (item.category === category._id) {
          const date = moment(item.bannedTill, 'DD-MMM-YYYY');
          if (moment().diff(date, 'hours') > 0) {
            tempProviders.push(item);
          }
        }
      });
      setServiceProviders(tempProviders);
      setIsLoading(false);
      if (tempProviders.length > 0) {
        navigation.navigate('SearchScreen', {
          serviceProviders: tempProviders,
        });
      } else {
        toast.show('This service is not available at the moment');
      }
    } catch (error) {
      console.log(error);
      toast.show('Could not find service providers at the moment.');
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}/category/getAllCategories`,
        );
        let gridArray = [];
        response.data.forEach((item, index) => {
          if (index <= 5) {
            gridArray.push(item);
          }
        });
        setGridCategories(gridArray);
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.show('Ops, something went wrong!', {
          type: 'warning',
        });
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (!user.data) {
    return <View></View>;
  }

  return (
    <View
      style={{
        backgroundColor: BACKGROUND_COLOR,
        paddingHorizontal: responsiveWidth(8),
        paddingVertical: responsiveHeight(2),
        flex: 1,
      }}
    >
      <View style={styles.topHeader}>
        <Text style={styles.topHeaderTitle}>
          Welcome {user.data.full_name ? user.data.full_name : User}!
        </Text>
        <TouchableOpacity>
          <NotificationIcon
            width={responsiveWidth(10)}
            height={responsiveWidth(10)}
            style={styles.notificationIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.swiperContainer}>
        <Carousel
          ref={carouselRef}
          onProgressChange={progress}
          loop
          autoPlay={true}
          width={responsiveWidth(90)}
          height={responsiveWidth(92) / 1.2}
          data={[...swiperAssets.keys()]}
          scrollAnimationDuration={1000}
          autoPlayInterval={5000}
          onSnapToItem={(index) => {
            setProgressIndex(index);
          }}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingRight: responsiveWidth(2),
                position: 'relative',
              }}
            >
              <Image
                width={'100%'}
                height={responsiveWidth(92) / 1.5}
                source={swiperAssets[index].url}
              />
            </View>
          )}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: BACKGROUND_COLOR,
            gap: 5,
            paddingVertical: responsiveHeight(1),
          }}
        >
          {swiperAssets.map((item, index) => {
            return (
              <View
                key={item.url}
                style={{
                  height: responsiveHeight(1.5),
                  width: responsiveHeight(1.5),
                  backgroundColor: PRIMARY_COLOR,
                  borderRadius: 100,
                  opacity: progressIndex === index ? 1 : 0.5,
                }}
              />
            );
          })}
        </View>
      </View>

      <View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              fontWeight: 'bold',
              color: PRIMARY_COLOR,
            }}
          >
            Category
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CategoriesList', { categories: categories });
            }}
          >
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: PRIMARY_COLOR,
              }}
            >
              See All
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridView}>
          {gridCategories.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleCategoryClick(item);
                }}
                style={styles.gridViewItem}
                key={index}
              >
                <SvgUri
                  height={responsiveWidth(13)}
                  width={responsiveWidth(13)}
                  uri={item.icon}
                />
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.75),
                    color: PRIMARY_COLOR,
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {isLoading ? (
        <View
          style={{
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topHeaderTitle: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  swiperContainer: {
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(1),
  },
  gridView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: responsiveWidth(2),
    justifyContent: 'center',
    paddingVertical: responsiveHeight(2),
  },
  gridViewItem: {
    borderWidth: 1,
    borderColor: SHADOW_COLOR,
    width: responsiveWidth(26),
    height: responsiveWidth(26),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsiveWidth(2),
  },
});
