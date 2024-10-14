import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MedicalServices from './body/MedicalServices'; // اضافه کردن کامپوننت MedicalServices
const usersRoute = require('../server/routes/user-route')
const express = require('express')
require ('dotenv').config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

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

app.use('/api/users', usersRoute.router);

const port = process.env.APP_PORT || 3000;
app.listen (port,()=>{
    console.log(`Listening port ${port}`)
});