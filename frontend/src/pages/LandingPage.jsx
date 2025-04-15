import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import GuestLayout from "../layouts/GuestLayout.jsx";

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
  const location = useLocation();

  useEffect(() => {
    // Check for scroll target in navigation state
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        // Add small delay to ensure DOM is ready
        setTimeout(() => {
          const headerHeight = 130;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [location]);

  return (
    <GuestLayout>
      <div className="">
        <div className="bg-[#DAE9D8] h-screen flex justify-center items-center px-4">
          <div className="flex flex-col  md:flex-row items-center gap-10 text-left">
            <div className="">
              <p className="text-3xl text-primary font-semibold">
                Identifikasi Sampah <br /> Dalam Sekejap
              </p>
              <br />
              <p className="text-lg font-medium leading-tight">
                Cukup unggah foto, dan biarkan
                <span className="text-primary max-md:text-16px] font-bold"> TrashLab</span> <br />
                membantumu memisahkan sampah dengan benar
              </p>
              <button className="text-white bg-primary px-8 py-4 rounded-[10px] mb-4 w-52 mt-5 max-md:text-[12px]">
                <a href="/pindai">Coba sekarang!</a>
              </button>
            </div>

            <div className="max-md:hidden">
              <img src={LandingPageIcon} className="" alt="Landing Icon" />
            </div>
          </div>
        </div>

        <div
          id="about"
          className="bg-white w-full h-screen px-6 flex items-center justify-center"
        >
          <div className="flex max-w-7xl flex-col md:flex-row gap-10 ">
            <div className="max-w-xl">
              <h2 className="text-3xl max-md:text-[24px] font-bold text-primary mb-2">
                Tentang TrashLab
              </h2>
              <p className="text-black text-xl max-md:text-[16px]">
                TrashLab adalah platform berbasis AI yang membantu kamu
                mengenali jenis sampah,
                <span className="text-primary font-medium"> organik </span>
                atau
                <span className="text-primary font-medium"> anorganik</span>
                —secara cepat dan akurat. Didesain untuk edukasi, kebiasaan
                ramah lingkungan, dan mendukung sistem pengelolaan sampah
                berkelanjutan.
              </p>
            </div>

            <div className="md:space-y-4 mt-4 max-md:grid max-md:grid-cols-2 max-md:gap-4">
              {["Cepat dan Mudah", "Berbasis AI", "Edukatif", "Gratis"].map(
                (item, idx) => (
                  <div className="flex items-center gap-2" key={idx}>
                    <img
                      src={Check}
                      alt="Check"
                      className="w-[40px] max-md:w-[20px] h-[40px] max-md:h-[20px]"
                    />
                    <p className="text-black text-xl max-md:text-[16px] font-medium">{item}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="bg-white min-h-screen w-full flex flex-col px-6  items-center mx-auto pb-6">
          <div className="w-full">
            <p className="text-3xl w-full max-md:text-[24px] max-md:text-start font-semibold text-primary mb-2">Fitur Utama</p>
          </div>
          <div className="grid max-w-7xl items-center justify-center grid-cols-4 max-md:grid-cols-2 max-xl:grid-cols-3 gap-6 px-4 py-2 w-full">
            {cardData.map((item, index) => (
              <div
                key={index}
                className="bg-[#DAE9D8] text-black w-full max-w-[340px] p-7 py-14 rounded-[10px] gap-4 max-md:gap-2 shrink-0 flex flex-col items-center h-full"
              >
                <img className="w-[100px] max-md:w-[50px] h-[100px] max-md:h-[50px]" src={item.icon} alt="Icon" />
                <div className="">
                  <div className=" min-h-[72px] max-md:min-h-[48px] flex items-center">
                    <p className="font-semibold text-xl max-md:text-[12px] text-center w-full items-center">
                      {item.title}
                    </p>
                  </div>
                </div>
                <p className="text-md text-center max-md:text-[10px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="pb-32 bg-white flex justify-center items-center gap-10 px-6 flex-col sm:flex-row">
          <div className="bg-[#DAE9D8] w-full max-w-[600px] p-7 py-14 rounded-[10px] flex flex-col items-start">
            <div className="mb-5 flex items-center w-full">
              <p className="font-semibold text-primary text-2xl max-md:text-[24px] text-start w-full">
                Coba Gratis Sebagai Tamu
              </p>
            </div>
            <p className="text-lg text-left max-md:text-[16px] mb-4 text-black font-medium leading-tight">
              Belum punya akun? Gak masalah. Kamu bisa uji coba pindai sampah 1x
              sebagai tamu!
            </p>
            <button className="text-white bg-primary px-8 py-4 max-md:text-[12px] rounded-[10px] mb-4 w-full">
              <a href="/pindai">Coba sekarang!</a>
            </button>
            <p className="text-lg text-left text-black font-medium leading-tight max-md:text-center max-md:text-[12px]">
              Setelah 1x percobaan, kamu perlu login/daftar untuk melanjutkan
              penggunaan.
            </p>
          </div>

          <div className="space-y-6 px-4 sm:px-6 md:px-8 w-full max-w-[600px]">
            <h2 className="text-2xl max-md:text-[24px] font-semibold text-[#4CAF50] text-left">
              Kenapa Harus TrashLab?
            </h2>
            <div className="space-y-4">
              {[
                { icon: Magnifyer, text: "Akurat dan cepat" },
                { icon: Leaf, text: "Dukung gerakan zero waste" },
                {
                  icon: Hat,
                  text: "Cocok untuk edukasi di sekolah & komunitas",
                },
                {
                  icon: Plus,
                  text: "Bisa diintegrasi ke sistem pengelolaan sampah lokal",
                },
              ].map((item, idx) => (
                <div
                  className="flex items-center gap-3 sm:gap-4 md:gap-6  flex-row"
                  key={idx}
                >
                  <img
                    src={item.icon}
                    alt="Icon"
                    className="w-10 h-10 sm:w-10 sm:h-10 md:w-[30px] md:h-[30px]"
                  />
                  <p className=" leading-tight text-black text-lg  font-normal text-center sm:text-left">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}

export default LandingPage;
