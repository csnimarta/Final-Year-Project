import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  PRIMARY_COLOR,
  TEXT_COLOR,
  SECONDARY_COLOR,
  BACKGROUND_COLOR,
  SHADOW_COLOR,
} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {baseUrl} from '../../IPConfig';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Checkbox from 'expo-checkbox';
import {useToast} from "react-native-toast-notifications";
import UserContext from '../../context/UserProvider';
import ServiceContext from '../../context/ServiceProvider';

const CreateService = () => {

  const {user} = React.useContext(UserContext);
  const {setService} = React.useContext(ServiceContext);
  const toast = useToast();
  const [categories, setCategories] = React.useState([]);
  const [selectedCategoryTitle, setSelectedCategoryTitle] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState({});
  const [isCategoriesDDFocused, setIsCategoriesDDFocused] = React.useState(false);
  const [isMonthly, setIsMonthly] = React.useState(false);
  const [budget, setBudget] = React.useState("0");
  const [monthlyBudget, setMonthlyBudget] = React.useState("0");
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${ baseUrl }/category/getAllCategories`);
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();

  }, []);

  const navigation = useNavigation();

  const handleCreateService = async () => {

    if (!selectedCategory._id) {
      toast.show("Please select a category");
      return;
    } else if (budget < 200) {
      toast.show("Please quote correct cost(min 200rs).");
      return;
    } else if (isMonthly) {
      if (monthlyBudget < 1000) {
        toast.show("Please quote correct monthly cost(min 1000rs/month).");
        return;
      }
    } else if (description === '') {
      toast.show("Please write a short description for your service");
      return;
    } else if (description.length < 50) {
      toast.show("Your description is too small, please write more.");
      return;
    }

    try {
      const response = await axios.post(`${ baseUrl }/service/createService`, {
        title: selectedCategory.title,
        description: description,
        category: selectedCategory._id,
        budget: budget,
        user: user.data.id,
        durationType: isMonthly ? 'both' : 'once',
        monthlyBudget: isMonthly ? monthlyBudget : null,
        isAvailable: true
      });

      setService(response.data);
      navigation.navigate('ProviderHomeScreen');
    } catch (error) {
      console.log(error.message);
      toast.show("Something went wrong, please try again!", {
        type: 'warning'
      });
    }

  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.mainContainer}>

      <Text style={{
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        textAlign: 'center'
      }}>
        Create your service!
      </Text>
      <Text style={{
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold'
      }}>
        Provide following details to get started.
      </Text>

      <View>

        <Text style={styles.label}>
          Type of service you provide
        </Text>

        <Dropdown
          style={[styles.dropdown, isCategoriesDDFocused && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={{paddingHorizontal: responsiveWidth(2)}}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={categories}
          search
          maxHeight={300}
          labelField="title"
          valueField="id"
          placeholder={!isCategoriesDDFocused ? 'Select Category' : '...'}
          searchPlaceholder="Search..."
          value={selectedCategoryTitle}
          onFocus={() => setIsCategoriesDDFocused(true)}
          onBlur={() => setIsCategoriesDDFocused(false)}
          onChange={item => {
            setSelectedCategoryTitle(item.value);
            setSelectedCategory(item);
            setIsCategoriesDDFocused(false);
            setIsMonthly(false);
          }}
          renderLeftIcon={() => (
            <MaterialIcons
              style={styles.icon}
              name="category"
              color={isCategoriesDDFocused ? PRIMARY_COLOR : 'black'}
              size={20}
            />
          )}
        />
      </View>

      <View>
        <Text style={styles.label}>
          Approximate cost of your services.
        </Text>

        <TextInput
          placeholder={'Quote a reasonable price for your service'}
          placeholderTextColor={SHADOW_COLOR}
          style={styles.inputStyle}
          keyboardType='numeric'
          value={budget}
          onChangeText={text => {
            let number = Number(text.replace(/[^0-9]/g, ''));
            if (number < 10000) {
              setBudget(text.replace(/[^0-9]/g, ''));
            } else {
              toast.show("You can set a maximum budget of 10000");
            }
          }}
        />
      </View>

      <View style={{
        flexDirection: 'row',
        gap: responsiveWidth(2)
      }}>
        <Checkbox
          disabled={selectedCategory.durationType === 'once' ? true : false}
          style={styles.checkbox}
          value={isMonthly}
          onValueChange={setIsMonthly}
          color={isMonthly ? PRIMARY_COLOR : '#000'}
        />
        <Text>
          Do you want to provide monthly services?
        </Text>
      </View>

      {
        isMonthly ? (
          <View>

            <Text style={styles.label}>
              Approximate monthly budget for your services.
            </Text>

            <TextInput
              placeholder={'Quote monthly charges for your service'}
              placeholderTextColor={SHADOW_COLOR}
              style={styles.inputStyle}
              keyboardType='numeric'
              value={monthlyBudget}
              onChangeText={text => {
                let number = Number(text.replace(/[^0-9]/g, ''));
                if (number < 100000) {
                  setMonthlyBudget(text.replace(/[^0-9]/g, ''));
                } else {
                  toast.show("You can set a maximum budget of 100000");
                }
              }}
            />
          </View>) : null
      }

      <View style={{position: 'relative'}}>
        <Text style={styles.label}>
          Short description of your services.(50 - 250 char)
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={[styles.inputStyle, {
            textAlignVertical: 'top',
            paddingVertical: responsiveHeight(1)
          }]}
          value={description}
          onChangeText={((text) => {
            if (text.length > 250) {
              toast.show("You cannot write more.");
            } else {
              setDescription(text);
            }
          })}
        />
        <Text style={{color: 'rgba(0,0,0,0.25)', position: 'absolute', bottom: responsiveWidth(2), right: responsiveWidth(2)}}>
          {description.length}
        </Text>
      </View>

      <TouchableOpacity onPress={handleCreateService} style={{backgroundColor: PRIMARY_COLOR, borderRadius: 8, paddingHorizontal: responsiveWidth(4), paddingVertical: responsiveHeight(0.5)}}>
        <Text style={{color: BACKGROUND_COLOR, fontSize: responsiveFontSize(2.5), textAlign: 'center'}}>Create</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(6),
    gap: responsiveHeight(3),
  },
  dropdown: {
    borderWidth: 1,
    borderColor: SHADOW_COLOR,
    padding: responsiveHeight(1),
    borderRadius: 8
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: SHADOW_COLOR,
    minHeight: responsiveHeight(6),
    paddingHorizontal: responsiveWidth(2),
    borderRadius: 8,
    maxHeight: responsiveHeight(20)
  },
  label: {
    paddingVertical: responsiveHeight(1),
    fontWeight: 'semibold'
  }
});

export default CreateService;