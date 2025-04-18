import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export const metadata = {
  title: "E-Conference",
};

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
