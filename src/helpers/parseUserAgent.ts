import DeviceDetector from "node-device-detector";

export const parseUserAgent = (userAgent: string) => {
  const detector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    osIndexes: true,
    deviceAliasCode: false,
    deviceTrusted: false,
    deviceInfo: false,
    maxUserAgentSize: 500,
  });
  // const userAgent = 'Mozilla/5.0 (Linux; Android 5.0; NX505J Build/KVT49L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.78 Mobile Safari/537.36';
  const result = detector.detect(userAgent);
  console.log('result parse', result);
  console.log("agent ", userAgent)
  const deviceType = "unknown"
  const os = "unknown"
  const browser = "unknown"
  return { deviceType, os, browser };
};
