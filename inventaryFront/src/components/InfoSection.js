import React from 'react';
import '../App.css';

function InfoSection ({ title, subtitle, description, showSubtitle = true, showDescription = true }) {
  return (
    <div class="conteiner__section">
        <h1 class="conteiner__section-title">{title}</h1>

        {/* Condicional para mostrar el subtítulo */}
        {showSubtitle && <h2 class="conteiner__section-subtitle">{subtitle}</h2>}


        {/* Condicional para mostrar la descripción */}
        {showDescription && (
            <p class="conteiner__section-description">{description}</p>)}
    </div>
  );
}

export default InfoSection;
