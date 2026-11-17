const modules = [
  {
    id: "requirements", title: "Requirements", icon: "my_location", context: "Analisis kebutuhan",
    summary: "Kenali batas sistem, siapa yang terlibat, dan apa yang memicu respons sistem.",
    questions: [
      ["actor", "Apa itu actor?", "Use Case Diagram",
        "Actor adalah <strong>peran di luar batas sistem yang berinteraksi dengannya</strong>. Satu orang dapat menjalankan beberapa peran.",
        "Rina menjalankan peran <strong>Pelanggan</strong> saat checkout. Gambar Pelanggan di luar kotak sistem. Actor juga bisa muncul di sequence diagram."],
      ["use-case", "Apa itu use case?", "Use Case Diagram",
        "Use case menggambarkan perilaku sistem yang menghasilkan sesuatu yang bernilai bagi actor atau stakeholder.",
        "<strong>Checkout Pesanan</strong> adalah use case. Menekan tombol Bayar adalah salah satu langkah di dalamnya."],
      ["requirements", "User, actor, dan system requirement", "Analisis kebutuhan",
        "<strong>User requirement</strong> menyatakan kebutuhan dalam bahasa pengguna. <strong>Actor requirement</strong>, jika dipakai di rubrik, biasanya mengaitkan kebutuhan dengan peran tertentu. <strong>System requirement</strong> merinci apa yang harus dilakukan atau dipenuhi sistem.",
        "Pelanggan perlu melihat ongkir. Sistem harus menghitung ongkir sebelum meminta pembayaran (fungsional) dan menampilkan total dalam waktu yang ditentukan (nonfungsional)."],
      ["event", "Apa itu event decomposition?", "Identifikasi use case",
        "Mulai dari <strong>pemicu</strong>, lalu beri nama respons sistem sebagai use case. <strong>External</strong> datang dari luar, <strong>temporal</strong> karena waktu tiba, dan <strong>state</strong> karena kondisi internal berubah.",
        "Pelanggan menekan Checkout → Proses Checkout. Pukul 00.00 tiba → Buat Rekap Harian. Stok turun di bawah ambang → Tandai Restok. Yang berhubungan dengan waktu disebut <strong>temporal event</strong>."],
      ["user-goal", "Apa itu user goal technique?", "Identifikasi use case",
        "Mulai dari <strong>tujuan tiap tipe pengguna</strong>. Wawancarai mereka dan ubah tujuannya menjadi nama use case, biasanya dengan kata kerja.",
        "“Saya ingin melacak paket saya” → <strong>Lacak Pesanan</strong>."],
      ["stakeholder", "Apa bedanya actor dan stakeholder?", "Batas sistem",
        "<strong>Actor</strong> berinteraksi langsung dengan sistem. <strong>Stakeholder</strong> punya kepentingan atau terkena dampak. Satu pihak bisa memiliki keduanya.",
        "Pemilik toko berkepentingan dengan penjualan. Saat ia membuka dashboard, ia juga bertindak sebagai actor."],
      ["external-system", "Apa itu external system?", "Batas sistem",
        "External system adalah sistem di luar batas yang sedang kamu modelkan. Ia dapat berperan sebagai actor ketika bertukar data dengan sistemmu.",
        "<strong>Payment Gateway</strong> menerima permintaan tagihan dan mengirim status pembayaran."],
      ["perfect-technology", "Apa itu perfect technology assumption?", "Analisis kebutuhan",
        "Bayangkan teknologi bekerja ideal untuk menemukan kebutuhan bisnis yang tetap harus dipenuhi. Detail kontrol teknis ditangani pada tahap desain.",
        "Rekap penjualan tetap dibutuhkan. Backup untuk pemulihan kerusakan dirancang sebagai kontrol teknis."]
    ]
  },
  {
    id: "activity", title: "Use Case & Activity", icon: "schema", context: "Deskripsi dan alur proses",
    summary: "Tulis satu skenario, lalu gambar siapa yang menjalankan tiap langkah.",
    questions: [
      ["description", "Apa itu use case description?", "Dokumen teks",
        "Dokumen untuk satu use case. Biasanya berisi actor, trigger, precondition, main flow, alur alternatif atau exception, dan postcondition.",
        "Pemicu: pelanggan menekan Checkout. Precondition: keranjang terisi. Alur sukses: cek stok → bayar → simpan pesanan."],
      ["exception", "Exception vs postcondition", "Use case description",
        "<strong>Exception flow</strong> menjelaskan kejadian yang mengganggu jalur normal dan cara menanganinya. <strong>Postcondition</strong> mencatat keadaan setelah suatu alur berakhir.",
        "Exception: pembayaran ditolak, lalu sistem menawarkan percobaan ulang. Failure postcondition: keranjang masih tersedia dan pesanan belum berstatus Paid."],
      ["related", "Apa itu related use case?", "Deskripsi dan Use Case Diagram",
        "Kolom <em>Related Use Cases</em> mencatat use case yang berkaitan. Hubungan formal UML punya arti dan arah spesifik.",
        "<strong>«include»</strong>: Checkout → Hitung Total (perilaku yang dipakai). <strong>«extend»</strong>: Terapkan Kupon → Checkout (tambahan bersyarat). <strong>Generalization</strong>: Bayar dengan Kartu → Lakukan Pembayaran (versi khusus)."],
      ["swimlane", "Apa itu swimlane dan kenapa dipakai?", "Activity Diagram · Activity partition",
        "Swimlane adalah baris atau kolom yang mengelompokkan aksi menurut penanggung jawab. Di UML, istilah resminya <strong>activity partition</strong>. Notasi proses seperti BPMN juga memakai lane.",
        "Aksi Konfirmasi Keranjang masuk lane Pelanggan. Cek Stok masuk lane Sistem. Panah yang menyeberang lane memperjelas perpindahan tanggung jawab."],
      ["synchronization", "Apa saja synchronization bar?", "Activity Diagram · Alur paralel",
        "<strong>Fork</strong> membagi satu alur menjadi beberapa cabang paralel. <strong>Join</strong> menyatukan cabang paralel dan biasanya menunggu semuanya selesai. Keduanya memakai balok tebal.",
        "Fork pekerjaan menjadi Buat Invoice dan Buat Label. Join sebelum paket diproses. Untuk pilihan salah satu jalur seperti stok cukup atau habis, gunakan decision dan merge berbentuk berlian."],
      ["main-flow", "Main flow vs activity diagram", "Use case description dan Activity Diagram",
        "<strong>Main flow</strong> adalah urutan langkah jalur sukses. <strong>Activity diagram</strong> adalah gambar alur yang bisa memuat jalur sukses, pilihan, error, pengulangan, dan aksi paralel.",
        "“Cek stok → bayar” bisa muncul sebagai langkah teks. Di activity diagram, keputusan “Stok cukup?” juga bisa mengarah ke pesan gagal."],
      ["foreach", "Bisa for each barang di activity diagram?", "Activity Diagram · Loop",
        "Bisa. Tambahkan decision <strong>Masih ada barang?</strong>, cek barang berikutnya, lalu tarik panah balik. Untuk koleksi, UML juga punya <em>expansion region</em>.",
        "Simulator mengecek Kaos dan Topi secara berurutan. Coba skenario Stok habis untuk melihat cabang keluar dari loop."]
    ]
  },
  {
    id: "sequence", title: "Sequence Diagram", icon: "linear_scale", context: "Interaksi antar-peserta",
    summary: "Baca pesan dari atas ke bawah. Lifeline menunjukkan peserta yang mengirim atau menerima pesan.",
    questions: [
      ["first-item", "Arti [FirstItem] aCrt := createCart()", "Design Sequence Diagram",
        "<code>[FirstItem]</code> adalah <strong>guard</strong>. Kalau kondisi benar, jalankan <code>createCart()</code> dan simpan referensi keranjang yang dikembalikan di <code>aCrt</code>.",
        "Barang pertama membuat keranjang lalu ditambahkan. Untuk barang kedua, pakai keranjang yang sudah ada. Pada <code>aCrt:OnlineCart</code>, <code>aCrt</code> adalah nama objek."],
      ["star", "Apa arti tanda * di sequence diagram?", "System Sequence Diagram · Notasi Satzinger",
        "Pada <code>*[kondisi] pesan()</code>, <strong>*</strong> menandai pengulangan selama kondisi benar. Gunakan frame <code>loop</code> jika beberapa pesan diulang bersama.",
        "<code>*[masih ada barang] cekBarang()</code>. Di class diagram, <code>*</code> pada ujung asosiasi berarti multiplicity banyak."],
      ["fragments", "Fragment itu apa dan ada apa saja?", "Sequence Diagram · Combined fragment",
        "<code>alt</code> memilih cabang, <code>opt</code> menjalankan blok opsional, <code>loop</code> mengulang, dan <code>par</code> menjalankan cabang paralel.",
        "Operator lain: <code>break</code> keluar dari sisa fragmen pembungkus, <code>critical</code> mencegah penyelaan, <code>seq</code>/<code>strict</code> mengatur urutan, <code>assert</code>/<code>neg</code> menyatakan urutan wajib/tidak valid, dan <code>ignore</code>/<code>consider</code> menyaring pesan. <code>ref</code> merujuk ke interaksi lain."],
      ["ssd", "SSD vs design sequence diagram", "Sequence Diagram · Tingkat detail",
        "<strong>SSD</strong> menampilkan actor dan sistem sebagai satu peserta utuh. <strong>Design sequence diagram</strong> memperlihatkan kerja internal peserta seperti view, controller, dan objek domain.",
        "SSD: Pelanggan → Sistem. Desain: CheckoutView → CheckoutController → Cart. Actor juga dapat muncul di diagram desain untuk memperjelas pemicu."],
      ["lifeline-x", "Kapan taruh X di bawah lifeline?", "Sequence Diagram · Destruction",
        "<strong>X</strong> menandai titik ketika instance peserta dihancurkan. Untuk objek hidup yang keluar dari cakupan gambar, lifeline cukup berhenti digambar.",
        "Jika keranjang masih dapat dipakai setelah skenario berakhir, akhiri gambarnya tanpa simbol destruction. Cocokkan konvensi gambar dengan rubrik tugas."],
      ["perfect-solution", "Apa itu perfect solution assumption?", "First-cut sequence diagram",
        "Rancang jalur sukses terlebih dahulu dengan mengasumsikan exception belum terjadi. Tambahkan penanganan exception ketika desain dirinci.",
        "Gambar pembayaran berhasil, lalu tambahkan cabang pembayaran ditolak. Perfect technology dipakai saat memilih kebutuhan bisnis. Perfect solution dipakai saat menggambar interaksi awal."]
    ]
  },
  {
    id: "class", title: "Class Diagram & OOP", icon: "account_tree", context: "Struktur dan desain objek",
    summary: "Petakan objek yang menyimpan data, menjalankan aturan bisnis, dan bekerja sama.",
    questions: [
      ["oop", "Apa itu OOP dan empat pilarnya?", "Desain berorientasi objek",
        "OOP menyusun program sebagai objek yang memiliki data dan perilaku. <strong>Encapsulation</strong> menjaga aturan internal, <strong>abstraction</strong> menampilkan kontrak yang diperlukan, <strong>inheritance</strong> mewariskan karakteristik, dan <strong>polymorphism</strong> memakai kontrak sama dengan perilaku berbeda.",
        "Cart mengatur daftar barang melalui addItem(). Checkout memanggil charge() yang dapat dijalankan oleh implementasi kartu atau e-wallet."],
      ["generalization", "Generalization vs specialization", "Class Diagram · Hubungan is-a",
        "<strong>Generalization</strong> mencari tipe umum dari beberapa tipe khusus. <strong>Specialization</strong> menurunkan tipe khusus dari tipe umum. Keduanya melihat hierarki yang sama dari arah berbeda.",
        "CardPayment adalah jenis Payment. Segitiga kosong mengarah ke Payment. Relasi ini juga bisa dipakai untuk actor dan use case."],
      ["first-cut", "Domain class diagram vs first-cut class diagram", "Analisis dan rancangan awal",
        "<strong>Domain class diagram</strong> memodelkan konsep bisnis, atribut, hubungan, dan multiplicity. <strong>First-cut design class diagram</strong> memilih kelas software dan mulai menambah tipe atribut, navigasi, serta kelas pengendali bila perlu.",
        "Analisis: Cart punya 0..* CartItem. Desain awal: CheckoutController dapat mengakses Cart. Detail method diperbarui setelah merancang sequence diagram."],
      ["navigation", "Apa itu navigation visibility?", "Design Class Diagram",
        "Kemampuan objek memperoleh akses ke objek lain agar bisa mengirim pesan. <strong>Attribute</strong>: referensi disimpan sebagai atribut. <strong>Parameter</strong>: referensi diterima lewat parameter method.",
        "CheckoutService menyimpan PaymentGateway → navigasi atribut. <code>checkout(cart)</code> menerima referensi Cart → navigasi parameter. Simbol + dan - mengatur akses public/private pada anggota kelas."],
      ["responsibilities", "Apa itu separation of responsibilities?", "Desain berlapis",
        "Bagilah pekerjaan sesuai peran: <strong>view</strong> menerima input, <strong>controller</strong> mengoordinasikan alur, <strong>domain</strong> menjaga aturan bisnis, dan <strong>data access</strong> membaca atau menyimpan data.",
        "CheckoutView menerima klik. CheckoutController memulai checkout. Order mengatur perubahan status. Data access menyimpan pesanan."],
      ["controller", "Apakah setiap entity wajib punya controller?", "Desain aplikasi",
        "Tidak. Tentukan controller berdasarkan alur atau operasi yang diekspos sistem. Satu controller bisa melibatkan beberapa entity.",
        "CheckoutController mengoordinasikan Cart dan Order. CartItem dikelola oleh Cart."],
      ["variations", "Apa itu protection from variations?", "Design Class Diagram",
        "Beri bagian yang kemungkinan berubah sebuah batas atau kontrak. Di class diagram, tunjukkan pihak yang bergantung pada interface dan kelas yang mengimplementasikannya.",
        "CheckoutService bergantung pada PaymentGateway. ProviderAdapter menangani bentuk request dan response vendor. Perubahan format vendor dapat ditangani di adapter."]
    ]
  },
  {
    id: "patterns", title: "Design Patterns", icon: "category", context: "Pola desain perangkat lunak",
    summary: "Mulai dari masalah yang perlu diselesaikan, lalu pilih pola yang cocok.",
    questions: [
      ["satzinger", "Design pattern apa saja yang dibahas Satzinger?", "Object-oriented design · Use case realization",
        "<strong>Use Case Controller</strong> mengoordinasikan use case. <strong>DAO</strong> menangani akses data. <strong>Adapter</strong> menerjemahkan interface. <strong>Factory</strong> menempatkan logika pembuatan objek. <strong>Singleton</strong> menyediakan satu instance. <strong>Observer</strong> memberi kabar ke subscriber saat terjadi perubahan.",
        "CheckoutController mengatur alur, OrderDAO menyimpan pesanan, dan PaymentAdapter menerjemahkan API provider."],
      ["gof-create", "GoF · 5 creational patterns", "Katalog Gang of Four · Pembuatan objek",
        "<strong>Abstract Factory</strong> membuat satu keluarga objek. <strong>Builder</strong> merakit objek bertahap. <strong>Factory Method</strong> memberi subclass keputusan tentang objek yang dibuat. <strong>Prototype</strong> menyalin objek. <strong>Singleton</strong> mengatur satu instance.",
        "OrderBuilder dapat mengisi data pengiriman, item, dan total secara bertahap sebelum menghasilkan Order."],
      ["gof-structure", "GoF · 7 structural patterns", "Katalog Gang of Four · Susunan objek",
        "<strong>Adapter</strong> menerjemahkan interface. <strong>Bridge</strong> memisahkan abstraksi dan implementasi. <strong>Composite</strong> menyusun objek dalam pohon. <strong>Decorator</strong> menambah perilaku lewat pembungkus. <strong>Facade</strong> menyederhanakan akses. <strong>Flyweight</strong> berbagi data umum. <strong>Proxy</strong> mengontrol akses lewat perantara.",
        "PaymentFacade dapat menawarkan satu operasi bayar() untuk beberapa langkah internal."],
      ["gof-behavior", "GoF · 11 behavioral patterns", "Katalog Gang of Four · Interaksi objek",
        "<strong>Chain of Responsibility</strong> meneruskan permintaan antar-handler. <strong>Command</strong> membungkus tindakan sebagai objek. <strong>Interpreter</strong> menafsirkan bahasa sederhana. <strong>Iterator</strong> menelusuri koleksi. <strong>Mediator</strong> mengatur komunikasi. <strong>Memento</strong> menyimpan keadaan. <strong>Observer</strong> memberi notifikasi. <strong>State</strong> menyesuaikan perilaku dengan keadaan. <strong>Strategy</strong> menukar algoritme. <strong>Template Method</strong> menetapkan kerangka langkah. <strong>Visitor</strong> menambahkan operasi untuk tipe elemen berbeda.",
        "Strategy dapat memilih perhitungan ongkir standar atau ekspres."]
    ]
  },
  {
    id: "code", title: "React, Rust & SeaORM", icon: "code", context: "Implementasi aplikasi",
    summary: "Hubungkan UI, tipe data Rust, dan skema database.",
    questions: [
      ["component", "Apa itu React component?", "React · Frontend",
        "Component adalah bagian UI yang bisa dirangkai. Biasanya berupa fungsi yang mengembalikan JSX. <strong>Props</strong> adalah input dari parent. <strong>State</strong> adalah data yang diingat React untuk component.",
        "<code>&lt;CartItem name=\"Kaos\" quantity={2} /&gt;</code> menampilkan satu baris keranjang."],
      ["effect", "Apa itu useEffect?", "React · Sinkronisasi",
        "Hook untuk menyinkronkan component dengan sistem di luar React, seperti subscription atau browser API. Daftar dependency mengendalikan kapan sinkronisasi diulang. Fungsi cleanup membereskan subscription sebelumnya.",
        "Berlangganan status pesanan dengan dependency <code>[orderId]</code>. Proses klik tombol bayar masuk ke event handler."],
      ["rust-module", "Bagaimana Rust mengelola modul?", "Rust · Struktur crate",
        "<code>mod checkout;</code> mendeklarasikan modul. <code>pub</code> mengatur apa yang diekspos. <code>use</code> membawa nama ke scope. <code>crate::</code> mulai dari root; <code>super::</code> dari modul induk.",
        "<code>mod checkout;</code> dapat memuat <code>src/checkout.rs</code>. <code>use crate::checkout::submit_order;</code> mempersingkat pemanggilan."],
      ["enum", "Apa itu enum?", "Rust · Tipe data",
        "Enum adalah tipe yang nilainya merupakan salah satu dari pilihan <strong>variant</strong>. Variant di Rust dapat menyimpan data, dan <code>match</code> dapat memeriksa semua kasus.",
        "<code>PaymentStatus</code> bisa berupa <code>Pending</code>, <code>Paid</code>, atau <code>Failed { reason: String }</code>."],
      ["serde", "Serialize vs deserialize", "API · Pertukaran data",
        "<strong>Serialize</strong> mengubah nilai program ke format pertukaran seperti JSON. <strong>Deserialize</strong> membaca format itu kembali ke tipe program.",
        "Struct pesanan → <code>{\"order_id\":42}</code> dengan <code>serde_json::to_string</code>. Arah sebaliknya memakai <code>serde_json::from_str</code>."],
      ["no-migration", "Bagaimana setup SeaORM tanpa migration?", "SeaORM · Skema database",
        "Buat database dan tabel dengan SQL, atur <code>DATABASE_URL</code>, lalu koneksikan aplikasi dengan <code>Database::connect(...)</code>. Jika entity sudah dibuat, <code>Schema::create_table_from_entity(...)</code> membangun DDL yang bisa dijalankan lewat koneksi.",
        "SQL → tabel → generate entity. Alternatif entity-first di SeaORM 2.x memakai schema registry dengan fitur schema-sync."],
      ["generate", "Bagaimana generate entity dengan sea-orm-cli?", "SeaORM CLI · Tabel menjadi kode Rust",
        "Atur <code>DATABASE_URL</code> di environment atau .env, lalu jalankan <code>sea-orm-cli generate entity -o src/entity</code>. CLI membaca tabel yang sudah ada.",
        "<code>--compact-format</code> dan <code>--expanded-format</code> mengatur format. <code>--with-serde both</code> menambah derive. Daftarkan hasilnya dengan <code>mod entity;</code>."],
      ["active-model", "Apa itu ActiveModel?", "SeaORM · Insert dan update",
        "<strong>Entity</strong> mewakili tabel untuk query. <strong>Model</strong> adalah data satu baris. <strong>ActiveModel</strong> membungkus nilai untuk penulisan: <code>Set</code> menetapkan nilai, <code>Unchanged</code> mempertahankan nilai hasil baca, dan <code>NotSet</code> membiarkan field tidak dikirim.",
        "Untuk membayar pesanan, ubah field status dalam ActiveModel menjadi <code>Set(Paid)</code>. <code>Set(None)</code> secara eksplisit menulis NULL untuk kolom nullable."],
      ["soft-delete", "Apa itu soft delete?", "Database · Penghapusan logis",
        "Soft delete mengisi penanda seperti <code>deleted_at</code>. Baris tetap tersimpan sehingga bisa dipulihkan jika aturan bisnis mengizinkan.",
        "Query data aktif memakai <code>WHERE deleted_at IS NULL</code>, termasuk pencarian berdasarkan ID. Hard delete menghapus baris lewat DELETE."]
    ]
  },
  {
    id: "operations", title: "Kode & Infrastruktur", icon: "dns", context: "Praktik pengembangan",
    summary: "Jaga kode mudah diubah, lindungi konfigurasi, dan kenali cara aplikasi dijalankan.",
    questions: [
      ["clean", "Apa saja clean code practices?", "Praktik coding",
        "Pakai nama yang menyatakan maksud, buat fungsi fokus pada satu tanggung jawab, letakkan aturan yang sama di satu tempat, dan tangani kegagalan secara jelas. Gunakan komentar untuk alasan yang sulit dibaca dari kode.",
        "<code>calculate_cart_total()</code>, <code>reserve_stock()</code>, dan <code>send_invoice()</code> memisahkan pekerjaan yang punya alasan perubahan berbeda."],
      ["env", "Kenapa .env jangan di-push?", "Git · Konfigurasi dan secrets",
        ".env sering berisi password database dan API key. Abaikan dengan .gitignore dan commit .env.example berisi nilai contoh.",
        "Kalau .env sudah dilacak, <code>git rm --cached -- .env</code> mempertahankan file lokal. Jika kredensial sudah ter-push, rotasi karena nilainya mungkin masih ada di riwayat."],
      ["salt", "Apa itu salt?", "Autentikasi · Password storage",
        "Salt adalah nilai acak unik yang dicampurkan saat membuat hash password. Salt bisa disimpan bersama hash.",
        "Dua akun yang memilih password sama menghasilkan hash yang berbeda karena salt mereka berbeda."],
      ["bcrypt", "Apa itu bcrypt?", "Autentikasi · Password hashing",
        "bcrypt adalah algoritme hashing password dengan faktor biaya. Saat login, library memverifikasi input terhadap hash yang tersimpan.",
        "Simpan hash hasil bcrypt ketika pengguna mendaftar. Untuk sistem baru, OWASP mengutamakan Argon2id."],
      ["containers", "Apa itu containerization?", "Deployment · Docker",
        "Containerization mengemas aplikasi dan dependensi runtime sebagai <strong>image</strong>. <strong>Container</strong> adalah instance yang berjalan dari image.",
        "API Rust dan PostgreSQL dapat berjalan dalam container terpisah. Pakai volume untuk data PostgreSQL yang harus bertahan saat containernya diganti."],
      ["broker", "Apa itu message broker?", "Arsitektur · Pertukaran pesan",
        "Broker menerima pesan dari <strong>producer</strong> dan merutekannya ke tujuan, misalnya queue yang dibaca <strong>consumer</strong>.",
        "Checkout mengirim OrderPaid ke RabbitMQ. Worker mengambil pesan dari queue dan mengirim invoice di luar proses checkout."],
      ["diagram-tips", "Checklist gambar UML untuk tugas", "Use Case Diagram dan Sequence Diagram",
        "Letakkan actor di luar batas use case diagram. Atur posisi untuk mengurangi garis bersilang. Pada design sequence diagram, beri nama lifeline sesuai peserta, misalnya <code>aCart:Cart</code>.",
        "Cocokkan X pada lifeline dan pilihan library dengan rubrik atau konvensi yang diminta dosen. Gunakan X untuk destruction pada notasi UML."]
    ]
  }
];

const quizQuestions = [
  { topic: "actor", prompt: "Payment gateway bertukar pesan dengan aplikasi checkout. Ia berperan sebagai apa?", choices: ["Domain entity", "Actor eksternal", "Postcondition"], correct: 1, explanation: "Actor dapat berupa sistem lain yang berinteraksi dari luar batas aplikasi." },
  { topic: "event", prompt: "Pukul 00.00 sistem membuat rekap harian. Apa jenis event-nya?", choices: ["Temporal event", "External event", "State event"], correct: 0, explanation: "Waktu yang dijadwalkan menjadi pemicu respons sistem." },
  { topic: "requirements", prompt: "Manakah contoh requirement nonfungsional?", choices: ["Pelanggan menerima invoice", "Sistem mencatat pesanan", "95% perhitungan total selesai dalam dua detik"], correct: 2, explanation: "Batas waktu menyatakan kualitas kinerja yang harus dipenuhi." },
  { topic: "exception", prompt: "Manakah postcondition setelah pembayaran ditolak?", choices: ["Sistem menerima penolakan gateway", "Keranjang tetap tersedia", "Pelanggan menekan Bayar"], correct: 1, explanation: "Keranjang tetap tersedia adalah keadaan setelah alur gagal berakhir." },
  { topic: "swimlane", prompt: "Bagaimana activity diagram menunjukkan siapa yang bertanggung jawab?", choices: ["Swimlane", "Lifeline", "Generalization"], correct: 0, explanation: "Swimlane mengelompokkan aksi berdasarkan siapa atau bagian mana yang melakukan pekerjaan." },
  { topic: "synchronization", prompt: "Invoice dan label pengiriman harus selesai sebelum proses diteruskan. Pakai apa?", choices: ["Merge", "Join", "Fork"], correct: 1, explanation: "Join menyatukan dan menyinkronkan cabang paralel sebelum alur lanjut." },
  { topic: "first-item", prompt: "Apa efek [FirstItem] ketika barang kedua ditambahkan?", choices: ["createCart() berjalan dua kali", "Keranjang lama dihancurkan", "createCart() dilewati"], correct: 2, explanation: "Guard bernilai salah untuk barang kedua. Barang itu masuk ke keranjang yang sudah dibuat." },
  { topic: "fragments", prompt: "Sekelompok pesan harus diulang untuk tiap item. Fragment mana yang cocok?", choices: ["loop", "par", "opt"], correct: 0, explanation: "loop membungkus sekelompok pesan yang berulang." },
  { topic: "navigation", prompt: "CheckoutService menyimpan PaymentGateway di field. Jenis navigasinya?", choices: ["Navigation parameter", "Navigation atribut", "Visibility public"], correct: 1, explanation: "Referensinya disimpan sebagai atribut objek dan tersedia lewat atribut itu." },
  { topic: "generalization", prompt: "Ke mana segitiga kosong mengarah untuk CardPayment dan Payment?", choices: ["CardPayment", "Cart", "Payment"], correct: 2, explanation: "Panah generalization mengarah dari tipe khusus ke tipe umum." },
  { topic: "variations", prompt: "Vendor mengganti format respons pembayaran. Bagian mana yang menerjemahkan format itu?", choices: ["ProviderAdapter", "CartItem", "CheckoutView"], correct: 0, explanation: "Adapter menangani translasi dari API provider ke kontrak aplikasi." },
  { topic: "active-model", prompt: "Bagaimana menyatakan nilai NULL secara eksplisit di ActiveModel?", choices: ["NotSet", "Set(None)", "Unchanged"], correct: 1, explanation: "Set(None) mengirim NULL untuk kolom nullable. NotSet membiarkan field tanpa nilai yang dikirim." }
];

const scenarios = {
  normal: {
    steps: [
      ["Pelanggan", "Konfirmasi keranjang", 0, 1, "checkout()", "Pelanggan memulai use case. Ini trigger checkout."],
      ["Sistem", "Cek stok Kaos", 1, 1, "checkStock(kaos)", "Iterasi pertama dari loop pengecekan barang."],
      ["Sistem", "Cek stok Topi", 1, 1, "checkStock(topi)", "Iterasi kedua. Semua barang yang diperiksa tersedia."],
      ["Payment gateway", "Proses pembayaran", 1, 2, "charge(total)", "Sistem mengirim permintaan ke actor pendukung di luar batasnya."],
      ["Sistem", "Terima status berhasil", 2, 1, "paid", "Gateway mengembalikan hasil pembayaran.", true],
      ["Sistem", "Catat pesanan", 1, 1, "saveOrder()", "Success postcondition: pesanan tercatat sebagai Paid."]
    ]
  },
  stock: {
    steps: [
      ["Pelanggan", "Konfirmasi keranjang", 0, 1, "checkout()", "Pelanggan memulai use case. Ini trigger checkout."],
      ["Sistem", "Cek stok Kaos", 1, 1, "checkStock(kaos)", "Barang pertama tersedia. Loop lanjut ke barang berikutnya."],
      ["Sistem", "Temukan Topi habis", 1, 1, "checkStock(topi)", "Guard [stok habis] memilih cabang exception dan menghentikan loop."],
      ["Pelanggan", "Lihat masalah stok", 1, 0, "showOutOfStock()", "Failure postcondition: keranjang tersedia untuk diperbaiki. Sistem belum meminta pembayaran."]
    ]
  },
  declined: {
    steps: [
      ["Pelanggan", "Konfirmasi keranjang", 0, 1, "checkout()", "Pelanggan memulai use case. Ini trigger checkout."],
      ["Sistem", "Cek stok Kaos", 1, 1, "checkStock(kaos)", "Iterasi pertama dari loop pengecekan barang."],
      ["Sistem", "Cek stok Topi", 1, 1, "checkStock(topi)", "Iterasi kedua. Semua barang yang diperiksa tersedia."],
      ["Payment gateway", "Proses pembayaran", 1, 2, "charge(total)", "Sistem mengirim permintaan pembayaran."],
      ["Sistem", "Terima penolakan", 2, 1, "declined", "Cabang gagal dipilih ketika gateway mengembalikan status ditolak.", true],
      ["Pelanggan", "Lihat opsi coba lagi", 1, 0, "showPaymentError()", "Failure postcondition: keranjang masih tersedia dan tidak ada pesanan Paid."]
    ]
  },
  cart: {
    participants: ["Pelanggan", "Controller", "Keranjang"],
    createdParticipant: 2,
    steps: [
      ["Pelanggan", "Pilih Kaos", 0, 1, "addItem(kaos)", "Pelanggan menambahkan barang pertama sehingga guard [FirstItem] bernilai benar."],
      ["Controller", "Buat keranjang", 1, 2, "[FirstItem] aCrt := createCart()", "Keranjang dibuat. Controller menyimpan referensi ke objek baru pada aCrt."],
      ["Keranjang", "Masukkan Kaos", 1, 2, "addItem(kaos)", "Controller menggunakan aCrt untuk mengakses keranjang yang baru dibuat."],
      ["Pelanggan", "Pilih Topi", 0, 1, "addItem(topi)", "Guard [FirstItem] sekarang bernilai salah. Langkah membuat keranjang dilewati."],
      ["Keranjang", "Masukkan Topi", 1, 2, "addItem(topi)", "Topi masuk ke keranjang yang sama dengan Kaos."]
    ]
  }
};
