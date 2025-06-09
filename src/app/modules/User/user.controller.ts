import { UserService } from "./user.service";
import { StatusCodes } from "http-status-codes";
import pick from "@utils/pick";
import { userFilterableFields } from "./user.constant";
import CatchAsync from "@utils/CatchAsync";
import SendResponse from "@utils/SendResponse";

const createUser = CatchAsync(async (req, res) => {
  const result = await UserService.createUser(req);
  SendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Created Successfully!",
    data: result,
  });
});

const getAllUserFromDB = CatchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await UserService.getAllUserFromDB(filters, options);

  SendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users data retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUserFromDB = CatchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserService.getSingleUserFromDB(id);

  SendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User retrieved successfully!",
    data: result,
  });
});

const myProfile = CatchAsync(
  async (req, res) => {
    const user = req.body;
    const result = await UserService.myProfile(user);

    SendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "My Profile retrieved successfully!",
      data: result,
    });
  }
);


const updateMyProfile = CatchAsync(
  async (req, res) => {
    const user = req.body.user;

    const result = await UserService.updateMyProfile(user, req);

    SendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "My Profile is updated successfully!",
      data: result,
    });
  }
);

export const UserController = {
  createUser,
  getAllUserFromDB,
  getSingleUserFromDB,
  myProfile,
  updateMyProfile,
};
