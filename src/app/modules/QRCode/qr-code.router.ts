import auth from "@middleware/auth";
import { UserRole } from "@prisma/client";
import express from "express";
import { QRCodeController } from "./qr-code.controller";
import validateRequest from "@middleware/validationRequest";
import { QRCodeValidation } from "./qr-code.validation";
const router = express.Router();

router.post(
  "/create-qr", validateRequest(QRCodeValidation.QRCodeSchema),
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER), QRCodeController.createQrCode
);

router.post(
  "/track-scan",
  QRCodeController.trackScan
);

router.patch(
  "/update-qr/:id", validateRequest(QRCodeValidation.QRCodeSchema),
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER), QRCodeController.updateQrCode
);

router.get(
  "/get-all-qr",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER), QRCodeController.getMyQRCodes
);

export const QRCodeRoutes = router;