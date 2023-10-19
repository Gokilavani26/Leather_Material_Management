import axios from "axios";

export const getProductById = async(id) => {
  try {
    const response = await axios.get(`http://localhost:7000/finish/${id}`);
    return response.data;
  } catch (error) {}
};

export const addProduct = async(product) => {
  try {
    const response = await axios.post(
      "http://localhost:7000/finish/add/",

      product
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async(id, product) => {
  try {
    const response = await axios.put(
      `http://localhost:7000/finish/update/${id}`,
      product
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductById = async(id) => {
  try {
    const response = await axios.delete(
      `http://localhost:7000/finish/delete/${id}`
    );
    
    return response.data;
  } catch (error) {
    console.log("error");
  }
};
