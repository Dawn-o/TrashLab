import React from "react";
import { useNavigate } from "react-router-dom";
import OrganicVector from "../assets/svg/organic-vector.svg";
import Home from "../assets/svg/home.svg";
import Check from "../assets/svg/check-round.svg";
import Cross from "../assets/svg/x-round.svg";
import BreadCrumb from "../components/BreadCrumb";
import MainLayout from "../layouts/MainLayout";

const OrganikPage = () => {
  const navigate = useNavigate();

  const guides = {
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

  return (
    <MainLayout>
      <div className="h-[calc(100vh - 200px)] flex flex-col justify-start items-center bg-secondary py-10 max-md:gap-4 gap-8">
        <img src={OrganicVector} alt="" />
        <div className="relative w-full flex flex-col justify-start items-center">
          <div className="absolute top-0 left-0 bg-[#f8f8f8] min-h-[40vw] max-lg:min-h-[90vh] rounded-t-[50px] w-full">
            <div className="flex flex-col justify-start items-center gap-8 py-10 px-8">
              <BreadCrumb
                menu={
                  <>
                    <img
                      src={Home}
                      onClick={() => navigate('/dashboard')}
                      alt=""
                      className="cursor-pointer"
                    />
                    <p
                      onClick={() => navigate('/dashboard')}
                      className="flex cursor-pointer justify-start items-center gap-2"
                    >
                      Beranda
                    </p>
                  </>
                }
                submenu={<span className="text-green font-bold">Organik</span>}
              />
              <div className="flex flex-col justify-start items-start gap-6 w-full max-w-7xl">
                <div className="flex w-full max-w-7xl justify-start items-center gap-2 outline-1 outline-[#ececec] rounded-[5px] bg-white p-2">
                  <img src={Check} alt="" />
                  <p className="capitalize max-md:text-[16px] text-[24px] font-semibold">
                    Yang Bisa Kamu Lakukan
                  </p>
                </div>
                <div className="flex flex-col justify-start items-start max-md:gap-2 gap-4 w-full max-w-7xl">
                  {guides.do.map((guide, index) => {
                    return (
                      <div
                        key={guide.id}
                        className="flex flex-col justify-start items-start w-full"
                      >
                        <p className="max-md:text-[16px] text-[24px] font-semibold">
                          {index + 1}. {guide.title}
                        </p>
                        <p className="max-md:text-[12px] text-[16px] font-medium">{guide.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-6 w-full max-w-7xl">
                <div className="flex w-full max-w-7xl justify-start items-center gap-2 outline-1 outline-[#ececec] rounded-[5px] bg-white p-2">
                  <img src={Cross} alt="" />
                  <p className="capitalize max-md:text-[16px] text-[24px] font-semibold">
                    Yang harus dihindari
                  </p>
                </div>
                <div className="flex flex-col justify-start items-start max-md:gap-2 gap-4 w-full max-w-7xl">
                  <p className="max-md:text-[12px] text-[16px] font-medium">{guides.dont}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrganikPage;
