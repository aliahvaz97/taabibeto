import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const MedicalServices = () => {
  const navigation = useNavigation(); // برای مسیریابی در React Native

  return (
    <View style={styles.container}>
      {/* بخش تصویر */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../HomeMedicalServices/taabibeto.png')} // تصویر محلی
          style={styles.image}
          alt="Medical Services"
        />
      </View>

      {/* بخش متن */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>خدمات پزشکی در منزل</Text>
        <Text style={styles.description}>
          دسترسی آسان و به صورت ۲۴ ساعته به خدمات پزشکی در منزل، یکی از نیازهای مهم بیمارانی با شرایط خاص است. از آنجایی که حضور در مراکز درمانی در داخل شهرها به دلیل ترافیک و اتلاف وقت پرهزینه خواهد بود و همچنین حضور افراد مسن یا ناتوان و بیمارانی که توانایی مراجعه حضوری را ندارند با مشکلات بسیار همراه است، تبیبتو امکان استفاده از خدمات پزشکی در منزل را فراهم کرده است.
        </Text>
        <Text style={styles.description}>
          در حال حاضر خدمات پزشکی تبیبتو شامل: پرستاری و تزریقات در منزل، تست کرونا در منزل، ویزیت پزشک عمومی و پزشک متخصص در منزل، خدمات فیزیوتراپی و رادیولوژی و سونوگرافی در منزل است. شما می‌توانید از طریق سایت تبیبتو نسبت به رزرو انواع مختلف خدمات پزشکی در منزل اقدام کنید.
        </Text>

        {/* بخش دکمه‌ها */}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => navigation.navigate('RezevParstar')}
          >
            <Text style={styles.buttonText}>همین الان رزرو کنید</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.buttonTextSupport}>تماس با پشتیبانی</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    direction: 'rtl',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: 'auto',
    borderRadius: 8,
  },
  textContainer: {
    flex: 2,
    paddingRight: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222222',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555555',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    gap: 15,
  },
  reserveButton: {
    backgroundColor: '#00c853',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  supportButton: {
    backgroundColor: '#e0f2f1',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonTextSupport: {
    color: '#00c853',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MedicalServices;
