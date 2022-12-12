import React, { useCallback, useState } from "react";
import axios from "axios";

import { User } from "../types/api/User";

export const useLoginUser = () => {
    const [loginUser, setLoginUser] = useState({});

    const getLoginUser = useCallback(() => {
        axios
            .get<User>("/api/getLoginUser")
            .then((res) => {
                setLoginUser(res.data);
            })
            .catch(() => {});
    }, []);

    return { getLoginUser, loginUser };
};
