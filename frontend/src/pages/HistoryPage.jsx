import React from "react";
import MainLayout from "../layouts/MainLayout";

const dummyData = [
  {
    id: 1,
    date: "28 Maret 2025, 10:01:21",
    category: "Anorganik",
    image:
      "https://images.unsplash.com/photo-1581579185169-dde7bcdc3db5?auto=format&fit=crop&w=80&q=80",
    labelColor: "bg-yellow-400",
    section: "Hari ini",
  },
  {
    id: 2,
    date: "12 Februari 2025, 07:22:32",
    category: "Organik",
    image:
      "https://images.unsplash.com/photo-1603561593577-9dc5833d72a9?auto=format&fit=crop&w=80&q=80",
    labelColor: "bg-primary",
    section: "Februari",
  },
  {
    id: 3,
    date: "12 Februari 2025, 07:22:32",
    category: "Organik",
    image:
      "https://images.unsplash.com/photo-1611162617213-edd666a63b8b?auto=format&fit=crop&w=80&q=80",
    labelColor: "bg-primary",
    section: "Februari",
  },
];

const HistorySection = ({ title, items }) => (
  <div className="mb-8">
    <h2 className="text-gray-500 font-semibold text-base mb-4">{title}</h2>
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-4">
          <img
            src={item.image}
            alt="Scan result"
            className="w-14 h-14 rounded-xl object-cover"
          />
          <div className="flex-1">
            <p className="text-sm text-gray-800">{item.date}</p>
          </div>
          <span
            className={`text-white text-xs px-3 py-1 rounded-full font-medium ${item.labelColor}`}
          >
            {item.category}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const HistoryPage = () => {
  const grouped = dummyData.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Riwayat Pindai</h1>
        {Object.entries(grouped).map(([section, items]) => (
          <HistorySection key={section} title={section} items={items} />
        ))}
      </div>
    </MainLayout>
  );
};

export default HistoryPage;
