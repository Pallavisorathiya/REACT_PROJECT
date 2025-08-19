import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

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
            let result = [];
            let resRef = await getDocs(collection(db, 'products'));
            resRef.forEach((docSnap) => {
                result.push({ ...docSnap.data(), id: docSnap.id });
            });
            dispatch(getAllProducts(result));
        } catch (error) {
            console.log(error);
            dispatch(getProductsRej(error.message));
        }
    };
};

export const addProductAsync = (data) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            await setDoc(doc(db, "products", data.id), data);
            dispatch(addProductSUC());

           
            setTimeout(() => {
                dispatch(getAllProductAsync());
            }, 1000);

        } catch (error) {
            console.log(error);
            dispatch(addProductRej(error.message));
        }
    };
};

export const deleteProductAsync = (id) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            await deleteDoc(doc(db, "products", id));
            dispatch(getAllProductAsync());
        } catch (error) {
            console.log(error);
            dispatch(addProductRej(error.message));
        }
    };
};

export const getProductAsync = (id) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            let res = await getDoc(doc(db, "products", id));
            dispatch(getProduct({ ...res.data(), id: res.id }));
        } catch (error) {
            console.log(error);
            dispatch(addProductRej(error.message));
        }
    };
};


export const updateProductAsync = (data) => {
    return async (dispatch) => {
        dispatch(loading());
        try {
            await updateDoc(doc(db, "products", data.id), data);
            dispatch(updateProduct());

            setTimeout(() => {
                dispatch(getAllProductAsync());
            }, 1000);

        } catch (error) {
            console.log(error);
            dispatch(addProductRej(error.message));
        }
    };
};
