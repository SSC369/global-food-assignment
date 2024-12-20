import { MealTypeEnum } from "./types";

export const PORTAL_RENDER_ID = "modal";
export const ERROR_ICON = "ErrorIcon.png";
export const USERNAME_INITIAL_VALUE = "";
export const PASSWORD_INITIAL_VALUE = "";
export const USERNAME = "username";
export const PASSWORD = "password";
export const USERNAME_LABEL = "USER NAME";
export const PASSWORD_LABEL = "PASSWORD";
export const USERNAME_ID = "text";
export const GLOBAL_LOGO_URL = "GlobalLogo.png";
export const GLOBAL_LOGO_ALT = "LOGO";
export const FOOD_URL = "foodPreparing.png";
export const DATE_FORMAT = "DD MMM, YYYY";

export const LOGIN_METHOD = "POST";
export const INVALID_USERNAME_RESPONSE = "INVALID_USERNAME";
export const INVALID_PASSWORD_RESPONSE = "INVALID_PASSWORD";
export const USERNAME_KEY = "username";
export const ACCESS_TOKEN = "accessToken";
export const ADMIN_TOKEN = "admin";
export const USER_TOKEN = "userId";

export const DINNER_TIME = "20:00 - 22:00";
export const LUNCH_TIME = "12:00 - 14:00";
export const BREAKFAST_TIME = "08:00 - 10:00";

export const MEAL_TYPES: MealTypeEnum[] = [
  MealTypeEnum.BREAKFAST,
  MealTypeEnum.LUNCH,
  MealTypeEnum.DINNER,
];

export const MEAL_DAY_KEY_FORMAT = "DD/MM/YYYY";
export const BACKEND_URL = "https://hardkpentium.loca.lt/";
export const USER_ACCESS_TOKEN = "23b73e81-aa67-40e1-9b33-9564d3e64a77";
export const GRAPHQL_URL = BACKEND_URL + "graphql";
export const LOGIN_URL = BACKEND_URL + "api/meals/login/";
export const LOGOUT_URL = BACKEND_URL + "api/meals/logout/";
export const TOASTER_POSITION = "top-center";
export const FOOD_ITEMS_OFFSET = 0;
export const FOOD_ITEMS_LIMIT = 10;
export const LANGUAGES = [
  { value: "en", name: "English" },
  { value: "te", name: "తెలుగు" },
  { value: "hi", name: "हिंदी" },
];

export const QUERY_NOT_EXIST_ERROR = "Meal matching query does not exist.";
