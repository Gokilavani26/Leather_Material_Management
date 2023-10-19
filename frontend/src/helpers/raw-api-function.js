import axios from "axios";

export const getMaterialById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:7000/raw/${id}`);
    return response.data;
  } catch (error) {}
};

export const addMaterial = async (material) => {
  try {
    const response = await axios.post(
      "http://localhost:7000/raw/add/",
      material
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateMaterial= async (id, material) => {
  try {
    const response = await axios.put(
      `http://localhost:7000/raw/update/${id}`,
      material
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMaterial = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:7000/raw/delete/${id}`
    );
    
    return response.data;
  } catch (error) {
    console.log("error");
  }
};
