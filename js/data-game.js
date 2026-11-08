/* =========================================
   PS3 GAMING - DAFTAR GAME
   Tambah / hapus / ubah game di sini saja.
   n = nama, k = kategori, img = nama file di folder Assets (tanpa ekstensi juga boleh), d = penjelasan
   ========================================= */
/* ========= DATA GAME =========
   img: nama file di folder "Assets". Kosongkan kalau belum ada gambar,
   nanti otomatis tampil sampul bergaya. */
const games = [
  {n:"PES Gembox 2027", k:"Bola", img:"Gembox 2027", pos:"12% center", d:"Patch eFootball/PES terbaru untuk PS3: transfer pemain, jersey, dan liga musim 2026/2027. Selalu di-update di lokasi kami."},
  {n:"FIFA Street", k:"Bola", img:"fifa-street", d:"Sepak bola jalanan dengan gaya freestyle dan skill trik. Main di lapangan kecil, cocok untuk adu skill bareng teman."},

  {n:"Army of Two: The Devil's Cartel", k:"Tembak", img:"Army Of Two", d:"Dua tentara bayaran bekerja sama melawan kartel di Meksiko. Paling seru dimainkan berdua (co-op)."},
  {n:"Assassin's Creed IV Black Flag", k:"Aksi", img:"Assassins Creed IV", d:"Jadi bajak laut Edward Kenway, berlayar di Karibia, perang kapal, dan jelajah pulau-pulau dunia terbuka."},
  {n:"Assassin's Creed Rogue", k:"Aksi", img:"Assassins Creed Rogue", d:"Main sebagai Shay Cormac, assassin yang berbalik memburu kelompoknya sendiri di Amerika Utara yang dingin."},
  {n:"Basara 4", k:"Anime", img:"Basara 4", d:"Sengoku Basara 4 Sumeragi: aksi samurai melawan ratusan pasukan sekaligus di Jepang zaman Sengoku."},
  {n:"Batman Arkham Origins", k:"Aksi", img:"batman-origins", d:"Kisah awal Batman yang diburu delapan pembunuh bayaran di malam Natal kota Gotham."},
  {n:"Battlefield 4", k:"Tembak", img:"Battlefield 4", d:"Perang modern skala besar dengan kendaraan tempur, gedung yang bisa hancur, dan senjata lengkap."},
  {n:"Call of Duty Advanced Warfare", k:"Tembak", img:"cod-aw", d:"Perang masa depan dengan exoskeleton yang bikin bisa lompat tinggi dan bergerak super cepat."},
  {n:"Call of Duty Black Ops", k:"Tembak", img:"cod-bo", d:"Misi rahasia era Perang Dingin bersama Alex Mason. Ada juga mode Zombies yang terkenal."},
  {n:"Call of Duty Black Ops II", k:"Tembak", img:"cod-bo2", d:"Cerita dua zaman, 1980-an dan 2025, dengan pilihan yang mengubah akhir cerita. Mode Zombies lengkap."},
  {n:"Call of Duty Ghosts", k:"Tembak", img:"cod-ghosts", d:"Pasukan elit Ghosts melawan musuh setelah Amerika lumpuh, ditemani anjing tempur bernama Riley."},
  {n:"Call of Juarez The Cartel", k:"Tembak", img:"call-of-juarez", d:"Tiga penegak hukum memburu kartel narkoba Meksiko dalam aksi tembak-tembakan modern."},
  {n:"Call of Duty World at War", k:"Tembak", img:"cod-5", d:"Perang Dunia II di front Pasifik dan Eropa. Game pertama yang punya mode Zombies."},
  {n:"Crysis 3", k:"Tembak", img:"Crysis 3", d:"Prophet dengan Nanosuit dan busur canggih bertarung di New York yang tertutup kubah hutan."},
  {n:"Far Cry 4", k:"Tembak", img:"Farcry4", d:"Dunia terbuka di pegunungan Kyrat. Bisa naik gajah, berburu, dan melawan diktator Pagan Min."},
  {n:"Fight Night Round 4", k:"Olahraga", img:"Fight Night Round 4", d:"Game tinju realistis dengan petinju legendaris dan mode karier."},

  {n:"God of War 3", k:"Aksi", img:"god-of-war-3", d:"Kratos membalas dendam pada dewa-dewa Olympus dengan pertarungan brutal dan bos raksasa."},
  {n:"Grand Theft Auto San Andreas", k:"Aksi", img:"gta-sa", d:"Petualangan CJ di negara bagian San Andreas. Dunia terbuka luas dengan banyak misi dan kendaraan."},
  {n:"Grand Theft Auto V Mod Indonesia", k:"Aksi", img:"gta-v", d:"GTA V dengan mod nuansa Indonesia: kendaraan, plat nomor, dan suasana lokal. Ukuran sekitar 27 GB."},
  {n:"inFAMOUS 2", k:"Aksi", img:"infamous-2", d:"Cole MacGrath dengan kekuatan listrik memilih jalan jadi pahlawan atau penjahat di kota New Marais."},
  {n:"Hitman", k:"Aksi", img:"hitman", d:"Jadi Agent 47, pembunuh bayaran profesional. Selesaikan target dengan cara diam-diam atau terang-terangan."},
  {n:"Ninja Gaiden 3", k:"Aksi", img:"ninja3", d:"Ryu Hayabusa bertarung cepat dengan pedang melawan musuh-musuh dalam aksi ninja yang intens."},
  {n:"Middle-Earth: Shadow of Mordor", k:"Aksi", img:"shadow-of-mordor", d:"Petualangan di dunia Middle-earth dengan sistem Nemesis, musuh yang ingat dan berkembang setelah melawanmu."},
  {n:"Sleeping Dogs", k:"Aksi", img:"sleeping-dogs", d:"Polisi menyamar masuk geng di Hong Kong. Dunia terbuka dengan pertarungan kungfu dan kejar-kejaran mobil."},
  {n:"Tomb Raider Underworld", k:"Aksi", img:"Tomb Raider", d:"Lara Croft menjelajah reruntuhan kuno dan memecahkan teka-teki untuk mencari artefak legendaris."},
  {n:"The Last of Us", k:"Aksi", img:"the-last-of-us", d:"Joel dan Ellie bertahan hidup di dunia setelah wabah. Cerita emosional dengan gameplay survival."},
  {n:"Watch Dogs", k:"Aksi", img:"watch-dogs", d:"Aiden Pearce meretas sistem kota Chicago untuk balas dendam. Dunia terbuka dengan fitur hacking."},
  {n:"Transformers Revenge of the Fallen", k:"Aksi", img:"transformers", d:"Pilih Autobot atau Decepticon dan bertarung sebagai robot yang bisa berubah jadi kendaraan."},
  {n:"Resident Evil 5 Gold Edition", k:"Horor", img:"re5", d:"Chris dan Sheva melawan wabah di Afrika. Versi Gold dengan konten tambahan, bisa main berdua."},
  {n:"Resident Evil 6", k:"Horor", img:"re6", d:"Empat cerita berbeda dengan Leon, Chris, Jake, dan Ada melawan serangan senjata biologis global."},

  {n:"Medal of Honor Warfighter", k:"Tembak", img:"Medal Of Honor", d:"Misi pasukan khusus Tier 1 di berbagai negara, terinspirasi operasi militer nyata."},
  {n:"Metro Last Light", k:"Tembak", img:"metro-last-light", d:"Bertahan hidup di terowongan metro Moskow setelah perang nuklir. Suasana gelap dan menegangkan."},
  {n:"Call of Duty Modern Warfare 2", k:"Tembak", img:"mw2", d:"Call of Duty Modern Warfare 2 bersama Task Force 141, salah satu seri CoD paling populer."},
  {n:"Sniper Elite 3", k:"Tembak", img:"Sniper 3", d:"Jadi penembak jitu di Afrika Utara Perang Dunia II dengan kamera peluru X-ray."},
  {n:"Sniper Ghost Warrior 2", k:"Tembak", img:"sgw2", d:"Misi sniper di berbagai medan, harus hitung angin dan jarak untuk tembakan tepat."},
  {n:"Spec Ops: The Line", k:"Tembak", img:"the-line", d:"Misi penyelamatan di Dubai yang tertimbun badai pasir, dengan cerita gelap tentang perang."},
  {n:"Time Crisis 4", k:"Tembak", img:"time-crisis-4", d:"Game tembak ala arcade, bisa pakai stik tembak (GunCon) atau stik biasa."},

  {n:"Need for Speed Hot Pursuit", k:"Balap", img:"nfs-hp", d:"Kejar-kejaran polisi vs pembalap dengan mobil super. Bisa pilih jadi polisi atau buronan."},
  {n:"Need for Speed The Run", k:"Balap", img:"nfs-the-run", d:"Balapan lintas Amerika dari San Francisco ke New York sambil dikejar polisi dan mafia."},
  {n:"Need for Speed Most Wanted", k:"Balap", img:"most-wanted", d:"Balap liar di kota Fairhaven, kumpulkan mobil dan jadi pembalap paling dicari polisi."},
  {n:"MotoGP 23-24", k:"Balap", img:"Moto GP 23-24", d:"Balap motor GP dengan pembalap dan tim musim terbaru (versi mod)."},
  {n:"MotorStorm 2", k:"Balap", img:"Motor Storm 2", d:"Balap off-road di pulau tropis dengan motor, buggy, dan truk. Ukuran sekitar 12,4 GB."},
  {n:"ModNation Racers", k:"Balap", img:"modnation", d:"Balap gokart lucu, bisa bikin karakter, mobil, dan lintasan sendiri."},
  {n:"MX KLX", k:"Balap", img:"MX KLX", d:"Game balap motor trail/motocross. Tanya detail versinya langsung di lokasi."},
  {n:"Twisted Metal", k:"Balap", img:"twisted-metal", d:"Pertarungan mobil bersenjata di arena. Hancurkan lawan dengan roket dan senjata lainnya."},

  {n:"NBA 2K17", k:"Olahraga", img:"NBA", d:"Game basket dengan tim NBA, mode karier MyCareer, dan gameplay realistis."},
  {n:"Skate 3", k:"Olahraga", img:"skate-3", d:"Main skateboard dengan kontrol trik yang realistis di kota Port Carverton."},

  {n:"Mortal Kombat 9", k:"Fighting", img:"mortal-kombat", d:"Game fighting dengan jurus Fatality khas. Banyak karakter dan mode cerita."},
  {n:"Marvel vs Capcom 3", k:"Fighting", img:"Marvel 3", d:"Pahlawan Marvel melawan karakter Capcom dalam pertarungan tim 3 lawan 3."},
  {n:"Street Fighter X Tekken", k:"Fighting", img:"sfxt", d:"Karakter Street Fighter dan Tekken bertarung bersama dalam satu game, sistem tag tim."},
  {n:"Ultra Street Fighter IV", k:"Fighting", img:"Ultra Street", d:"Versi lengkap Street Fighter IV dengan banyak karakter dan keseimbangan terbaru."},
  {n:"Tekken 6", k:"Fighting", img:"tekken", d:"Game fighting 3D klasik dengan kombo dan karakter ikonik."},

  {n:"Naruto Shippuden: Ultimate Ninja Storm 3", k:"Anime", img:"naruto-storm-3", d:"Naruto Ultimate Ninja Storm 3, bertarung dengan jurus ninja dan cerita Perang Ninja Keempat."},
  {n:"Naruto Storm Revolution Mod", k:"Anime", img:"naruto-revolution", d:"Naruto Storm Revolution versi mod dengan karakter tambahan."},
  {n:"One Piece: Pirate Warriors", k:"Anime", img:"one-piece", d:"Luffy dan kru Topi Jerami melawan banyak musuh sekaligus, mengikuti cerita anime."},
  {n:"Kamen Rider", k:"Anime", img:"kamen-rider", d:"Game aksi Kamen Rider dengan banyak Rider yang bisa dimainkan."},

  {n:"LEGO Batman 2 DC Super Heroes", k:"Keluarga", img:"lego-batman-2", d:"Batman, Superman, dan pahlawan DC versi LEGO. Lucu dan bisa main berdua. Ukuran sekitar 5 GB."},
  {n:"LEGO Batman 3", k:"Keluarga", img:"lego-batman-3", d:"Petualangan LEGO Batman sampai ke luar angkasa bersama banyak karakter DC."},
  {n:"LEGO Marvel Super Heroes", k:"Keluarga", img:"lego-marvel", d:"Iron Man, Spider-Man, Hulk, dan lainnya versi LEGO di kota New York."},
  {n:"LEGO Star Wars III The Clone Wars", k:"Keluarga", img:"lego-star-wars-3", d:"Perang Klon Star Wars versi LEGO dengan pertarungan lightsaber dan pasukan."},
  {n:"Marvel Super Hero Squad", k:"Keluarga", img:"Marvel SuperHero", d:"Pahlawan Marvel versi kartun yang lucu, cocok untuk anak-anak."},
  {n:"Kung Fu Panda", k:"Keluarga", img:"Kungfu Panda", d:"Main jadi Po si panda yang belajar kungfu, aksi ringan untuk semua umur."},
  {n:"Toy Story 3", k:"Keluarga", img:"toy-story-3", d:"Woody, Buzz, dan teman-teman mainan dalam petualangan seru dan mode Toy Box."},
  {n:"Minecraft PS3 Edition", k:"Keluarga", img:"minecraft", d:"Bangun dan jelajahi dunia kotak-kotak. Ukuran ringan sekitar 1 GB."},
  {n:"Bomberman", k:"Keluarga", img:"Bomberman", d:"Taruh bom untuk mengalahkan lawan. Seru dimainkan ramai-ramai."},
  {n:"Monopoly Streets", k:"Keluarga", img:"monopoly", d:"Main Monopoli versi 3D, beli properti dan bangun kota bareng teman."},
  {n:"Guitar Hero", k:"Keluarga", img:"Guitar Hero", d:"Game musik, tekan tombol mengikuti lagu. Bisa pakai stik gitar."},
];
