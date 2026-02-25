import { router } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
const logo = require("@/assets/images/Logo1.jpg")

export default function Index() {
     useEffect(() => {
    const timer = setTimeout(() => {

      router.replace("/home");
    }, 3000);

    return () => clearTimeout(timer);
   }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>จังหวัดขอนแก่น</Text>
      <Text style={styles.caption}>พระธาตุขามแก่น เสียงแคนดอกคูณ ศูนย์รวมผ้าไหม ร่วมใจผูกเสี่ยว เที่ยวขอนแก่นนครใหญ่</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f1e6d3"
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 20,
  },
  title: { fontSize: 28, color: "#000000" },
  caption: {
    fontSize: 16,
    color: "#444141",
    marginTop: 10,
    textAlign: 'center',
    marginRight: 40,
    marginLeft: 40,
  },
})
