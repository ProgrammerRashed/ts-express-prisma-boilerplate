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
  const result = detector.detect(userAgent);
  const deviceType = result?.device.type === "smartphone" ? "mobile" : result?.device.type || "unknown"
  const os = result?.os.name || result?.os?.family || "unknown"
  const browser = result?.client.name || result?.client?.family || "unknown"
  return { deviceType, os, browser };
};
