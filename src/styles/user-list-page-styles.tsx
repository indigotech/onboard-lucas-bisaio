import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#858ae3',
  },
  flatList: {
    height: '91%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  user: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: 300,
    height: 120,
    margin: 12,
    borderRadius: 20,
    padding: 12,
  },
  nameStyle: {
    textAlign: 'center',
    fontSize: 20,
    color: '#2C0735',
  },
  emailStyle: {
    textAlign: 'center',
    color: '#2C0735',
  },
  touchbleOpacityContainer: {
    alignItems: 'flex-end',
    marginRight: 30,
  },
  touchbleOpacity: {
    alignItems: 'center',
    backgroundColor: '#4E148C',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  touchbleOpacityText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
