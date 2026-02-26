import { supabase } from '@/services/supabase';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BG = require("@/assets/images/Background.jpg")
const categories = ['All', 'Attractions', 'Restaurants', 'Cafes', 'Temples', 'Festivals'];
const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from('Khonkhae')
          .select('*')
          .order('id', { ascending: true });

        if (supabaseError) {
          setError(supabaseError.message);
          return;
        }

        setExperiences(data || []);
      } catch {
        setError('ไม่สามารถดึงข้อมูลจากฐานข้อมูลได้');
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const filteredExperiences =
    selectedCategory === 'All'
      ? experiences
      : experiences.filter((item) => item.category === selectedCategory);

  const handleNavigate = (latitude?: number | null, longitude?: number | null) => {
    if (latitude == null || longitude == null) return;

    const lat = Number(latitude);
    const lng = Number(longitude);
    if (Number.isNaN(lat) || Number.isNaN(lng)) return;

    const googleMap = `https://maps.google.com/?q=${lat},${lng}`;
    const appleMap = `http://maps.apple.com/?q=${lat},${lng}`;

    const url = Platform.OS === 'ios' ? appleMap : googleMap;
    Linking.openURL(url);
  };

  const handleCall = (phone?: string | null) => {
    if (!phone) return;

    const raw = String(phone);
    const digits = raw.replace(/[^0-9+]/g, '');
    if (!digits) return;

    Linking.openURL(`tel:${digits}`);
  };

  return (
    <ScrollView style={styles.container} bounces={false}>
      <ImageBackground 
        source={BG} 
        style={styles.heroBackground}
      >
        <View style={styles.overlayContent}>
          <Text style={styles.mainTitle}>
            ยินดีต้อนรับสู่จังหวัด{"\n"}
            <Text style={styles.highlightText}>ขอนแก่น</Text>
          </Text>

          <Text style={styles.subTitle}>
            พระธาตุขามแก่น เสียงแคนดอกคูน ศูนย์รวมผ้าไหม ร่วมใจผูกเสี่ยว เที่ยวขอนแก่นนครใหญ่ ไดโนเสาร์สิรินธรเน่ สุดเท่เหรียญทองแรกมวยโอลิมปิก
          </Text>
        </View>

      </ImageBackground>

      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>แหล่งท่องเที่ยว</Text>

        <View style={styles.categoryTabs}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading && (
          <Text style={styles.statusText}>กำลังโหลดข้อมูล...</Text>
        )}

        {!loading && error && (
          <Text style={styles.statusText}>{error}</Text>
        )}

        {!loading && !error && (
          <View style={styles.cardsGrid}>
            {filteredExperiences.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardImageWrapper}>
                  {item.image_url ? (
                    <Image
                      source={{ uri: item.image_url }}
                      style={styles.cardImage}
                    />
                  ) : (
                    <View style={styles.cardImagePlaceholder} />
                  )}
                  {item.category ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.category}</Text>
                    </View>
                  ) : null}
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle} numberOfLines={2}>
                    {item.name}
                  </Text>
                  {item.address ? (
                    <Text style={styles.cardAddress} numberOfLines={1}>
                      {item.address}
                    </Text>
                  ) : null}
                  {item.description ? (
                    <Text style={styles.cardDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                  ) : null}

                  {(item.phone && item.phone !== '-') ||
                  (item.latitude && item.longitude) ? (
                    <View style={styles.cardActions}>
                      {item.latitude && item.longitude ? (
                        <TouchableOpacity
                          style={styles.navigateBtn}
                          onPress={() =>
                            handleNavigate(item.latitude, item.longitude)
                          }
                        >
                          <Text style={styles.navigateBtnText}>นำทาง</Text>
                        </TouchableOpacity>
                      ) : (
                        <View />
                      )}

                      {item.phone && item.phone !== '-' && (
                        <TouchableOpacity
                          style={styles.callBtn}
                          onPress={() => handleCall(item.phone)}
                        >
                          <Text style={styles.callBtnText}>โทร</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroBackground: {
    width: '100%',
    height: 600, // ความสูงของส่วนหัว
    justifyContent: 'center',
  },
  overlayContent: {
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  mainTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 48,
  },
  highlightText: {
    color: '#ec0e0e', 
  },
  subTitle: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    lineHeight: 22,
  },
  exploreBtn: {
    backgroundColor: '#ec0e0e',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  exploreBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  waveContainer: {
    position: 'absolute',
    bottom: -1, // ให้ทับรอยต่อพอดี
    width: '100%',
  },
  contentSection: {
    backgroundColor: '#fff',
    paddingTop: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryTabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#f2f2f2',
  },
  categoryChipActive: {
    backgroundColor: '#ec0e0e',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  statusText: {
    marginTop: 20,
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  cardsGrid: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  card: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  cardImageWrapper: {
    position: 'relative',
    width: '100%',
    height: 180,
    backgroundColor: '#e5e5e5',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e5e5e5',
  },
  badge: {
    position: 'absolute',
    left: 16,
    top: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  badgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 6,
  },
  cardActions: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  cardAddress: {
    fontSize: 13,
    color: '#888',
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
  },
  callBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ec0e0e',
  },
  callBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ec0e0e',
  },
  navigateBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#ec0e0e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  navigateBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});