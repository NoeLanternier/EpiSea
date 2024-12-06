'use client'
import {React, useEffect, useState} from "react";
import './infos.css';

export default function Home() {
  const [start, setStart] = useState(0)
  function buttonAlert(url) {
    open(url)
  }
    return (
      <div className="gradient_background">
        <div style={container}>
          <button className="button" onClick={() => buttonAlert("https://www.cy-clope.com/pollution-plastique-impact-oceans/")}>Pollution plastique: débris qui flottent</button>
          <button className="button" onClick={() => buttonAlert("https://ocean.org/fr/blog/in-too-deep-the-downside-of-deep-sea-fisheries/")}>Pêche industrielle en eaux profondes</button>
          <button className="button" onClick={() => buttonAlert("https://oceanfdn.org/fr/deep-seabed-mining/")}>Exploitation minière en haute mer</button>
          <button className="button" onClick={() => buttonAlert("https://www.ifaw.org/fr/journal/explications-pollution-sonore-ocean#:~:text=La%20pollution%20sonore%20sous%2Dmarine,d%C3%A9c%C3%A8s%20chez%20de%20nombreux%20animaux.")}>Pollution sonore en zone abyssale</button>
          <button className="button" onClick={() => buttonAlert("https://www.ledevoir.com/environnement/491635/des-traces-de-pollution-chimique-au-fond-des-abysses")}>Contamination chimique en zones océaniques</button>
          <button className="button" onClick={() => buttonAlert("https://www.lepelerin.com/ecologie/lactualite-environnement/exploitation-miniere-des-fonds-marins-les-abysses-menaces-7789")}>Exploitation minière fonds marins</button>
        </div>
      </div>
  );
}

const container = {
  display: "flex",
  flexDirection: "column",
  minHeight: "1%",
  justifyContent: "space-around",
  height: "1000vh",
}