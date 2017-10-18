import { StyleSheet } from 'react-native'; 
 
export const main_color = '#850EFF'; 
export const main_tint_color = '#BE7EFF'; 
 
export const common_styles = StyleSheet.create({ 
  centering_container: { 
    alignItems: 'center',
    justifyContent: 'center'
  },
  fab: { /* floating action button... */
    right: 0,
    bottom: 0,
    width: 75,
    height: 75,
    elevation: 2,
    marginBottom: 20,
    borderRadius: 100,
    paddingVertical: 5,
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 2,
    marginHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: main_tint_color,
  }
}); 