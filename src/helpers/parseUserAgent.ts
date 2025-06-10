export const parseUserAgent = (userAgent: string) => {
    const ua = userAgent.toLowerCase();
  
    let deviceType = 'desktop';
    if (/mobile|android|iphone|ipad/i.test(ua)) {
      deviceType = 'mobile';
    } else if (/tablet|ipad/i.test(ua)) {
      deviceType = 'tablet';
    }
  
    let os = 'unknown';
    if (/windows/i.test(ua)) os = 'Windows';
    else if (/macintosh|mac os x/i.test(ua)) os = 'MacOS';
    else if (/linux/i.test(ua)) os = 'Linux';
    else if (/android/i.test(ua)) os = 'Android';
    else if (/iphone|ipad|ios/i.test(ua)) os = 'iOS';
  
    let browser = 'unknown';
    if (/firefox/i.test(ua)) browser = 'Firefox';
    else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
    else if (/safari/i.test(ua)) browser = 'Safari';
    else if (/edge/i.test(ua)) browser = 'Edge';
    else if (/opera|opios/i.test(ua)) browser = 'Opera';
  
    return { deviceType, os, browser };
  };