const loadGoogleMapsScript = (apiKey: string) => {
  const existingScript = document.getElementById('googleMaps');

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.id = 'googleMaps';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log('Google Maps script carregado com sucesso!');
    };
  }
};

export default loadGoogleMapsScript;
