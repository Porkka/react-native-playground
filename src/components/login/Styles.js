import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1
  },
  social_box: {
    flexDirection: 'row',
    justifyContent: 'center',     
  },
  icon_btn: {
    width: 55,
    height: 55,
    elevation: 3,
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 2,
    marginHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 10,
    shadowRadius: 1,
    justifyContent: 'center',
  },

  image: {
    borderRadius: 10,
  },
  btn_container: {
    marginVertical: 15
  },
});