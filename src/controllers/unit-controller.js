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

const getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const request = {
      unitName: req.query.unitName || "",
    };

    const units = await unitService.getAll(request, page, limit);

    res.status(200).json({
      status: 200,
      message: "Units retrieved successfully",
      data: units.data,
      page: units.page,
      limit: units.limit,
      totalRows: units.totalRows,
      totalPage: units.totalPage,
    });
  } catch (error) {
    const status = error.status || 500;
    next(res.status(status).json({ status: status, message: error.message }));
  }
};

export default {
  create,
  getAll,
};
