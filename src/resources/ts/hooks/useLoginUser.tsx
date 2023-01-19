import React, { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { User } from "../types/api/User";

export const useLoginUser = () => {
    const [loading, setLoading] = useState(false);
    const [loginUser, setLoginUser] = useState<User>();
    const history = useHistory();

    const getLoginUser = useCallback(() => {
        setLoading(true);
        axios
            .get<User>("/api/user")
            .then((res) => {
                console.log(res.data);
                setLoginUser(res.data);
            })
            .catch(() => {console.log('err');});
    }, []);

    return { getLoginUser, loading, loginUser };
};
