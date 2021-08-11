import { createContext } from "react";

const AppContext = createContext({
    triggerPageView: () => { },
    triggerEvent: () => { },
    modalShow: '',
    setModalShow: () => { }
});
export default AppContext;
