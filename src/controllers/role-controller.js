import roleService from "../services/role-service.js";

const create = async (req, res, next) => {
  try {
    const newRole = await roleService.create(req.body);
    res.status(201).json({
      status: 201,
      message: "Role created successfully",
      data: newRole,
    });
  } catch (error) {
    const status = error.status || 500;
    next(res.status(status).json({ status: status, message: error.message }));
  }
};

const getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const request = {
      role: req.query.role || "",
    };

    const roles = await roleService.getAll(request, page, limit);

    res.status(200).json({
      status: 200,
      message: "Roles retrieved successfully",
      data: roles.data,
      page: roles.page,
      limit: roles.limit,
      totalRows: roles.totalRows,
      totalPage: roles.totalPage,
    });
  } catch (error) {
    const status = error.status || 500;
    next(res.status(status).json({ status: status, message: error.message }));
  }
};

export default { create, getAll };
