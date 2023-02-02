import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const useUnLike = () => {
    const history = useHistory();

    const onClickUnGood = useCallback((id: number) => {
        if (history.location.pathname === "/home") {
            axios.post(`/api/unlike/${id}`).then((res) => {
                history.replace("/");
                history.replace("/home");
            });
        } else if (history.location.pathname === "/home/myGoodList") {
            axios.post(`/api/unlike/${id}`).then((res) => {
                history.replace("/");
                history.replace("/home/myGoodList");
            });
        }
    }, []);

    return { onClickUnGood };
};
