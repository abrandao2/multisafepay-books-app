import 'react-native-gesture-handler';
import React from 'react';
import {Button} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Search from './components/Search';
import BookDetails from './components/BookDetails';
import rootReducer from './redux/rootReducer';

import Colors from './const/colors';

const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));;

const basicHeaderOptions = {
  headerStyle: {
    backgroundColor: Colors.DarkBlue,
  },
  headerTintColor: Colors.White,
};

const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
