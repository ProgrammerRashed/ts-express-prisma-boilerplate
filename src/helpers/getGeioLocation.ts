const getGeoLocation = async (ip: string) => {
  const demoIp = '37.111.244.254'
    try {
      const res = await fetch(`http://ip-api.com/json/${demoIp}`);
      const data = await res.json();
  
      return {
        country: data.country_name,
        region: data.region,
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
      };
    } catch (error) {
      
      return {
        country: null,
        region: null,
        city: null,
        latitude: null,
        longitude: null,
      };
    }
  };
  
  export default getGeoLocation;
  
  