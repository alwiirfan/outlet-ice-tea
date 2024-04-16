import unitService from "../services/unit-service.js";

const create = async (req, res, next) => {
  try {
    const response = await unitService.create(req.body);
    res.status(201).json({
      status: 201,
      message: "Unit created successfully",
      data: response,
    });
  } catch (error) {
    const status = error.status || 500;
    next(res.status(status).json({ status: status, message: error.message }));
  }
};

export default {
  create,
};
