import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD',
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
  },
  emailStyle: {
    textAlign: 'center',
  },
  touchbleOpacityContainer: {
    alignItems: 'flex-end',
    marginRight: 30,
  },
  touchbleOpacity: {
    alignItems: 'center',
    backgroundColor: '#ff8000',
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
