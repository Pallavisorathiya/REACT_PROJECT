import axios from 'axios';

// Action creators
export const loading = () => ({ type: "LOADING" });

export const addProductSUC = () => ({ type: "ADD_PRODUCT_SUC" });
export const addProductRej = (err) => ({ type: "ADD_PRODUCT_REJ", payload: err });

export const getAllProducts = (data) => ({ type: "GET_ALL_PRODUCTS_SUC", payload: data });
export const getProductsRej = (err) => ({ type: "GET_ALL_PRODUCTS_REJ", payload: err });

export const getProduct = (data) => ({ type: "GET_PRODUCT", payload: data });

export const updateProduct = () => ({ type: "UPDATE_PRODUCT" });

// Async actions
// Get all products
export const getAllProductAsync = () => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            const res = await axios.get('http://localhost:3000/products');
            dispatch(getAllProducts(res.data));
        } catch (error) {
            console.error(error);
            dispatch(getProductsRej(error.message));
        }
    };
};

// Add new product
export const addProductAsync = (data) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            await axios.post('http://localhost:3000/products', data);
            dispatch(addProductSUC());
            dispatch(getAllProductAsync()); // ✅ refresh list
        } catch (error) {
            console.error(error);
            dispatch(addProductRej(error.message));
        }
    };
};

// Delete product
export const deleteProductAsync = (id) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            await axios.delete(`http://localhost:3000/products/${id}`);
            dispatch(getAllProductAsync()); // ✅ refresh list
        } catch (error) {
            console.error(error);
            dispatch(addProductRej(error.message));
        }
    };
};

// Get single product
export const getProductAsync = (id) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            const res = await axios.get(`http://localhost:3000/products/${id}`);
            dispatch(getProduct(res.data));
        } catch (error) {
            console.error(error);
            dispatch(addProductRej(error.message));
        }
    };
};

// Update product
export const updateProductAsync = (data) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            await axios.put(`http://localhost:3000/products/${data.id}`, data);
            dispatch(updateProduct());
            dispatch(getAllProductAsync()); // ✅ refresh list
        } catch (error) {
            console.error(error);
            dispatch(addProductRej(error.message));
        }
    };
};
// Add this at the end or anywhere in the file

export const searchProduct = (query) => {
  return {
    type: "SEARCH_PRODUCT",
    payload: query,
  };
};
