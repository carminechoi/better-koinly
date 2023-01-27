import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000",
        prepareHeaders: (headers, { getState }) => {
            const accessToken = getState().auth.accessToken;
            if (accessToken) {
                headers.set("authorization", `Bearer ${accessToken}`);
                return headers;
            }
        },
    }),
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            query: () => ({
                url: "api/user/profile",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetUserDetailsQuery } = authApi;