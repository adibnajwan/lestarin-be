const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const plants = [
    {
      name: 'Kantong Semar',
      scientificName: 'Nepenthes inermis',
      region: 'Sumatra',
      description:
        'Has a small trap that is useful for catching flying insects.',
      benefits: [],
      conservationStatus: 'Vulnerable',
      imageUrl:
        'https://live.staticflickr.com/4057/4645545812_4203a03d3b_b.jpg',
      source: 'https://www.scribd.com/doc/311311946/ENDEMIK-docx',
    },
    {
      name: 'Damar Putih',
      scientificName: 'Agathis alba',
      region: 'Sumatra',
      description:
        'The wood is yellowish-white and produces sap or resin (kopal)',
      benefits: ['Reforestation'],
      conservationStatus: 'Rare',
      imageUrl:
        'https://forestryinformation.wordpress.com/wp-content/uploads/2011/07/071911_0723_agathisalba1.jpg?w=584',
      source:
        'https://jurnalsyntaxadmiration.com/index.php/jurnal/article/view/727/1096',
    },
    {
      name: 'Bunga Bangkai',
      scientificName: '',
      region: 'Sumatra',
      description:
        'Each phase (leafy and flowering) never appears simultaneously in a single plant',
      benefits: [],
      conservationStatus: 'Rare',
      imageUrl:
        'https://cdn.rri.co.id/berita/Bandar_Lampung/o/1733379808270-foto_4_-_5_Desember_2024/dbo8142316o5yz1.jpeg',
      source:
        'https://d1wqtxts1xzle7.cloudfront.net/57499788/STRATEGI_DAN_RENCANA_AKSI_KONSERVASI_BUNGA_BANGKAI_Amorphophallus_titanum_2015_-_2025-libre.pdf',
    },
    {
      name: 'Nyamplung',
      scientificName: 'Calophyllum parvifolium',
      region: 'Papua',
      description:
        'Produces white or yellow sap, and its flowers are arranged in clusters',
      benefits: ['The seeds can be processed into biodiesel and biofuel'],
      conservationStatus: 'Endangered',
      imageUrl:
        'https://inaturalist-open-data.s3.amazonaws.com/photos/65387240/medium.jpeg',
      source:
        'https://download.garuda.kemdikbud.go.id/article.php?article=609868',
    },
    {
      name: 'Bunga-bunga puteh',
      scientificName: 'Ottelia mesenterium',
      region: 'Sulawesi',
      description:
        'The leaves are numerous, long and ribbon-shaped with curled edges, giving them a distinctive and attractive appearance.',
      benefits: [],
      conservationStatus: 'Unknown',
      imageUrl: '',
      source:
        'https://data.brin.go.id/dataset.xhtml?persistentId=hdl:20.500.12690/RIN/86OC5J',
    },
    {
      name: 'Mangga liar',
      scientificName: 'Mangifera Pajang Kostermann',
      region: 'Borneo',
      description: 'Berukuran besar',
      benefits: [],
      conservationStatus: 'Rare',
      imageUrl: '',
      source:
        'https://data.brin.go.id/dataset.xhtml?persistentId=hdl:20.500.12690/RIN/H0VC6E',
    },
    {
      name: 'Maladewa',
      scientificName: 'Macadamia hildebrandii Steenis',
      region: 'Sulawesi',
      description:
        'It reaches a height of 14 meters and has purple-white flowers. Its edible seeds have a rich, buttery flavor with a hint of sweetness.',
      benefits: ['The tree, seeds, and wood can be utilized'],
      conservationStatus: 'Unknown',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP5WdRAEwkIc9s38_9qKKGvoIs7qFZ27QaGw&s',
      source:
        'https://data.brin.go.id/dataset.xhtml?persistentId=hdl:20.500.12690/RIN/KBYVDB',
    },
    {
      name: 'Anggrek Hitam',
      scientificName: 'Coelogyne pandurata',
      region: 'Borneo, Sumatra',
      description:
        'In its natural habitat, it flowers once a year, blooms for 5-7 days, and is difficult to self-pollinate',
      benefits: ['Flowering plants'],
      conservationStatus: 'Endangered',
      imageUrl:
        'https://deorchids.com/wp-content/uploads/2023/07/Anggrek-Hitam-Coelogyne-pandurata.jpg',
      source: 'https://journal.bkpsl.org/index.php/jplb/article/view/21/37',
    },
    {
      name: 'Anggrek Bulan',
      scientificName: 'Phalaenopsis javanica',
      region: 'Java, Sumatra',
      description:
        "It's relatively small in size compared to the white moon orchid (anggrek bulan putih)",
      benefits: ['Flowering plants'],
      conservationStatus: 'Endangered',
      imageUrl:
        'https://2.bp.blogspot.com/-D8u54zvtJvE/WcjEzCpqdTI/AAAAAAAAHDU/jmO-973WLFUaiD7CpNJLyfOknyuLH8uGgCLcBGAs/s1600/anggrek%2Bbulan%2BPhalaenopsis%2Bjavanica.jpg',
      source:
        'https://journal.ipb.ac.id/index.php/jurnalagronomi/article/view/32014/21017',
    },
    {
      name: 'Kayu eboni / Kayu hitam sulawesi',
      scientificName: 'Diospyros celebica',
      region: 'Sulawesi',
      description:
        'Has a very beautiful wood pattern composed of black and reddish-brown stripes',
      benefits: ['Furniture'],
      conservationStatus: 'Endangered',
      imageUrl:
        'https://himaba.fkt.ugm.ac.id/wp-content/uploads/sites/403/2019/09/eboni.jpg',
      source:
        'https://iopscience.iop.org/article/10.1088/1755-1315/522/1/012018/pdf',
    },
    {
      name: 'Orthosiphon cf. waigeonensis',
      scientificName: 'Orthosiphon cf. waigeonensis',
      region: 'Papua',
      description: 'Similar to "Kumis Kucing" plant',
      benefits: [],
      conservationStatus: 'Unknown',
      imageUrl: '',
      source:
        'https://download.garuda.kemdikbud.go.id/article.php?article=609868',
    },
    {
      name: 'Guioa waigeoensis',
      scientificName: 'Guioa waigeoensis',
      region: 'Papua',
      description:
        'The tree is small, about 4 meters tall with a diameter of only about 5 cm.',
      benefits: [],
      conservationStatus: 'Endangered',
      imageUrl: '',
      source:
        'https://download.garuda.kemdikbud.go.id/article.php?article=609868',
    },
    {
      name: 'Alstonia beatricis',
      scientificName: 'Alstonia beatricis',
      region: 'Papua',
      description: '',
      benefits: ['Traditional medicine'],
      conservationStatus: 'Endangered',
      imageUrl: '',
      source:
        'https://download.garuda.kemdikbud.go.id/article.php?article=609868',
    },
    {
      name: 'Schefflera apiculata',
      scientificName: 'Schefflera apiculata',
      region: 'Papua',
      description: '',
      benefits: [],
      conservationStatus: 'Endangered',
      imageUrl: '',
      source:
        'https://download.garuda.kemdikbud.go.id/article.php?article=609868',
    },
    {
      name: 'Nepenthes danseri',
      scientificName: 'Nepenthes danseri',
      region: 'Papua',
      description: '',
      benefits: [],
      conservationStatus: 'Endangered',
      imageUrl: '',
      source:
        'https://download.garuda.kemdikbud.go.id/article.php?article=609868',
    },
    {
      name: 'Calamus manan',
      scientificName: 'Calamus manan Miq.',
      region: 'Sumatra',
      description: '',
      benefits: [],
      conservationStatus: 'Endangered',
      imageUrl: '',
      source:
        'https://data.brin.go.id/dataset.xhtml?persistentId=hdl:20.500.12690/RIN/8SDWOH',
    },
    {
      name: 'Nepenthes mirabilis',
      scientificName: 'Nepenthes mirabilis (Lour.) Druce',
      region: 'Sumatra',
      description: '',
      benefits: [],
      conservationStatus: 'Endangered',
      imageUrl: '',
      source:
        'https://data.brin.go.id/dataset.xhtml?persistentId=hdl:20.500.12690/RIN/8SDWOH',
    },
    {
      name: 'Amorphophallus titanum',
      scientificName: 'Amorphophallus titanum (Becc.) Becc. Ex Arcangeli',
      region: 'Sumatra',
      description: '',
      benefits: [],
      conservationStatus: 'Rare',
      imageUrl: '',
      source:
        'https://data.brin.go.id/dataset.xhtml?persistentId=hdl:20.500.12690/RIN/8SDWOH',
    },
    {
      name: 'Aquilaria malaccensis',
      scientificName: 'Aquilaria malaccensis Lam.',
      region: 'Sumatra',
      description: '',
      benefits: [],
      conservationStatus: 'Rare',
      imageUrl: '',
      source:
        'https://data.brin.go.id/dataset.xhtml?persistentId=hdl:20.500.12690/RIN/8SDWOH',
    },
    {
      name: 'Anggrek Ekor Tikus',
      scientificName: 'Paraphalaenopsis serpentilingua',
      region: 'Borneo',
      description: '',
      benefits: [],
      conservationStatus: 'Rare',
      imageUrl:
        'https://groceria.co.id/wp-content/uploads/2023/06/Anggrek-Ekor-Tikus-Paraphalaenopsis-serpentilingua.webp',
      source:
        'https://data.brin.go.id/dataset.xhtml?persistentId=hdl:20.500.12690/RIN/XWGMZK',
    },
    {
      name: 'Paphiopedilum tonsum',
      scientificName: 'Paphiopedilum tonsum',
      region: 'Sumatra',
      description: '',
      benefits: [],
      conservationStatus: 'Unknown',
      imageUrl: '',
      source:
        'https://data.brin.go.id/dataset.xhtml?persistentId=hdl:20.500.12690/RIN/SVSKYB',
    },
    {
      name: 'Bulbophyllum sociale',
      scientificName: 'Bulbophyllum sociale',
      region: 'Sumatra',
      description: '',
      benefits: [],
      conservationStatus: 'Unknown',
      imageUrl: '',
      source:
        'https://data.brin.go.id/dataset.xhtml?persistentId=hdl:20.500.12690/RIN/SVSKYB',
    },
    {
      name: 'Kokoleceran',
      scientificName: 'Vatica bantamensis',
      region: 'Java',
      description: 'It is the provincial flower mascot of Banten',
      benefits: [],
      conservationStatus: 'Rare',
      imageUrl:
        'https://cdn.grid.id/crop/0x0:0x0/780x800/photo/bobofoto/original/6109_kokoleceran.jpg',
      source:
        'https://data.brin.go.id/dataset.xhtml?persistentId=hdl:20.500.12690/RIN/YKBMUS',
    },
    {
      name: 'Menteng besar',
      scientificName: 'Baccaurea dulcis',
      region: 'Sumatra',
      description: '',
      benefits: [],
      conservationStatus: 'Endangered',
      imageUrl: '',
      source:
        'https://data.brin.go.id/dataset.xhtml?persistentId=hdl:20.500.12690/RIN/PMBLFX',
    },
    {
      name: 'Osmoxylon Borneense',
      scientificName: 'Osmoxylon Borneense Seem',
      region: 'Borneo',
      description: 'Most of them are found on the banks of the Busang River',
      benefits: ['Flowering plants'],
      conservationStatus: 'Unknown',
      imageUrl:
        'https://bs.plantnet.org/image/o/98d56fda537ba7f7d6c156b1592c7d5cbeb8ba59',
      source:
        'https://data.brin.go.id/dataset.xhtml?persistentId=hdl:20.500.12690/RIN/LMPAUE',
    },
    {
      name: 'Asam kalimbawan',
      scientificName: 'Sarcotheca diversifolia',
      region: 'Borneo',
      description:
        'Can live in highlands or lowlands, but is usually found in swamp forests or hilly areas',
      benefits: [
        'Fruit preserves',
        'traditional medicine to reduce fever',
        'inflammation',
        'and cure thrush',
      ],
      conservationStatus: 'Unknown',
      imageUrl: '',
      source:
        'https://data.brin.go.id/dataset.xhtml?persistentId=hdl:20.500.12690/RIN/SZVSNY',
    },
    {
      name: 'Bunga Padma Raksasa',
      scientificName: 'Rafflesia arnoldii',
      region: 'Sumatra',
      description: 'The largest parasitic flower, living on a plant host',
      benefits: [],
      conservationStatus: 'Endangered',
      imageUrl:
        'https://mmc.tirto.id/image/2018/01/09/rafflesia-arnoldii-istock_ratio-16x9.jpg',
      source: 'https://ejournal.unib.ac.id/hayati/article/view/14387/8724',
    },
    {
      name: 'Buah Merah',
      scientificName: 'Pandanus conoideus Lamk.',
      region: 'Papua',
      description:
        'Local red-fruited pandanus plants are high in carotenoids and oils (alpha/beta-carotene)',
      benefits: ['Supplements', 'food ingredients', 'and oils'],
      conservationStatus: 'Unknown',
      imageUrl:
        'https://media.springernature.com/lw685/springer-static/image/chp%3A10.1007%2F978-3-030-38389-3_172/MediaObjects/454780_1_En_172_Fig2_HTML.jpg',
      source: '',
    },
    {
      name: 'Saraca celebica',
      scientificName: 'Saraca celebica',
      region: 'Sulawesi',
      description: 'The orange-red flowers and have a fragrant aroma.',
      benefits: [],
      conservationStatus: 'Unknown',
      imageUrl:
        'https://api.gbif.org/v1/image/cache/200x/occurrence/2513095729/media/d3692dab2b42649c6205212d5e2ad550',
      source:
        'https://repository.naturalis.nl/pub/524671/BLUM1981027001011.pdf',
    },
    {
      name: 'Edelweiss jawa',
      scientificName: 'Anaphalis javanica',
      region: 'Java',
      description:
        'The flowers that grow in these highlands are often called eternal flowers because of their ability to stay in bloom for a long time and not wilt easily',
      benefits: ['Flowering plants'],
      conservationStatus: 'Endangered',
      imageUrl:
        'https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/nawacitapost/2022/05/406078196.jpg',
      source: 'https://repository.ub.ac.id/id/eprint/219564/',
    },
    {
      name: 'Mahoni',
      scientificName: 'Aglaia ceramic',
      region: 'Maluku',
      description:
        'Has a reddish-brown color with straight black fibers, a smooth texture, and is easy to shape',
      benefits: ['Furniture'],
      conservationStatus: 'Endangered',
      imageUrl: '',
      source: 'https://www.scribd.com/doc/311311946/ENDEMIK-docx',
    },
    {
      name: 'Bunga Bangkai Raksasa',
      scientificName: 'Amorphophallus gigas',
      region: 'Sumatra',
      description:
        'Flowers that are known for their enormous height and width, sometimes reaching several meters',
      benefits: [],
      conservationStatus: 'Endangered',
      imageUrl:
        'https://cdn.antaranews.com/cache/1200x800/2023/06/13/IMG-20230612-WA0026.jpg',
      source:
        'https://www.e3s-conferences.org/articles/e3sconf/pdf/2024/49/e3sconf_talenta2024_04007.pdf',
    },
  ];

  console.log('Start seeding...');

  // Clear existing data
  await prisma.plant.deleteMany();
  
  // Reset ID sequence
  await prisma.$queryRaw`ALTER SEQUENCE "Plant_id_seq" RESTART WITH 1`;

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
