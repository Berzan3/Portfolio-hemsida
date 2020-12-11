import React from 'react';

const rootContainerElement = document.getElementById('root');

function removeBanner() {
  if(rootContainerElement.classList.length > 0) {
    rootContainerElement.classList.remove('Home');
  }

}

function Cv() {
  return (
    <div className="CV" onLoad={removeBanner()}>
      <title>CV</title>
      <a href={require("../img/Resumé.pdf")}><img src={require("../img/Resumé-picture.png")} alt="cv-bild" width="645px" height="861px" /></a>
    </div>
  );
}

export default Cv;