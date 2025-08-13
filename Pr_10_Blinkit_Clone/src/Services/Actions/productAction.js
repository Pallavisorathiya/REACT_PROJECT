import axios from 'axios';

export const loading = () => ({ type: "LOADING" });

export const addProductSUC = () => ({ type: "ADD_PRODUCT_SUC" });
export const addProductRej = (err) => ({ type: "ADD_PRODUCT_REJ", payload: err });

export const getAllProducts = (data) => ({ type: "GET_ALL_PRODUCTS_SUC", payload: data });
export const getProductsRej = (err) => ({ type: "GET_ALL_PRODUCTS_REJ", payload: err });

export const getProduct = (data) => ({ type: "GET_PRODUCT", payload: data });

export const updateProduct = () => ({ type: "UPDATE_PRODUCT" });

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

export const addProductAsync = (data) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            await axios.post('http://localhost:3000/products', data);
            dispatch(addProductSUC());
            dispatch(getAllProductAsync()); 
        } catch (error) {
            console.error(error);
            dispatch(addProductRej(error.message));
        }
    };
};

export const deleteProductAsync = (id) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            await axios.delete(`http://localhost:3000/products/${id}`);
            dispatch(getAllProductAsync());  
        } catch (error) {
            console.error(error);
            dispatch(addProductRej(error.message));
        }
    };
};

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

export const updateProductAsync = (data) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            await axios.put(`http://localhost:3000/products/${data.id}`, data);
            dispatch(updateProduct());
            dispatch(getAllProductAsync());
        } catch (error) {
            console.error(error);
            dispatch(addProductRej(error.message));
        }
    };
};


export const searchProduct = (query) => {
  return {
    type: "SEARCH_PRODUCT",
    payload: query,
  };
};
