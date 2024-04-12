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

export default { create };
