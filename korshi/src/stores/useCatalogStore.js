import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import apartmentImage from '@/assets/img/apartment.png';

export const useCatalogStore = defineStore('catalog', () => {
  const selectedLangTypes = ref([]);
  const filters = ref({ price: [0, 9999999], numOfRooms: [1, 5] });

  const products = ref([]);

  const filteredProducts = computed(() => {
    return products.value
      .filter(
        (p) => !selectedLangTypes.value.length || selectedLangTypes.value.includes(p.landType)
      )
      .filter((p) => p.price >= filters.value.price[0] && p.price <= filters.value.price[1])
      .filter(
        (p) =>
          p.numOfRooms >= filters.value.numOfRooms[0] && p.numOfRooms <= filters.value.numOfRooms[1]
      );
  });

  async function loadProducts() {
    const arr = Array.from({ length: 20 }, (_, index) => {
      const randomPrice = Math.floor(Math.random() * (2000000 - 10000 + 1)) + 10000;
      const randomLandType = ['room', 'apartment', 'house'][Math.floor(Math.random() * 3)];
      const randomNumOfRooms = Math.floor(Math.random() * 5) + 1;

      return {
        id: index + 1,
        image: apartmentImage,
        title: `Almatinskaya St ${index + 1}/${index + 1}, Kaskelen`,
        city: 'Almaty',
        description:
          'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.',
        price: randomPrice,
        landType: randomLandType,
        numOfRooms: randomNumOfRooms,
      };
    });
    products.value = [...arr];
    return arr;
  }

  return { selectedLangTypes, filters, filteredProducts, products, loadProducts };
});
