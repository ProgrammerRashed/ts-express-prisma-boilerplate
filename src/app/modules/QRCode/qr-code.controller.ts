import CatchAsync from "@utils/CatchAsync";
import SendResponse from "@utils/SendResponse";
import { StatusCodes } from "http-status-codes";
import { QRCodeService } from "./qr-code.service";
import getGeoLocation from "@helpers/getGeioLocation";

const createQrCode = CatchAsync(async (req, res) => {
  const result = await QRCodeService.createQRCode(req);
  SendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "QR Code Created Successfully!",
    data: result,
  });
});

const updateQrCode = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await QRCodeService.updateQRCode(id, data);
  SendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "QR Code Updated Successfully!",
    data: result,
  });
});

const trackScan = CatchAsync(async (req, res) => {
  const { qrId, fingerprint } = req.body;
  const userAgent = req.headers['user-agent'] || 'unknown';
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown';

  const location = await getGeoLocation(ip); 

  const { scan, isUnique } = await QRCodeService.trackScan(
    qrId,
    fingerprint,
    userAgent,
    ip,
    location
  );

  SendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "QR Code scan tracked successfully",
    data: { isUnique, scan },
  });
});

export const QRCodeController = {
  createQrCode,
  updateQrCode,
  trackScan,
};
