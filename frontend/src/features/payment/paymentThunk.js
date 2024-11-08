import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";


export const paymentPostThunk = async (url, event, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, event
        );
        return { data: resp.data.data, status: 200 };
    } catch (error) {
        if (error.response.status === 422) {
            return thunkAPI.rejectWithValue(error.response.data.data.errors);
        } else if (error.response.status === 401) {
            return checkForUnauthorizedResponse(error, thunkAPI);
        } else {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
};

export const refreshStatusThunk = async (url, event, thunkAPI) => {
    try {
        const resp = await customFetch.post(url+event);
        return resp.data.data;
    } catch (error) {
        if (error.response.status === 422) {
            return thunkAPI.rejectWithValue(error.response.data.data.errors);
        } else if (error.response.status === 401) {
            return checkForUnauthorizedResponse(error, thunkAPI);
        }
        else {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
};
