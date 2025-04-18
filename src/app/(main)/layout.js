import "./global.css";
import Header from "../../components/header/Header";

export const metadata = {
  title: "E-Conference",
  icons: {
    icon: "./logo.png",
  },
};

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
