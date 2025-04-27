import GuestHeader from '../components/GuestHeader';
import Footer from '../components/Footer';

const GuestLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <GuestHeader />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default GuestLayout;