const getGeoLocation = async (ip: string) => {
  const demoIp = `103.60.6.70`
  try {
    const res = await fetch(`http://ip-api.com/json/${demoIp}`);
    const data = await res.json();

    return {
      country: data?.country || null,
      region: data?.regionName || null,
      city: data?.city || null,
      latitude: data?.lat || null,
      longitude: data?.lon || null,
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