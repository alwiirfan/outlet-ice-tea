import adminService from "../services/admin-service";

const getById = async (req, res, next) => {
  try {
    const admin = await adminService.getById(req.params.id);
    res.status(200).json({
      status: 200,
      message: "Admin retrieved successfully",
      data: admin,
    });
  } catch (error) {
    const status = error.status || 500;
    next(res.status(status).json({ status: status, message: error.message }));
  }
};

const update = async (req, res, next) => {
  try {
    const admin = await adminService.update(req.body);
    res.status(200).json({
      status: 200,
      message: "Admin updated successfully",
      data: admin,
    });
  } catch (error) {
    const status = error.status || 500;
    next(res.status(status).json({ status: status, message: error.message }));
  }
};

export default { getById, update };
