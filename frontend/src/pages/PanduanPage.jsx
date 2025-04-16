import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Check from '../assets/svg/check-round.svg';
import Cross from '../assets/svg/x-round.svg';
import GuestLayout from '../layouts/GuestLayout';
import { organicGuides, anorganicGuides } from '../data/guides'; // Move guides data to separate file

const TabButton = ({ isActive, onClick, children }) => (
    <button
        onClick={onClick}
        className={`
      flex-1 h-full rounded-[9px] font-medium transition-colors
      ${isActive ? 'bg-[#68A36F] text-white' : 'bg-white text-[#585858]'}
    `}
    >
        {children}
    </button>
);

const GuideSection = ({ title, icon, children }) => (
    <div className='w-full max-w-7xl flex flex-col justify-start items-start gap-6'>
        <div className='w-full flex justify-start items-center gap-2 outline-1 outline-[#ececec] rounded-[5px] bg-white p-2'>
            <img src={icon} alt="" />
            <p className='capitalize text-[16px] font-semibold'>{title}</p>
        </div>
        {children}
    </div>
);

const PanduanPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState('organik');

    useEffect(() => {
        const sampahType = searchParams.get('sampah');
        if (sampahType === 'organik' || sampahType === 'anorganik') {
            setActiveTab(sampahType);
        }
    }, [searchParams]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchParams({ sampah: tab });
    };

    const currentGuides = activeTab === 'organik' ? organicGuides : anorganicGuides;

    return (
        <GuestLayout>
            <div className="min-h-screen flex flex-col items-center w-full gap-8 p-6 pt-[250px]">
                <div className="h-[65px] w-full max-w-7xl p-[1px] flex rounded-[10px] border border-[#EBEBEB] bg-white">
                    <TabButton
                        isActive={activeTab === 'organik'}
                        onClick={() => handleTabChange('organik')}
                    >
                        Sampah Organik
                    </TabButton>
                    <TabButton
                        isActive={activeTab === 'anorganik'}
                        onClick={() => handleTabChange('anorganik')}
                    >
                        Sampah Anorganik
                    </TabButton>
                </div>

                <GuideSection title="Yang Bisa Kamu Lakukan" icon={Check}>
                    <div className="flex flex-col justify-start items-start max-md:gap-2 gap-4 w-full max-w-7xl">
                        {currentGuides.do.map((guide, index) => (
                            <div
                                key={guide.id}
                                className="flex flex-col justify-start items-start w-full"
                            >
                                <p className="max-md:text-[16px] text-[24px] font-semibold flex">
                                    <span className="min-w-[18px]">{index + 1}.</span> {guide.title}
                                </p>
                                <p className="max-md:text-[12px] text-[16px] font-medium">
                                    {guide.desc}
                                </p>
                                {guide.points && (
                                    <div className="flex flex-col justify-start items-start w-full">
                                        {guide.points.map((point, idx) => (
                                            <p
                                                key={idx}
                                                className="max-md:text-[12px] text-[16px] w-full"
                                            >
                                                <span className="font-bold">{point.title}</span> &rarr;{" "}
                                                <span className="font-medium">{point.desc}</span>
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </GuideSection>

                <GuideSection title="Yang Harus Dihindari" icon={Cross}>
                    <div className="flex flex-col justify-start items-start max-md:gap-2 gap-4 w-full max-w-7xl">
                        {Array.isArray(currentGuides.dont) ? (
                            currentGuides.dont.map((guide, index) => (
                                <p
                                    key={index}
                                    className="max-md:text-[12px] text-[16px] font-medium flex"
                                >
                                    <span className="min-w-[18px]">{index + 1}.</span> {guide}
                                </p>
                            ))
                        ) : (
                            <p className="max-md:text-[12px] text-[16px] font-medium">
                                {currentGuides.dont}
                            </p>
                        )}
                    </div>
                </GuideSection>
            </div>
        </GuestLayout>
    );
};

export default PanduanPage;