<template>
    <section class="spots-wrapper">
      
      <div class="header-row">
        <h2 class="title">Pemancingan Terdekat</h2>
  
        <!-- Dropdown Lokasi -->
        <select v-model="selectedLocation" class="location-select">
          <option>Bandung</option>
          <option>Cimahi</option>
          <option>Garut</option>
          <option>Lembang</option>
        </select>
      </div>
  
      <div class="slider-wrapper">
  
        <button 
          class="nav-btn left" 
          v-if="!atStart"
          @click="scrollLeft"
        >◀</button>
  
        <div 
          class="spot-scroll" 
          ref="scrollContainer"
          @scroll="checkScroll"
        >
        <div v-for="spot in filteredSpots" :key="spot.id" class="spot-card">
            <router-link :to="`/spot/${spot.id}`">
              <img :src="spot.image" alt="" />
              <div class="spot-info">
                <h3>{{ spot.name }}</h3>
                <div class="meta">
                  <span>⭐ {{ spot.rating }}</span>
                  <span>📍 {{ spot.distance }} km</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
  
        <button 
          class="nav-btn right" 
          v-if="!atEnd"
          @click="scrollRight"
        >▶</button>
  
      </div>
  
      <button class="see-all" @click="goToSpots">Lihat Semua</button>
    </section>
  </template>
  
  
  <script>
export default {
  name: "FishingSpotSlider",

  data() {
    return {
      atStart: true,
      atEnd: false,

      selectedLocation: "Bandung",

      spots: [
        // Bandung (6)
        { id: 1, name: "Pemancingan Cibiru", rating: 4.7, distance: 3.2, city: "Bandung", image: "https://picsum.photos/300/200?15" },
        { id: 2, name: "Strike Valley Bandung", rating: 4.6, distance: 5.1, city: "Bandung", image: "https://picsum.photos/300/200?16" },
        { id: 3, name: "Danau Biru Bandung", rating: 4.8, distance: 8.2, city: "Bandung", image: "https://picsum.photos/300/200?17" },
        { id: 4, name: "Ranca Upas Fishing", rating: 4.9, distance: 25.4, city: "Bandung", image: "https://picsum.photos/300/200?18" },
        { id: 5, name: "Kampoeng Mancing", rating: 4.5, distance: 12.6, city: "Bandung", image: "https://picsum.photos/300/200?19" },
        { id: 6, name: "Strike Corner Bandung", rating: 4.6, distance: 9.8, city: "Bandung", image: "https://picsum.photos/300/200?20" },

        // Cimahi (6)
        { id: 7, name: "Cimahi Fishing Spot", rating: 4.8, distance: 6.4, city: "Cimahi", image: "https://picsum.photos/300/200?21" },
        { id: 8, name: "Kolam Strike Cimahi", rating: 4.7, distance: 4.7, city: "Cimahi", image: "https://picsum.photos/300/200?22" },
        { id: 9, name: "Danau Cimahi", rating: 4.5, distance: 10.1, city: "Cimahi", image: "https://picsum.photos/300/200?23" },
        { id: 10, name: "Cimahi Fish Park", rating: 4.9, distance: 11.5, city: "Cimahi", image: "https://picsum.photos/300/200?24" },
        { id: 11, name: "Strike Point Cimahi", rating: 4.6, distance: 8.2, city: "Cimahi", image: "https://picsum.photos/300/200?25" },
        { id: 12, name: "Cimahi Angler Spot", rating: 4.7, distance: 6.9, city: "Cimahi", image: "https://picsum.photos/300/200?26" },

        // Garut (6)
        { id: 13, name: "Kolam Strike Garut", rating: 4.6, distance: 44.1, city: "Garut", image: "https://picsum.photos/300/200?27" },
        { id: 14, name: "Garut Fishing Valley", rating: 4.5, distance: 42.6, city: "Garut", image: "https://picsum.photos/300/200?28" },
        { id: 15, name: "Situ Bagendit Fishing", rating: 4.8, distance: 49.3, city: "Garut", image: "https://picsum.photos/300/200?29" },
        { id: 16, name: "Strike Paradise Garut", rating: 4.7, distance: 50.8, city: "Garut", image: "https://picsum.photos/300/200?30" },
        { id: 17, name: "Kolam Sakti Garut", rating: 4.6, distance: 45.0, city: "Garut", image: "https://picsum.photos/300/200?31" },
        { id: 18, name: "Danau Legenda Garut", rating: 4.7, distance: 46.7, city: "Garut", image: "https://picsum.photos/300/200?32" },
      ]
    };
  },

  computed: {
    filteredSpots() {
      return this.spots.filter(s => s.city === this.selectedLocation);
    }
  },

  mounted() {
    this.checkScroll();
  },

  methods: {
    scrollLeft() {
      this.$refs.scrollContainer.scrollBy({ left: -250, behavior: 'smooth' });
    },
    scrollRight() {
      this.$refs.scrollContainer.scrollBy({ left: 250, behavior: 'smooth' });
    },
    checkScroll() {
      const el = this.$refs.scrollContainer;
      this.atStart = el.scrollLeft === 0;
      this.atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
    },
    goToSpots() {
      this.$router.push("/spots");
    }
  }
};
</script>

  
<style scoped>
.spots-wrapper {
  background: #e8f2ff;
  padding: 20px;
  margin: 40px 15px;
  border-radius: 18px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #0c2a6a;
}

.location-select {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #b9d3ff;
  background: white;
  font-size: 14px;
  cursor: pointer;
}

.slider-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.nav-btn {
  position: absolute;
  background: white;
  border-radius: 50%;
  border: none;
  width: 35px;
  height: 35px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.left { left: -12px; }
.right { right: -12px; }

.spot-scroll {
  display: flex;
  overflow-x: auto;
  gap: 14px;
  padding: 10px 0;
  scrollbar-width: none;
}

.spot-scroll::-webkit-scrollbar { display: none; }

.spot-card {
  min-width: 180px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  cursor: pointer;
  transition: .2s;
}

.spot-card:hover { transform: translateY(-4px); }

.spot-card img {
  width: 100%;
  height: 130px;
  object-fit: cover;
}

.spot-info { padding: 8px; text-align: left; }

.spot-info h3 {
  font-size: 14px;
  margin-bottom: 4px;
  font-weight: 600;
}

.meta { font-size: 12px; display: flex; justify-content: space-between; }

.see-all {
  margin: 12px auto 0;
  padding: 6px 18px;
  font-size: 14px;
  background: #004aad;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: block;
  width: fit-content;
}

</style>

  