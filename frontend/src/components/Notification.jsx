import React from 'react';
import { useEffect, useState } from 'react';
import successIcon from '../assets/svg/success-notif.svg';
import dangerIcon from '../assets/svg/danger-notif.svg';

const Notification = ({ notif }) => {
    const [show, setShow] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    const notifs = [
        {
            id: 1,
            slug: "success-sign-in",
            type: "success",
            title: "Sign in berhasil",
            message: "Anda telah berhasil Sign in!",
        },
        {
            id: 2,
            slug: "warning-sign-in",
            type: "warning",
            title: "Peringatan",
            message: "Mohon lakukan sign in ter lebih dahulu!",
        },
        {
            id: 3,
            slug: "success-sign-out",
            type: "success",
            title: "Signed out berhasil",
            message: "Anda telah signed out!",
        },
        {
            id: 4,
            slug: "success-sign-up",
            type: "success",
            title: "Sign up berhasil",
            message: "Anda telah berhasil Sign up!",
        },
        {
            id: 5,
            slug: "failed-sign-in",
            type: "failed",
            title: "Sign in Gagal",
            message: "Password atau email salah!",
        },
        {
            id: 6,
            slug: "failed-sign-up",
            type: "failed",
            title: "Sign up Gagal",
            message: "Gagal mencoba sign up!!",
        },
        {
            id: 7,
            slug: "failed-server",
            type: "failed",
            title: "Server Error",
            message: "Server mati apa gimana nih?",
        },
        {
            id: 8,
            slug: "failed-sign-out",
            type: "failed",
            title: "Signed out gagal",
            message: "Coba sign out lain kali!",
        },
    ]

    const selectedNotif = notifs.find(n => n.slug === notif);

    const closeNotif = () => {
        setIsVisible(false);
        setTimeout(() => setShow(false), 500); // tunggu animasi fade-out
    }

    useEffect(() => {
        if (!selectedNotif) return;
    
        setShow(true);
    
        // Delay 250ms sebelum muncul (biar smooth)
        const appearTimer = setTimeout(() => {
            setIsVisible(true);
        }, 250);
    
        // Timer untuk hilangin notif
        const disappearTimer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => setShow(false), 500); // tunggu animasi fade-out
        }, 5000 + 250); // tambahin 250ms supaya total tampil tetep 5 detik
    
        // Cleanup kalau notif berubah atau komponen unmount
        return () => {
            clearTimeout(appearTimer);
            clearTimeout(disappearTimer);
        };
    }, [notif]);

    if (!selectedNotif || !show) return null;

    const icon = selectedNotif.type === "success" ? successIcon : dangerIcon;
    const bgColor = selectedNotif.type === "success" ? "bg-secondary border-primary" : "bg-red-600 border-red-800";
    const transitionClass = isVisible
    ? "translate-x-0 opacity-100"
    : "translate-x-full opacity-0";

    return (
        <div id='notifBox' className={`flex flex-col-reverse gap-2 fixed bottom-4 right-4 z-50 transition-all duration-500 ease-in-out ${transitionClass}`}>
            <div id='notification' onClick={closeNotif} className={`flex w-[360px] max-md:w-[290px] px-4 justify-start items-center border-l-4 py-2 ${bgColor} rounded shadow-md cursor-pointer`}>
                <img src={icon} alt="icon" />
                <div className="flex flex-col gap-1 ml-4">
                    <p className="text-white text-[17px] font-medium">{selectedNotif.title}</p>
                    <p className="text-white text-[15px] font-normal">{selectedNotif.message}</p>
                </div>
            </div>
        </div>
    );
}

export default Notification;
