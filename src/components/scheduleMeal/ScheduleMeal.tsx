import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { v4 } from "uuid";
import { useTranslation } from "react-i18next";

import {
  FoodItemType,
  MealFoodDataType,
  MealTypeEnum,
  ReactElementType,
  VoidFunctionType,
} from "../../types";
import Loader from "../loader/Loader";
import MealDate from "../mealDate/MealDate";
import MealTabs from "../mealTabs/MealTabs";
import ScheduleFoodItem from "../scheduleFoodItem/ScheduleFoodItem";
import FoodItemsModal from "../foodItemsModal/FoodItemsModal";
import DeleteConfirmModal from "../confirmModal/DeleteConfirmModal";
import SaveConfirmModal from "../confirmModal/SaveConfirmModal";
import ModalStore from "../../store/ModalStore";
import useScheduleMeal from "../../apis/mutations/SaveScheduledMeal/useMutateScheduleMeal";
import { formatDate, getTomorrowDate } from "../../utils/formatDate";
import { successToast } from "../../utils/toastUtils/successToast";
import { failureToast } from "../../utils/toastUtils/failureToast";
import useFetchScheduledMeal from "../../apis/queries/GetMealScheduled/useFetchScheduledMeal";
import scheduledMealStore from "../../store/ScheduledMealStore";
import { blueButton, greenButton, header, viewContainer } from "./styles";

const ScheduleMeal: React.FC = () => {
  //create object state for all modals
  const [currentDate, setCurrentDate] = useState<Date>(getTomorrowDate());
  const [currentMealTab, setCurrentMealTab] = useState(MealTypeEnum.BREAKFAST);
  const [showFoodItemsModal, setShowFoodItemsModal] = useState<boolean>(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] =
    useState<boolean>(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] =
    useState<boolean>(false);
  const [deleteFoodItemId, setDeleteFoodItemId] = useState<string | null>(null);
  const { mealsLoading } = useFetchScheduledMeal(
    formatDate(currentDate),
    currentMealTab
  );
  const { loading, error, setSchedule } = useScheduleMeal();
  const scheduledMealItems = scheduledMealStore.getMealDayData(
    formatDate(currentDate)
  );
  const [foodData, setFoodData] =
    useState<MealFoodDataType>(scheduledMealItems);
  const { t } = useTranslation();
  const tPath = "pages.adminHome.scheduleMeal.";

  const mealDataObjectString = JSON.stringify(scheduledMealItems);
  useEffect(() => {
    setFoodData(scheduledMealItems);
  }, [mealDataObjectString]);

  const addFoodItem = (food: FoodItemType): void => {
    const isFoodExist = foodData[currentMealTab].some(
      (item) => item.id === food.id
    );
    if (isFoodExist) {
      return;
    }
    foodData[currentMealTab].push(food);
  };

  const removeFoodItem = (id: string): void => {
    const filteredFoods = foodData[currentMealTab].filter(
      (item) => item.id !== id
    );
    setFoodData({ ...foodData, [currentMealTab]: filteredFoods });
  };

  const handleTabChange = (meal: MealTypeEnum): void => {
    setCurrentMealTab(meal);
  };

  const updateFullMealQuantity = (id: string, quantity: number): void => {
    const updatedFoods = foodData[currentMealTab].map((item) => {
      if (item.id === id) {
        return {
          ...item,
          fullMealQuantity: quantity,
        };
      }
      return item;
    });
    setFoodData({ ...foodData, [currentMealTab]: updatedFoods });
  };

  const updateHalfMealQuantity = (id: string, quantity: number): void => {
    const updatedFoods = foodData[currentMealTab].map((item) => {
      if (item.id === id) {
        return {
          ...item,
          halfMealQuantity: quantity,
        };
      }
      return item;
    });
    setFoodData({ ...foodData, [currentMealTab]: updatedFoods });
  };

  const handleOpenDeleteConfirmModal = (foodId: string): void => {
    setDeleteFoodItemId(foodId);
    setShowDeleteConfirmModal(true);
    ModalStore.openConfirmModal();
  };

  const handleCloseDeleteConfirmModal: VoidFunctionType = () => {
    setShowDeleteConfirmModal(false);
    setDeleteFoodItemId(null);
    ModalStore.closeConfirmModal();
  };

  const renderMealItemsHeaders: ReactElementType = () => {
    const path = tPath + "mealItemsHeaders.";
    return (
      <ul className="flex items-center gap-4 mt-4 text-primary font-semibold">
        <li className="w-1/4">{t(path + "items")}</li>
        <li className="w-[118px]">{t(path + "fullMeal")}</li>
        <li className="">{t(path + "halfMeal")}</li>
      </ul>
    );
  };

  const renderScheduleFoodItems: ReactElementType = () => {
    return (
      <>
        {renderMealItemsHeaders()}
        <ul className="mt-6 flex flex-col gap-2">
          {foodData[currentMealTab].map((food) => {
            return (
              <ScheduleFoodItem
                key={v4()}
                food={food}
                updateHalfMealQuantity={updateHalfMealQuantity}
                handleOpenConfirmModal={handleOpenDeleteConfirmModal}
                removeFoodItem={removeFoodItem}
                updateFullMealQuantity={updateFullMealQuantity}
              />
            );
          })}
        </ul>
        <button
          onClick={() => setShowFoodItemsModal(true)}
          className={blueButton}
        >
          {t(tPath + "buttons.addItem")}
        </button>
      </>
    );
  };

  const renderLoadingView: ReactElementType = () => {
    return (
      <div className={viewContainer}>
        <Loader color="#0B69FF" height={40} width={40} radius={4} />
      </div>
    );
  };

  const renderMealSaveErrorView: ReactElementType = () => {
    return (
      <div className={viewContainer}>
        <h1 className="text-xl font-semibold ">
          {t(tPath + "errorView.title")}
        </h1>
        <button onClick={handleSaveMealSchedule} className={blueButton}>
          {t(tPath + "buttons.retry")}
        </button>
      </div>
    );
  };

  const renderMealsEmptyView: ReactElementType = () => {
    return (
      <div className={viewContainer}>
        <h1 className="text-general font-semibold text-xl">
          {t(tPath + "emptyView.title")}
        </h1>
        <button
          onClick={() => setShowFoodItemsModal(true)}
          className={blueButton}
        >
          {t(tPath + "buttons.addItem")}
        </button>
      </div>
    );
  };

  const renderMealItems: ReactElementType = () => {
    if (mealsLoading) {
      return renderLoadingView();
    }
    if (error) {
      return renderMealSaveErrorView();
    }
    //while data is storing in store, getting glitch
    if (foodData[currentMealTab].length === 0) {
      return renderMealsEmptyView();
    }
    return renderScheduleFoodItems();
  };

  const renderDeleteConfirmModal: ReactElementType = () => {
    if (showDeleteConfirmModal) {
      if (!deleteFoodItemId) {
        //throw error
        return <></>;
      }
      const getFoodItem = (): FoodItemType => {
        return foodData[currentMealTab].find(
          (item) => item.id === deleteFoodItemId
        )!;
      };
      const foodItem = getFoodItem();
      return (
        <DeleteConfirmModal
          removeFoodItem={removeFoodItem}
          handleCloseDeleteConfirmModal={handleCloseDeleteConfirmModal}
          foodItem={foodItem}
        />
      );
    }
    return <></>;
  };

  const handleCloseSaveConfirmModal: VoidFunctionType = () => {
    setShowSaveConfirmModal(false);
    ModalStore.closeConfirmModal();
  };

  const handleMealSaveSuccess: VoidFunctionType = () => {
    successToast(t(tPath + "toasts.success"));
  };

  const handleMealSaveFailure: VoidFunctionType = () => {
    failureToast(t(tPath + "toasts.failure"));
    handleCloseSaveConfirmModal();
  };

  const handleSaveMealSchedule: VoidFunctionType = () => {
    handleCloseSaveConfirmModal();
    const itemIds: string[] = [];
    const fullMealQuantities: number[] = [];
    const halfMealQuantities: number[] = [];
    let validation = true;

    foodData[currentMealTab].forEach((meal) => {
      const { id, fullMealQuantity, halfMealQuantity } = meal;
      if (fullMealQuantity === 0 || halfMealQuantity === 0) {
        failureToast(t(tPath + "toasts.quantityError"));
        validation = false;
        return;
      }
      itemIds.push(id);
      fullMealQuantities.push(fullMealQuantity);
      halfMealQuantities.push(halfMealQuantity);
    });

    if (validation) {
      setSchedule({
        variables: {
          params: {
            itemIds,
            fullMealQuantities,
            halfMealQuantities,
            date: formatDate(currentDate),
            mealType: currentMealTab.toUpperCase(),
          },
        },
      }).then(({ data }) => {
        const { scheduleMeal } = data;
        if (scheduleMeal.__typename === "ScheduleMealSuccess") {
          handleMealSaveSuccess();
        } else if (scheduleMeal.__typename === "ScheduleMealFailure") {
          handleMealSaveFailure();
        }
      });
    }
  };

  const renderSaveConfirmModal: ReactElementType = () => {
    if (showSaveConfirmModal) {
      return (
        <SaveConfirmModal
          action={handleSaveMealSchedule}
          closeModal={handleCloseSaveConfirmModal}
        />
      );
    }
    return <></>;
  };

  const handleOpenSaveConfirmModal: VoidFunctionType = () => {
    setShowSaveConfirmModal(true);
    ModalStore.openConfirmModal();
  };

  const renderButtons: ReactElementType = () => {
    const renderButtonLoader = (): JSX.Element | string => {
      if (loading) {
        return <Loader />;
      }
      return t(tPath + "buttons.save");
    };
    return (
      <div className="flex items-center gap-4 self-end">
        <button className="rounded text-sm py-2 px-5 text-general font-semibold border-2">
          {t(tPath + "buttons.back")}
        </button>
        <button onClick={handleOpenSaveConfirmModal} className={greenButton}>
          {renderButtonLoader()}
        </button>
      </div>
    );
  };

  const renderFoodItemsModel: ReactElementType = () => {
    if (showFoodItemsModal) {
      return (
        <FoodItemsModal
          addFoodItem={addFoodItem}
          currentMealTab={currentMealTab}
          setShowFoodItemsModal={setShowFoodItemsModal}
        />
      );
    }
    return <></>;
  };

  const renderMealTabsAndDate: ReactElementType = () => {
    return (
      <div className="flex justify-between items-center">
        <MealTabs
          handleTabChange={handleTabChange}
          currentMealTab={currentMealTab}
        />
        <MealDate currentDate={currentDate} setCurrentDate={setCurrentDate} />
      </div>
    );
  };

  const renderHeader: ReactElementType = () => {
    return <h1 className={header}>{t(tPath + "header")}</h1>;
  };

  return (
    <div className="flex flex-col border-[1px] rounded-md mt-4 py-10 px-20">
      {renderHeader()}
      {renderMealTabsAndDate()}
      {renderMealItems()}
      {renderButtons()}
      {renderFoodItemsModel()}
      {renderDeleteConfirmModal()}
      {renderSaveConfirmModal()}
    </div>
  );
};

export default observer(ScheduleMeal);
