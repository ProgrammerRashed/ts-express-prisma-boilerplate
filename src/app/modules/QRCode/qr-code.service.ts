import AppError from "@middleware/AppError";
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

// TRACK SCAN
const trackScan = async (
  qrId: string,
  fingerprint: string,
  userAgent: string,
  ip: string,
  location?: any
) => {
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
        location,
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

export const QRCodeService = {
  createQRCode,
  updateQRCode,
  trackScan,
};
