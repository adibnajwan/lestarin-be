const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const plants = [
    {
      name: 'Rafflesia Arnoldii',
      scientificName: 'Rafflesia arnoldii R.Br.',
      region: 'Sumatera',
      description:
        'Bunga terbesar di dunia yang merupakan tumbuhan parasit. Tidak memiliki daun, batang, dan akar. Ditemukan di hutan hujan tropis Sumatera.',
      benefits: ['Objek Penelitian', 'Ikon Pariwisata', 'Simbol Konservasi'],
      conservationStatus: 'EN',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/0/03/Rafflesia_arnoldii.jpg',
    },
    {
      name: 'Anggrek Hitam',
      scientificName: 'Coelogyne pandurata Lindl.',
      region: 'Kalimantan',
      description:
        'Anggrek endemik Kalimantan dengan kelopak bunga berwarna hijau dan lidah bunga berwarna hitam. Tumbuh di hutan hujan tropis dataran rendah.',
      benefits: [
        'Tanaman Hias',
        'Objek Penelitian',
        'Bunga Nasional Kalimantan Timur',
      ],
      conservationStatus: 'VU',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/7/77/Coelogyne_pandurata_Orchi_001.jpg',
    },
    {
      name: 'Kantong Semar Raksasa',
      scientificName: 'Nepenthes rajah Hook.f.',
      region: 'Kalimantan',
      description:
        'Tumbuhan karnivora terbesar di dunia, mampu menangkap tikus kecil dan serangga. Kantongnya bisa menampung hingga 3,5 liter cairan.',
      benefits: ['Pengendali Hama', 'Tanaman Hias', 'Objek Penelitian'],
      conservationStatus: 'EN',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/e/e7/Nepenthes_rajah_giant.jpg',
    },
    {
      name: 'Pohon Kayu Hitam',
      scientificName: 'Diospyros celebica Bakh.',
      region: 'Sulawesi',
      description:
        'Pohon endemik Sulawesi dengan kayu berwarna hitam yang sangat keras dan bernilai tinggi. Tumbuh di hutan hujan tropis.',
      benefits: ['Bahan Bangunan', 'Kerajinan Tangan', 'Furniture Mewah'],
      conservationStatus: 'VU',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Diospyros_celebica_fruit.jpg/800px-Diospyros_celebica_fruit.jpg',
    },
    {
      name: 'Matoa',
      scientificName: 'Pometia pinnata Forst.',
      region: 'Papua',
      description:
        'Pohon buah endemik Papua dengan rasa yang unik seperti campuran rambutan dan kelengkeng. Tumbuh di hutan dataran rendah hingga pegunungan.',
      benefits: ['Buah Konsumsi', 'Bahan Bangunan', 'Obat Tradisional'],
      conservationStatus: 'LC',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Matoa.jpg/800px-Matoa.jpg',
    },
    {
      name: 'Cendana',
      scientificName: 'Santalum album L.',
      region: 'Nusa Tenggara',
      description:
        'Pohon penghasil kayu wangi yang sangat berharga. Endemik di kepulauan Nusa Tenggara, terutama di Timor dan sekitarnya.',
      benefits: [
        'Minyak Atsiri',
        'Kayu Wangi',
        'Obat Tradisional',
        'Kerajinan',
      ],
      conservationStatus: 'VU',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Santalum_album_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-123.jpg/800px-Santalum_album_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-123.jpg',
    },
  ];

  console.log('Start seeding...');

  // Clear existing data
  await prisma.plant.deleteMany();

  // Insert new data
  for (const plant of plants) {
    const result = await prisma.plant.create({
      data: plant,
    });
    console.log(`Created plant with id: ${result.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
