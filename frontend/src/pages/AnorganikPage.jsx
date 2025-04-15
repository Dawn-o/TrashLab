import React from "react";
import { useNavigate } from "react-router-dom";
import AnorganicVector from "../assets/svg/anorganic-vector.svg";
import Home from "../assets/svg/home.svg";
import Check from "../assets/svg/check-round.svg";
import Cross from "../assets/svg/x-round.svg";
import BreadCrumb from "../components/BreadCrumb";
import MainLayout from "../layouts/MainLayout";

const AnorganikPage = () => {
  const navigate = useNavigate();

  const guides = {
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
  return (
    <MainLayout>
      <div className="h-[calc(100vh - 200px)] flex flex-col justify-start items-center bg-yellow py-10 max-md:gap-4 gap-8">
        <img src={AnorganicVector} alt="" />
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
                submenu={
                  <span className="text-green font-bold">Anorganik</span>
                }
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
                        <p className="max-md:text-[16px] text-[24px] font-semibold flex">
                          <p className="min-w-[18px]">{index + 1}.</p>{" "}
                          {guide.title}
                        </p>
                        <p className="max-md:text-[12px] text-[16px] font-medium">{guide.desc}</p>
                        {guide.points && guide.points.length > 0 && (
                          <div className="flex flex-col justify-start items-start w-full">
                            {guide.points.map((point, index) => (
                              <p key={index} className="max-md:text-[12px] text-[16px] w-full ">
                                <span className="font-bold">{point.title}</span>{" "}
                                &rarr;{" "}
                                <span className="font-medium">
                                  {point.desc}
                                </span>
                              </p>
                            ))}
                          </div>
                        )}
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
                <div className="flex flex-col justify-start items-start w-full max-w-7xl">
                  {guides.dont.map((guide, index) => {
                    return (
                      <p key={index} className="max-md:text-[12px] text-[16px] font-medium flex">
                        <p className="min-w-[18px]">{index + 1}.</p> {guide}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AnorganikPage;
