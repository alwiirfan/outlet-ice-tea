import "dotenv/config";
import authService from "../services/auth-service.js";

const registerCashier = async (req, res, next) => {
  try {
    const response = await authService.registerCashier(req.body);
    res.status(201).json({
      status: 201,
      message: "Cashier created successfully",
      data: response,
    });
  } catch (error) {
    const status = error.status || 500;
    next(res.status(status).json({ status: status, message: error.message }));
  }
};

const loginCashier = async (req, res, next) => {
  try {
    const response = await authService.loginCashier(req.body);

    res.cookie("refreshToken", response.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      status: 200,
      message: "Cashier logged in successfully",
      data: {
        username: response.username,
        accessToken: response.accessToken,
        roles: response.roles,
      },
    });
  } catch (error) {
    const status = error.status || 500;
    next(res.status(status).json({ status: status, message: error.message }));
  }
};

const registerAdmin = async (req, res, next) => {
  try {
    const response = await authService.registerAdmin(req.body);

    res.status(201).json({
      status: 201,
      message: "Admin created successfully",
      data: response,
    });
  } catch (error) {
    const status = error.status || 500;
    next(res.status(status).json({ status: status, message: error.message }));
  }
};

const loginAdmin = async (req, res, next) => {
  try {
    const response = await authService.loginAdmin(req.body);

    res.cookie("refreshToken", response.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      status: 201,
      message: "Admin logged in successfully",
      data: {
        username: response.username,
        accessToken: response.accessToken,
        roles: response.roles,
      },
    });
  } catch (error) {
    const status = error.status || 500;
    next(res.status(status).json({ status: status, message: error.message }));
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const response = await authService.refreshToken(req.cookies.refreshToken);

    res.status(200).json({
      status: 200,
      message: "Token refreshed successfully",
      data: {
        accessToken: response.accessToken,
      },
    });
  } catch (error) {
    const status = error.status || 500;
    next(res.status(status).json({ status: status, message: error.message }));
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.cookies.refreshToken);

    res.clearCookie("refreshToken");

    res.status(200).json({
      status: 200,
      message: "logged out successfully",
    });
  } catch (error) {
    const status = error.status || 500;
    next(res.status(status).json({ status: status, message: error.message }));
  }
};

export default {
  registerCashier,
  loginCashier,
  registerAdmin,
  loginAdmin,
  refreshToken,
  logout,
};
