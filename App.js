import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigations/AppNavigator';
import { MoviesProvider } from './src/context';

export default function App() {
  return (

    <MoviesProvider>
      <AppNavigator />
    </MoviesProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
