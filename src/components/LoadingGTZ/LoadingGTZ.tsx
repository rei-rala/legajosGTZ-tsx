import React, { useContext } from "react";
import { Legajos } from "../../contexts/LegajosContext";
import Logo from "./isotipo.png";

import "./loadingGTZ.scss";

const LoadingGTZ: React.FC = () => {
  const { LegajosFB } = useContext(Legajos);

  return LegajosFB ? (
    <></>
  ) : (
    <section className="loadContainer">
      <img className="box three" src={Logo} alt="GTZ" />
      <img className="box two" src={Logo} alt="GTZ" />
      <img className="box one" src={Logo} alt="GTZ" />
      <img className="box two" src={Logo} alt="GTZ" />
      <img className="box three" src={Logo} alt="GTZ" />
      {/* <img className='loadingImg' src="https://firebasestorage.googleapis.com/v0/b/legajos-gtz.appspot.com/o/isotipo.png?alt=media&token=97625fb0-bc1c-420b-98cb-9deab0713e31" alt="GTZ" /> */}
    </section>
  );
};

export default LoadingGTZ;
