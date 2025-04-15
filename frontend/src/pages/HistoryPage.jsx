import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import axios from "../api/AxiosInstance";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const HistorySection = ({ title, items }) => (
  <div className="mb-8">
    <h2 className="text-gray-500 font-semibold text-base mb-4">{title}</h2>
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.image_url} className="flex items-center space-x-4">
          <img
            src={`https://trashlab.rushel.my.id${item.image_url}`}
            alt="Scan result"
            className="w-14 h-14 rounded-xl object-cover"
          />
          <div className="flex-1">
            <p className="text-sm text-gray-800">
              {format(new Date(item.date), "dd MMMM yyyy, HH:mm:ss", {
                locale: id,
              })}
            </p>
          </div>
          <span
            className={`text-white text-xs px-3 py-1 rounded-full font-medium ${
              item.type.includes("Organik") ? "bg-primary" : "bg-yellow-400"
            }`}
          >
            {item.type.replace("Sampah ", "")}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/profile/history?page=${currentPage}`);
        
        // Group items by date
        const items = response.data.predictions.reduce((acc, item) => {
          const date = new Date(item.date);
          const today = new Date();
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);

          let section;
          if (date.toDateString() === today.toDateString()) {
            section = "Hari ini";
          } else if (date.toDateString() === yesterday.toDateString()) {
            section = "Kemarin";
          } else {
            section = format(date, "MMMM yyyy", { locale: id });
          }

          if (!acc[section]) acc[section] = [];
          acc[section].push(item);
          return acc;
        }, {});

        setHistory(items);
        setTotalPages(response.data.pagination.total_pages);
      } catch (err) {
        setError("Gagal memuat riwayat");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [currentPage]);

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Riwayat Pindai</h1>
        
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Memuat...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            {Object.entries(history).map(([section, items]) => (
              <HistorySection key={section} title={section} items={items} />
            ))}

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default HistoryPage;
