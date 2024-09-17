export const generateMarkerIcon = (color: string = "#3388ff") => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
        <path d="M12.5,0 C19.4,0 25,5.6 25,12.5 C25,19.4 20.1,26.5 12.5,41 C4.9,26.5 0,19.4 0,12.5 C0,5.6 5.6,0 12.5,0 Z" fill="${color}"/>
        <path d="M12.5,0 C19.4,0 25,5.6 25,12.5 C25,19.4 20.1,26.5 12.5,41 C4.9,26.5 0,19.4 0,12.5 C0,5.6 5.6,0 12.5,0 Z" fill-opacity="0.4" transform="translate(2,3)" />
        <circle cx="12.5" cy="12.5" r="5" fill="white"/>
      </svg>
    `;
  
    // Converte o SVG em base64 para usar como URL
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };