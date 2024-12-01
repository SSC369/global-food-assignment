import { observer } from "mobx-react";

import { MealTypeEnum, ReviewTypes } from "../../types";
import MealTabs from "../mealTabs/MealTabs";
import MealDay from "../MealDay/MealDay";
import FoodQuantityInput from "./FoodQuantityInput";
import FoodWastageTable from "./FoodWastagetable";
import Button from "../commonComponents/Button";
import { foodPreparedStyle, foodWastedStyle, wastageCategory } from "./Styles";

interface FoodWastageLogType {
  currentMealTab: MealTypeEnum;
  handleTabChange: (mealType: MealTypeEnum) => void;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  mealWastageData: ReviewTypes;
  handelFoodPrepared: (value: number | string) => void;
  handelFoodWasted: (value: number | string) => void;
}

const FoodWastageLog: React.FC<FoodWastageLogType> = (props) => {
  const {
    currentMealTab,
    handleTabChange,
    currentDate,
    setCurrentDate,
    mealWastageData,
    handelFoodPrepared,
    handelFoodWasted,
  } = props;

  const renderHeaderSection = () => {
    return (
      <div className="flex flex-row justify-between">
        <MealTabs
          currentMealTab={currentMealTab}
          handleTabChange={handleTabChange}
        />
        <MealDay currentDate={currentDate} setCurrentDate={setCurrentDate} />
      </div>
    );
  };

  const renderTotalMealWastageAndPrepared = () => {
    return (
      <ul className="flex flex-col gap-7 mt-10">
        <li className={wastageCategory}>
          <p className={foodPreparedStyle}>Food Prepared</p>
          <FoodQuantityInput
            quantity={mealWastageData[currentMealTab]!.totalFoodPrepared}
            onChange={handelFoodPrepared}
          />
        </li>
        <li className={wastageCategory}>
          <p className={foodWastedStyle}>Food Wasted</p>
          <FoodQuantityInput
            quantity={mealWastageData[currentMealTab]!.totalFoodWasted}
            onChange={handelFoodWasted}
          />
        </li>
        <hr className="border-grey-200 border-t-2" />
      </ul>
    );
  };

  const renderButtonSection = () => {
    return (
      <p className="flex flex-row gap-4 justify-end align-bottom">
        <Button outline>Back</Button>
        <Button filled color="bg-blue-500" hoverColor="hover:bg-blue-700">
          Submit
        </Button>
      </p>
    );
  };

  const renderMealOrEmptyMsg = () => {
    if (!mealWastageData) {
      return (
        <h1 className="text-center mt-40 text-2xl text-black font-bold">
          No Meals
        </h1>
      );
    }
    return (
      <>
        {renderTotalMealWastageAndPrepared()}
        <FoodWastageTable mealData={mealWastageData[currentMealTab]!.items} />
        {renderButtonSection()}
      </>
    );
  };

  return (
    <div className="w-[920px] h-[650px] bg-white shadow-lg p-10">
      {renderHeaderSection()}
      {renderMealOrEmptyMsg()}
    </div>
  );
};
export default observer(FoodWastageLog);