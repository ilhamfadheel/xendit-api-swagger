const { axios, getAuthHeader } = require("../utils/xendit");

const createInvoice = async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.xendit.co/v2/invoices",
      req.body,
      getAuthHeader(),
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || error.message);
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.xendit.co/v2/invoices/${req.params.invoice_id}`,
      getAuthHeader(),
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || error.message);
  }
};

const getInvoices = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.xendit.co/v2/invoices",
      getAuthHeader(),
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || error.message);
  }
};

const expireInvoice = async (req, res) => {
  try {
    const response = await axios.post(
      `https://api.xendit.co/invoices/${req.params.invoice_id}/expire!`,
      null,
      getAuthHeader(),
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || error.message);
  }
};

module.exports = {
  createInvoice,
  getInvoiceById,
  getInvoices,
  expireInvoice,
};
