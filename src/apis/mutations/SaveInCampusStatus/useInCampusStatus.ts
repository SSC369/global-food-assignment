import { useMutation } from "@apollo/client";
import { IN_CAMPUS_STATUS } from "./mutation";
import foodItemsStore from "../../../store/FoodItemsStore";

function useInCampusStatus() {
  const [setInCampusStatus, { loading }] = useMutation(IN_CAMPUS_STATUS, {
    onCompleted: onSuccessFunction,
  });
  function triggerCampusStatus(data: any) {
    setInCampusStatus({ variables: { params: { ...data } } });
  }
  function onSuccessFunction() {
    foodItemsStore.setInCampusStatus();
  }

  return { triggerCampusStatus, loading };
}

export default useInCampusStatus;
