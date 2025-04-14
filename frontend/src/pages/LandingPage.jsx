import LandingPageIcon from "../assets/svg/landing-page.svg";
import Check from "../assets/svg/check-round.svg";
import Brain from "../assets/svg/brain.svg";
import Book from "../assets/svg/book.svg";
import Exchange from "../assets/svg/exchange.svg";
import Trophy from "../assets/svg/trophy.svg";
import Magnifyer from "../assets/svg/magnifyer.svg";
import Leaf from "../assets/svg/leaf.svg";
import Hat from "../assets/svg/hat.svg";
import Plus from "../assets/svg/plus-round.svg";

const cardData = [
  {
    title: "TrashCam dan TrashDrop",
    desc: "Unggah foto atau ambil langsung lewat kamera untuk identifikasi sampah. Sistem kami akan mengenali apakah itu sampah organik atau anorganik secara otomatis.",
    icon: Brain,
  },
  {
    title: "TrashGuide",
    desc: "Panduan lengkap pengelolaan sampah organik & anorganik. Mulai dari cara bikin kompos sampai tips daur ulang dan upcycle barang bekas.",
    icon: Book,
  },
  {
    title: "Tukarkan Poin Menjadi Badge",
    desc: "Setiap aktivitas akan memberimu poin. Kumpulkan dan tukarkan dengan badge spesial sebagai bentuk kontribusimu untuk lingkungan!.",
    icon: Exchange,
  },
  {
    title: "TrashRank",
    desc: "Lihat peringkatmu di antara pengguna lainnya. Semakin aktif kamu, makin tinggi posisi kamu di leaderboard!",
    icon: Trophy,
  },
];

function LandingPage() {
  return (
    <div className="">
      <div className="bg-[#DAE9D8] h-screen flex justify-center items-center">
        <div className="flex flex-col  md:flex-row items-center gap-10 text-center md:text-left">
          <div className="mr-20">
            <p className="text-3xl text-primary font-semibold">
              Identifikasi Sampah <br /> Dalam Sekejap
            </p>
            <br />
            <p className="text-lg font-medium leading-tight">
              Cukup unggah foto, dan biarkan
              <span className="text-primary font-bold"> TrashLab</span> <br />
              membantumu memisahkan sampah dengan benar
            </p>
            <button className="text-white bg-primary px-5 py-3 rounded-[10px] mb-4 w-52 mt-5">
              Coba Sekarang!
            </button>
          </div>

          <div className="hidden md:block">
            <img src={LandingPageIcon} className="" alt="Landing Icon" />
          </div>
        </div>
      </div>

      <div className="bg-white h-screen flex items-center justify-center">
        <div className="flex flex-col md:flex-row gap-10 max-w-4xl">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Tentang TrashLab
            </h2>
            <p className="text-black text-xl">
              TrashLab adalah platform berbasis AI yang membantu kamu mengenali
              jenis sampah,
              <span className="text-primary font-medium"> organik </span>
              atau
              <span className="text-primary font-medium"> anorganik</span>
              —secara cepat dan akurat. Didesain untuk edukasi, kebiasaan ramah
              lingkungan, dan mendukung sistem pengelolaan sampah berkelanjutan.
            </p>
          </div>

          <div className="space-y-4 mt-4">
            {["Cepat dan Mudah", "Berbasis AI", "Edukatif", "Gratis"].map(
              (item, idx) => (
                <div className="flex items-center gap-2" key={idx}>
                  <img src={Check} alt="Check" className="w-[40px] h-[40px]" />
                  <p className="text-black text-xl">{item}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="bg-white h-screen flex flex-col items-center mx-auto">
        <div>
          <p className="text-3xl font-bold text-primary mb-2">Fitur Utama</p>
        </div>
        <div className="flex gap-6 overflow-x-auto p-4 w-full justify-center">
          {cardData.map((item, index) => (
            <div
              key={index}
              className="bg-[#DAE9D8] text-black w-64 p-7 py-14 rounded-[10px] shrink-0 flex flex-col items-start h-full"
            >
              <img className="mx-auto mb-4" src={item.icon} alt="Icon" />
              <div className="mb-5">
                <div className="mb-5 min-h-[72px] flex items-center">
                  <p className="font-semibold text-xl text-center w-full items-center">
                    {item.title}
                  </p>
                </div>
              </div>
              <p className="text-md text-left">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pb-32 bg-white flex justify-center items-center gap-10 px-4 flex-col sm:flex-row">
        <div className="bg-[#DAE9D8] w-full max-w-[600px] p-7 py-14 rounded-[10px] flex flex-col items-start">
          <div className="mb-5 flex items-center w-full">
            <p className="font-semibold text-primary text-2xl text-start w-full">
              Coba Gratis Sebagai Tamu
            </p>
          </div>
          <p className="text-lg text-left mb-4 text-black font-medium leading-tight">
            Belum punya akun? Gak masalah. Kamu bisa uji coba pindai sampah 1x
            sebagai tamu!
          </p>
          <button className="text-white bg-primary px-8 py-4 rounded-[10px] mb-4 w-full">
            Coba Sekarang
          </button>
          <p className="text-lg text-left text-black font-medium leading-tight">
            Setelah 1x percobaan, kamu perlu login/daftar untuk melanjutkan
            penggunaan.
          </p>
        </div>

        <div className="space-y-6 px-4 sm:px-6 md:px-8 w-full max-w-[600px]">
          <h2 className="text-2xl font-bold text-[#4CAF50] text-center sm:text-left">
            Kenapa Harus TrashLab?
          </h2>
          <div className="space-y-4">
            {[
              { icon: Magnifyer, text: "Akurat dan cepat" },
              { icon: Leaf, text: "Dukung gerakan zero waste" },
              { icon: Hat, text: "Cocok untuk edukasi di sekolah & komunitas" },
              {
                icon: Plus,
                text: "Bisa diintegrasi ke sistem pengelolaan sampah lokal",
              },
            ].map((item, idx) => (
              <div
                className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-col sm:flex-row"
                key={idx}
              >
                <img
                  src={item.icon}
                  alt="Icon"
                  className="w-10 h-10 sm:w-10 sm:h-10 md:w-16 md:h-16"
                />
                <p className=" leading-tight text-black text-lg font-normal text-center sm:text-left">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
