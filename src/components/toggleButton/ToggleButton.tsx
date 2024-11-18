import React from "react";
import { VoidFunctionType } from "../../types";
import { observer } from "mobx-react-lite";
import foodItemsStore from "../../store/FoodItemsStore";
import useInCampusStatus from "../../apis/mutations/InCampusStatus/useInCampusStatus";
import Loader from "../loader/Loader";
import { USER_TOKEN } from "../../constants";

const ToggleSwitch: React.FC = observer(() => {
  const { triggerCampusStatus, loading } = useInCampusStatus();
  const handleToggle: VoidFunctionType = () => {
    const userId = JSON.parse(localStorage.getItem(USER_TOKEN)!);
    triggerCampusStatus({
      userId: userId,
      inCampus: !foodItemsStore.inCampusStatus,
    });
    // foodItemsStore.setInCampusStatus();
  };
  if (loading) {
    return <Loader color="blue" />;
  }
  return (
    <div
      onClick={handleToggle}
      className={` w-[44px] p-1 rounded-3xl transition-all cursor-pointer duration-300 ease-in-out ${
        foodItemsStore.inCampusStatus ? "bg-blue-600" : "bg-slate-200"
      }`}
    >
      <div
        className={`h-[16px] w-[16px] bg-white shadow-md rounded-full transition-all duration-300 ease-in-out
        ${foodItemsStore.inCampusStatus ? "translate-x-5" : ""}`}
      ></div>
    </div>
  );
});

export default ToggleSwitch;
