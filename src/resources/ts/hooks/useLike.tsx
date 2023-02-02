import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const useLike = () => {
    const history = useHistory();

    const onClickGood = useCallback((id: number) => {
        if (history.location.pathname === "/home") {
            axios.post(`/api/like/${id}`).then((res) => {
                history.replace("/");
                history.replace("/home");
            });
        } else if (history.location.pathname === "/home/myGoodList") {
            axios.post(`/api/like/${id}`).then((res) => {
                history.replace("/");
                history.replace("/home/myGoodList");
            });
        }
    }, []);

    return { onClickGood };
};
