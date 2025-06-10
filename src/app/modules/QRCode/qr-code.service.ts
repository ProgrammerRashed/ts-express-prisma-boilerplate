import AppError from "@middleware/AppError";
import { Prisma } from "@prisma/client";
import prisma from "@utils/Prisma";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";

// CREATE QR CODE
const createQRCode = async (req: Request) => {
  const createdQRCodeData = await prisma.qRCode.create({
    data: req.body,
  });

  return createdQRCodeData;
};

// UPDATE QR CODE
const updateQRCode = async (id: string, data: any) => {
  if (!id) {
    throw new AppError(StatusCodes.OK, "QR Code ID is required for updating");
  }
//  TODO : need to add schema validation 
// TODO: need to update total edit count 
  const updatedQRCodeData = await prisma.qRCode.update({
    where: { id },
    data,
  });

  return updatedQRCodeData;
};

// TRACK SCAN SERVICE
const trackScan = async (
  qrId: string,
  fingerprint: string,
  userAgent: string,
  ip: string,
  location: any,
  deviceType: string,
  os: string,
  browser: string
) => {

  console.log("qrid",qrId, fingerprint)

  if (!qrId || !fingerprint) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Missing QR ID or fingerprint");
  }

  const existingScan = await prisma.scan.findFirst({
    where: { qrId, fingerprint },
  });

  const isUnique = !existingScan;

  // Use transaction to ensure consistency
  const [scan] = await prisma.$transaction([
    prisma.scan.create({
      data: {
        qrId,
        fingerprint,
        userAgent,
        ip,
        country: location.country || null,
        region: location.region || null,
        city: location.city || null,
        latitude: location.latitude || null,
        longitude: location.longitude || null,
        deviceType,
        os,
        browser,
        isUnique,
      },
    }),

    prisma.qRCode.update({
      where: { id: qrId },
      data: {
        totalScans: { increment: 1 },
        uniqueScans: isUnique ? { increment: 1 } : undefined,
        lastScans: new Date(),
      },
    }),
  ]);

  return { scan, isUnique };
};

// ✅ GET ALL QR CODES
const getAllQRCodes = async (creatorId?: string) => {
  const filter: Prisma.QRCodeFindManyArgs = creatorId
    ? {
        where: { creatorId },
        orderBy: { createdAt: Prisma.SortOrder.desc },
      }
    : {
        orderBy: { createdAt: Prisma.SortOrder.desc },
      };

  const qrCodes = await prisma.qRCode.findMany(filter);
  return qrCodes;
};

const getSingleQRData = async (qrCodeId: string) => {
const qrCode = await prisma.qRCode.findUnique({
  where: {id: qrCodeId}
})

  // Get scans by device
const scansByDevice = await prisma.scan.groupBy({
  by: ['deviceType'],
  where: { qrId: qrCodeId },
  _count: { _all: true },
});

// Get scans by location
const scansByLocation = await prisma.scan.groupBy({
  by: ['region'],
  where: { qrId: qrCodeId },
  _count: { _all: true }
});

// Get recent scans
const recentScans = await prisma.scan.findMany({
  where: { qrId: qrCodeId },
  orderBy: { timestamp: 'desc' },
  take: 5,
  select: {
    id: true,
    city: true,
    region: true,
    country: true,
    deviceType: true,
    timestamp: true
  }
});

return {
  qrCode,
  scansByLocation,
  scansByDevice,
  recentScans
}
}


export const QRCodeService = {
  createQRCode,
  updateQRCode,
  trackScan,
  getAllQRCodes,
  getSingleQRData
};