import 'react-native-gesture-handler';
import React from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Search from './components/Search';
import BookDetails from './components/BookDetails';

import Colors from './const/colors';

const Stack = createStackNavigator();

const basicHeaderOptions = {
  headerStyle: {
    backgroundColor: Colors.DarkBlue,
  },
  headerTintColor: Colors.White,
};

const App: React.FC = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            ...basicHeaderOptions,
            title: 'Open Books Search',
          }}
        />
        <Stack.Screen
          name="BookDetails"
          component={BookDetails}
          options={({navigation}) => ({
            ...basicHeaderOptions,
            title: 'Book Details',
            headerLeft: () => (
              <Button
                title="Back"
                onPress={() => navigation.navigate('Search')}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
