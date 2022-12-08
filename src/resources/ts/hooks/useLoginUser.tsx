import React, { useCallback, useState } from "react";
import axios from "axios";

import { User } from "../types/api/User";

export const useLoginUser = () => {
    const [loginUser, setloginUser] = useState({});

    const getLoginUser = useCallback(() => {
        axios
            .get<User>("/api/user")
            .then((res) => {
                setloginUser(res.data);
            })
            .catch(() => {});
    }, []);

    return { getLoginUser, loginUser };
};
