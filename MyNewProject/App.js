import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MedicalServices from './body/MedicalServices'; // اضافه کردن کامپوننت MedicalServices

export default function App() {
  return (
    <View style={styles.container}>
      <MedicalServices /> {/* استفاده از کامپوننت MedicalServices */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
