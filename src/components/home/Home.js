import "./Home.css";
import Link from "next/link";
import Image from "next/image";
import { icons } from "../../data/data";
import { images } from "../../data/data";

function Home() {
  return (
    <section className="home container">
      <div className="homeTitle">
        <h1>E-Conference</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
          cum similique perspiciatis eum architecto corrupti eius quas molestias
          perferendis? Enim repudiandae saepe maxime, iste sunt quidem
          laudantium dolore recusandae beatae.
        </p>
        <Link href="#" className="detailBtn">
          Learn more
        </Link>
      </div>

      <Image
        className="penAndPaper"
        src={images.paperPen}
        alt="Paper And Pen Image"
      />

      <div className="socialNetworks">
        <a href="#">
          <Image src={icons.telegram} alt="Telegram Icon" />
        </a>
        <a href="#">
          <Image src={icons.twitter} alt="Twitter Icon" />
        </a>
        <a href="#">
          <Image src={icons.instagram} alt="Instagram Icon" />
        </a>
        <a href="#">
          <Image src={icons.facebook} alt="Facebook Icon" />
        </a>
      </div>
    </section>
  );
}

export default Home;
