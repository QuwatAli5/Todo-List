import axios from "axios";

const Auth = () => {

    // Auth Related APIs
    const login = async (payload) => {
        try {
            const response = await axios.post(`/login`, payload);
            return response;
        } catch (err) {
            return err;
        }
    };
  
    const register = async (payload) => {
        try {
            let response = await axios.post(`/register`, payload);
            return response;
        } catch (err) {
            return err.response;
        }
    };

    const logout = async (payload) => {
        try {
            let response = await axios.post(`/logout`, payload);
            return response;
        } catch (err) {
            return err.response;
        }
    };

    // List Related APIs 
    const getAllList = async () => {
        try {
            let response = await axios.get(`/items`);
            return response;
        } catch (err) {
            return err.response;
        }
    };

    const createList = async (payload) => {
        try {
            let response = await axios.post(`/item`, payload);
            return response;
        } catch (err) {
            return err.response;
        }
    };

    const getSingleList = async (list_id) => {
        try {
            let response = await axios.get(`/item/${list_id}`);
            return response;
        } catch (err) {
            return err.response;
        }
    };

    const updateList = async (list_id, payload) => {
        try {
            let response = await axios.put(`/item/${list_id}`, payload);
            return response;
        } catch (err) {
            return err.response;
        }
    };

    const deleteList = async (list_id) => {
        try {
            let response = await axios.delete(`/item/${list_id}`);
            return response;
        } catch (err) {
            return err.response;
        }
    };

    return {
        login,
        register,
        logout,
        getAllList,
        createList,
        getSingleList,
        updateList,
        deleteList,
    }
};

export default Auth;