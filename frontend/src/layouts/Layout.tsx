import Footer from "../components/Footer";
import Header from "../components/Header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="section-container flex-1 py-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
