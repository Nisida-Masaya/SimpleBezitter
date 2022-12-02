import React, { useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { User } from "../types/api/User";

export const useLoginUser = () => {
    const history = useHistory();

    const loginUser = useCallback(() => {
        axios
            .get<User>("/api/user")
            .then((res) => {
                console.log(res.data);
            })
            .catch(() => {});
    }, []);

    return { loginUser };
};
