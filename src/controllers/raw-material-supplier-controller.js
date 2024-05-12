import rawMaterialSupplierService from "../services/raw-material-supplier-service.js";

const create = async (req, res, next) => {
  try {
    const response = await rawMaterialSupplierService.create(req.body);
    res.status(201).json({
      status: 201,
      message: "Raw Material Supplier created successfully",
      data: response,
    });
  } catch (error) {
    const status = error.status || 500;
    next(res.status(status).json({ status: status, message: error.message }));
  }
};

const getById = async (req, res, next) => {
  try {
    const rawMaterialSupplier = await rawMaterialSupplierService.getById(
      req.params.id
    );
    res.status(200).json({
      status: 200,
      message: "Raw Material Supplier retrieved successfully",
      data: rawMaterialSupplier,
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
      materialName: req.query.materialName || "",
      unitPrice: req.query.unitPrice || 0,
      totalQuantity: req.query.totalQuantity || 0,
      unit: req.query.unit || "",
    };

    const rawMaterialSuppliers = await rawMaterialSupplierService.getAll(
      request,
      page,
      limit
    );

    res.status(200).json({
      status: 200,
      message: "Raw Material Suppliers retrieved successfully",
      data: rawMaterialSuppliers.data,
      page: rawMaterialSuppliers.page,
      limit: rawMaterialSuppliers.limit,
      totalRows: rawMaterialSuppliers.totalRows,
      totalPage: rawMaterialSuppliers.totalPage,
    });
  } catch (error) {
    const status = error.status || 500;
    next(res.status(status).json({ status: status, message: error.message }));

    console.log(error);
  }
};
export default {
  create,
  getById,
  getAll,
};
