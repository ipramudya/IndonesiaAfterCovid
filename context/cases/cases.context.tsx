import { createContext, useMemo, useReducer } from "react";
import { useEffectOnce } from "react-use";

import { useStorage } from "hooks";
import { CasesDispatch, CasesProviderProps, CasesState } from "types/context.types";

import casesReducer from "./cases.reducer";

const initialState: CasesState = {
    exploredProvince: { isEmpty: true },
    isPopupShown: false,
};

const CasesContext = createContext<{ state: CasesState; dispatch: CasesDispatch } | undefined>(
    undefined
);

function CasesProvider({ children }: CasesProviderProps) {
    const [state, dispatch] = useReducer(casesReducer, initialState);
    const { getStorageValue } = useStorage("cases");

    // Get data from local storage and serverside props, then store them inside context
    useEffectOnce(() => {
        if (getStorageValue && !getStorageValue.exploredProvince?.isEmpty) {
            dispatch({
                type: "setProvinceFromStorage",
                payload: getStorageValue.exploredProvince as any,
            });
            return;
        }
    });

    const value = useMemo(() => ({ state, dispatch }), [state]);
    return <CasesContext.Provider value={value}>{children}</CasesContext.Provider>;
}

export { CasesContext, CasesProvider };
