export const organicGuides = {
    do: [
        {
            id: 1,
            title: "Buat kompos",
            desc: "Ubah sampah organik menjadi untuk tanaman. Gunakan sisa makanan, daun kering, dan kulit buah. Campur dengan tanah, lalu biarkan membusuk secara alami dalam wadah terbuka",
        },
        {
            id: 2,
            title: "Pakan Ternak",
            desc: "Beberapa sisa makanan seperti nasi, sayuran, dan roti basi bisa dijadikan pakan untuk ayam atau ikan.",
        },
        {
            id: 3,
            title: "Eco Enzyme",
            desc: "Fermentasi kulit buah menjadi cairan serbaguna yang bisa digunakan sebagai pupuk cair atau pembersih alami rumah tangga",
        },
        {
            id: 4,
            title: "Biogas",
            desc: "Dalam skala besar, sampah organik bisa difermentasi untuk menghasilkan gas (biogas) sebagai sumber energi alternatif",
        },
    ],
    dont: "Membuang sisa makanan yang masih bisa dimanfaatkan.",
};

export const anorganicGuides = {
    do: [
        {
            id: 1,
            title: "Daur ulang",
            desc: "Pisahkan sampah anorganik berdasarkan jenisnya:",
            points: [
                {
                    title: "Plastik",
                    desc: "Dijual ke pengepul atau disetorkan ke bank ",
                },
                {
                    title: "Kaca",
                    desc: "Dapat digunakan ulang atau didaur ulang.",
                },
                {
                    title: "Kertas",
                    desc: "Diolah kembali menjadi kertas baru atau pengrajin.",
                },
                {
                    title: "Logam",
                    desc: "Kaleng bekas bisa dikreasikan atau dijual.",
                },
            ],
        },
        {
            id: 2,
            title: "Upcycling (Kreasi Ulang)",
            desc: "Ubah barang bekas jadi sesuatu yang berguna dan menarik:",
            points: [
                {
                    title: "Botol plastik",
                    desc: "Dijadikan pot tanaman atau wadah serbaguna",
                },
                {
                    title: "Koran bekas",
                    desc: "bahan untuk kerajinan tangan",
                },
                {
                    title: "Ban bekas",
                    desc: "Bisa diubah jadi kursi, ayunan, atau dekorasi taman.",
                },
            ],
        },
        {
            id: 3,
            title: "Drop ke Tempat Pengolahan",
            desc: "Setorkan ke komunitas atau perusahaan pengelola daur ulang, termasuk untuk e-waste (sampah elektronik)",
        },
    ],
    dont: [
        "Membuang sampah anorganik sembarangan karena sulit terurai.",
        "Membakar sampah plastik karena dapat menghasilkan zat beracun",
    ],
};