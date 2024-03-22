import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, View, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { defaultStyles } from '../../constants/Styles.js';
import { router } from "expo-router";

export default function ChildAdd() {
  const [childName, setChildName] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [profilePicture] = useState(null);

  const handleInputChange = (text) => {
    setChildName(text);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setBirthday(currentDate);
  };

  const handleProfilePictureSelect = () => {
    // for now just logging to console
    console.log('Open camera roll');
  };

  const handleSubmit = () => {
    // for now just logging to console
    console.log('Child\'s Name:', childName);
    console.log('Birthday:', birthday);
    console.log('Profile Picture:', profilePicture);
    router.replace('/(auth)/child-select')
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.title}>Add Child</Text>
      <View style={defaultStyles.separator} />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 10 }}>Child's Name:</Text>
        <TextInput
          style={{ flex: 1, borderWidth: 1, padding: 5 }}
          value={childName}
          onChangeText={handleInputChange}
          placeholder="Enter child's name"
        />
      </View>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: -25}}
      >
        <Text style={{ marginRight: 200, marginTop: 30}}>Birthday:</Text>
      </TouchableOpacity>

      <DateTimePicker
        value={birthday}
        mode="date"
        display="default"
        onChange={handleDateChange}
      />

<TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}
        onPress={handleProfilePictureSelect}
      >
        <Text style={{ marginRight: 10 }}>Profile Picture:</Text>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={{ width: 50, height: 50, borderRadius: 25 }} />
        ) : (
          <Text style={{ fontSize: 24 }}>+</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={defaultStyles.addChildBtn}
        onPress={handleSubmit}
      >
        
        <Text style={defaultStyles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
