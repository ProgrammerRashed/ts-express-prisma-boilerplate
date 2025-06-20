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
  "/update-qr/:id", validateRequest(QRCodeValidation.QRCodeUpdateSchema),
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER), QRCodeController.updateQrCode
);

router.delete(
  "/delete/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER), QRCodeController.deleteQrCode
);

router.get(
  "/get-all-qr",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER), QRCodeController.getMyQRCodes
);
router.get(
  "/get-single-qr/:id",
   QRCodeController.getSingleQRData
);
router.get(
  "/get-single-qr/settings/:id",
   QRCodeController.getQRCodeScanSettings
);
router.get(
  "/dashboard/stats", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
   QRCodeController.getDashboardStats
);
router.get(
  "/dashboard/analytics", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
   QRCodeController.getDashboardAnalytics
);


export const QRCodeRoutes = router;