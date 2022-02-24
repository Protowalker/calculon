import { configureStore } from "@reduxjs/toolkit";
import { calcNameReducer } from "./CalculatorInfo";
import { editModeReducer } from "./EditMode";
import { inputsReducer } from "./Inputs";
import { outputsReducer } from "./Outputs";

export const store = configureStore({
  reducer: {
    inputs: inputsReducer,
    outputs: outputsReducer,
    editMode: editModeReducer,
    calcName: calcNameReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type StoreType = typeof store;
