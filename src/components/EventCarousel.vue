<template>
  <section class="event-carousel" @mouseenter="pauseAuto" @mouseleave="startAuto">
    
    <div class="carousel-viewport" ref="viewport">
      <div class="carousel-track" ref="track">
        
        <!-- duplicate last slide (before first) -->
        <div
          class="slide-wrap"
          v-for="(item, index) in displayEvents"
          :key="index"
          :class="{ active: index === currentDisplayIndex }"
          @click="goTo(index)"
          @touchstart="onTouchStart($event)"
          @touchmove="onTouchMove($event)"
          @touchend="onTouchEnd"
        >
          <div class="card-outline">
            <div class="event-card">
              <h2 class="event-title">{{ item.title }}</h2>
              <p class="event-desc">{{ item.desc }}</p>
              <button class="register-btn">Daftar Sekarang</button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- NAVIGATION -->
    <button class="nav left" @click="prev">❮</button>
    <button class="nav right" @click="next">❯</button>

    <!-- DOTS -->
    <div class="dots">
      <span
        v-for="(item,i) in events"
        :key="i"
        class="dot"
        :class="{ active: i === realIndex }"
        @click="goToReal(i)"
      ></span>
    </div>

  </section>
</template>

<script>
export default {
  name: "EventCarousel",
  data() {
    return {
      events: [
        { title: "🎣 Festival Nasional Strike Mania", desc: "Hadiah total 50 juta!" },
        { title: "🔥 Strike Week Promo", desc: "Diskon member & bonus pancing premium!" },
        { title: "🏆 Turnamen Ikan Trophy", desc: "Menangkan piala & gear keren!" },
        { title: "🎁 Promo Umpan & Peralatan", desc: "Buy 1 get 1 terbatas!" }
      ],
      currentIndex: 1, // start at first real slide
      autoSlide: null,
      autoDelay: 4000,
      touchStartX: 0,
      touchEndX: 0,
    };
  },

  computed: {
    displayEvents() {
      // [last, ...events, first]
      return [
        this.events[this.events.length - 1],
        ...this.events,
        this.events[0]
      ];
    },

    currentDisplayIndex() {
      return this.currentIndex;
    },

    realIndex() {
      if (this.currentIndex === 0) return this.events.length - 1;
      if (this.currentIndex === this.events.length + 1) return 0;
      return this.currentIndex - 1;
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.centerSlide(false);
      this.startAuto();
      window.addEventListener("resize", () => this.centerSlide(false));
    });
  },

  beforeUnmount() {
    clearInterval(this.autoSlide);
  },

  methods: {
    startAuto() {
      clearInterval(this.autoSlide);
      this.autoSlide = setInterval(this.next, this.autoDelay);
    },

    pauseAuto() {
      clearInterval(this.autoSlide);
    },

    centerSlide(smooth = true) {
      const viewport = this.$refs.viewport;
      const slides = this.$el.querySelectorAll(".slide-wrap");
      const slide = slides[this.currentIndex];

      if (!slide) return;

      const vp = viewport.getBoundingClientRect();
      const p = slide.getBoundingClientRect();
      const offset = (p.left - vp.left) + p.width / 2 - vp.width / 2;

      viewport.scrollTo({ left: viewport.scrollLeft + offset, behavior: smooth ? "smooth" : "auto" });
    },

    next() {
      this.currentIndex++;
      this.centerSlide();
      this.handleLoop();
    },

    prev() {
      this.currentIndex--;
      this.centerSlide();
      this.handleLoop();
    },

    handleLoop() {
      setTimeout(() => {
        if (this.currentIndex === this.events.length + 1) {
          this.currentIndex = 1;
          this.centerSlide(false);
        }
        if (this.currentIndex === 0) {
          this.currentIndex = this.events.length;
          this.centerSlide(false);
        }
      }, 500);
    },

    goTo(index) {
      this.currentIndex = index;
      this.centerSlide();
      this.handleLoop();
    },

    goToReal(realIndex) {
      this.currentIndex = realIndex + 1;
      this.centerSlide();
    },

    onTouchStart(e) { this.touchStartX = e.touches[0].clientX; },
    onTouchMove(e) { this.touchEndX = e.touches[0].clientX; },
    onTouchEnd() {
      const delta = this.touchEndX - this.touchStartX;
      if (delta < -50) this.next();
      if (delta > 50) this.prev();
    }
  }
};
</script>

<style scoped>
.event-carousel {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 18px;
  position: relative;
}

.carousel-viewport {
  width: 90%;
  overflow: hidden;
  padding: 0 10%;
}

.carousel-track {
  display: flex;
  gap: 22px;
  align-items: center;
}

/* Slider cards */
.slide-wrap {
  flex: 0 0 60%;
  opacity: 0.6;
  transform: scale(0.82);
  transition: 0.5s ease;
}

.slide-wrap.active {
  transform: scale(1.03);
  opacity: 1;
  z-index: 10;
}

/* outline */
.card-outline {
  width: 100%;
  padding: 14px;
  border-radius: 18px;
  background: rgba(255,255,255,0.03);
  box-shadow: 0 18px 42px rgba(0,0,0,0.18);
}

.event-card {
  background: linear-gradient(135deg, #3b82f6, #0f2167);
  color: white;
  padding: 28px;
  border-radius: 12px;
  text-align: center;
}

/* dots */
.dots {
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%);
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  display: inline-block;
  margin: 0 5px;
  background: rgba(255,255,255,0.4);
}

.dot.active {
  background: white;
}

.register-btn {
  background: #ffda45; /* kuning halus */
  color: #000;
  border: none;
  padding: 12px 26px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;

  /* efek halus */
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(255, 218, 69, 0.35);
}

.register-btn:hover {
  background: #ffd12a; /* sedikit lebih gelap saat hover */
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 6px 18px rgba(255, 218, 69, 0.55);
}

.register-btn:active {
  transform: scale(0.97);
  box-shadow: 0 3px 10px rgba(255, 218, 69, 0.35);
}


/* arrows */
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 26px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 6px 14px;
  border-radius: 100px;
  cursor: pointer;
}

.left { left: 6%; }
.right { right: 6%; }

@media (max-width: 900px) {
  .carousel-viewport { width: 100%; padding: 0 6%; }
  .slide-wrap { flex: 0 0 80%; }
  .nav { display: none; }
}
</style>
