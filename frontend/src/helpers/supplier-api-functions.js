import axios from "axios";

export const getSupplierById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:7000/supplier/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addSupplier = async (supplier) => {
  try {
    const response = await axios.post(
      "http://localhost:7000/supplier/add/",

      supplier
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateSupplier= async (id, supplier) => {
  try {
    const response = await axios.put(
      `http://localhost:7000/supplier/update/${id}`,
      supplier
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSupplierById = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:7000/supplier/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("error");
  }
};
