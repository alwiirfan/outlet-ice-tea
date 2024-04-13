import cashierService from "../services/cashier-service.js";

const getById = async (req, res, next) => {
  try {
    const cashier = await cashierService.getById(req.params.id);
    res.status(200).json({
      status: 200,
      message: "Cashier retrieved successfully",
      data: cashier,
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
      fullName: req.query.fullName || "",
      callName: req.query.callName || "",
      phoneNumber: req.query.phoneNumber || "",
      street: req.query.street || "",
      city: req.query.city || "",
      province: req.query.province || "",
      country: req.query.country || "",
      postalCode: req.query.postalCode || "",
    };

    const cashiers = await cashierService.getAll(request, page, limit);

    console.log(cashiers);

    res.status(200).json({
      status: 200,
      message: "Cashiers retrieved successfully",
      data: cashiers.data,
      page: cashiers.page,
      limit: cashiers.limit,
      totalRows: cashiers.totalRows,
      totalPage: cashiers.totalPage,
    });
  } catch (error) {
    const status = error.status || 500;
    next(res.status(status).json({ status: status, message: error.message }));
  }
};

const update = async (req, res, next) => {
  try {
    const cashier = await cashierService.update(req.body);
    res.status(200).json({
      status: 200,
      message: "Cashier updated successfully",
      data: cashier,
    });
  } catch (error) {
    const status = error.status || 500;
    next(res.status(status).json({ status: status, message: error.message }));
  }
};

export default {
  getById,
  getAll,
  update,
};
