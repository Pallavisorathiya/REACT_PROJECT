import axios from "axios";


export const uploadImage = async (data) => {
    let formData = new FormData();

    formData.append('file', data);
    formData.append('upload_preset', "Blinkit");
    formData.append('cloud_name', 'dhx3dgedf');

    let res = await axios.post(`https://api.cloudinary.com/v1_1/dhx3dgedf/image/upload`, formData)
    return res.data.secure_url;
}