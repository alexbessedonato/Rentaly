import { usePropertiesActions } from "./usePropertiesActions";

export const usePropertyListController = () => {
    const {useProperties} = usePropertiesActions();
    const { data: properties, isLoading, isError, error } = useProperties();

    return {properties, isLoading, isError, error};
};