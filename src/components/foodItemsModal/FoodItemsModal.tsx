import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { observer } from "mobx-react-lite";

import Modal from "../modal/Modal";
import { FoodItemType, MealTypeEnum } from "../../types";
import useFetchFoodItems from "../../apis/queries/getFoodItems/useFetchFoodItems";
import Loader from "../loader/Loader";
import SelectFoodItems from "../selectFoodItems/SelectFoodItems";

interface FoodItemsModal {
  setShowFoodItemsModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentMealTab: MealTypeEnum;
  addFoodItem: (food: FoodItemType) => void;
}

const FoodItemsModal: React.FC<FoodItemsModal> = ({
  setShowFoodItemsModal,
  currentMealTab,
  addFoodItem,
}) => {
  const { loading, error, refetch, refetchloading } = useFetchFoodItems();
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItemType | null>(
    null
  );
  const currentMealType =
    currentMealTab[0].toUpperCase() + currentMealTab.slice(1);

  const handleAddFoodItem = (): void => {
    if (!selectedFoodItem) {
      return;
    }
    addFoodItem(selectedFoodItem);
    setShowFoodItemsModal(false);
  };

  const handleRefetchFoodItems = () => {
    refetch({
      params: {
        limit: 10,
        offset: 0,
      },
    });
  };

  const renderFoodItems = () => {
    if (error) {
      return (
        <div className="mt-6">
          <h1>Something went wrong !!!</h1>
          <button
            onClick={handleRefetchFoodItems}
            className="bg-primary text-sm text-white font-medium py-2 px-5 rounded-lg mt-4"
          >
            Retry
          </button>
        </div>
      );
    }

    if (loading || refetchloading) {
      return (
        <div className="mt-6">
          <Loader color="#0B69FF" width={30} height={30} />
        </div>
      );
    }

    return (
      <>
        <p className="text-secondary text-sm font-medium">
          SELECT THE FOOD ITEM
        </p>
        <div className="relative flex flex-col gap-1">
          <SelectFoodItems setSelectedFoodItem={setSelectedFoodItem} />
          <div className="pointer-events-none absolute top-4 right-3 flex items-center text-slate-600">
            <FiChevronDown className="w-5 h-5" />
          </div>
        </div>
        <button
          onClick={handleAddFoodItem}
          className="bg-success w-fit self-center text-white font-medium py-2 px-5 rounded-lg mt-4"
        >
          ADD ITEM
        </button>
      </>
    );
  };

  return (
    <Modal close={() => setShowFoodItemsModal(false)}>
      <div className="w-[400px] flex flex-col gap-4">
        <h1 className="text-xl">Add to {currentMealType}</h1>

        {renderFoodItems()}
      </div>
    </Modal>
  );
};

export default observer(FoodItemsModal);
