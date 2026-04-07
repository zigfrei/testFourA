import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type TariffsUiState = {
  discountExpired: boolean;
  selectedTariffId: string | null;
};

const initialState: TariffsUiState = {
  discountExpired: false,
  selectedTariffId: null,
};

const tariffsUiSlice = createSlice({
  name: 'tariffsUi',
  initialState,
  reducers: {
    setDiscountExpired: (state, action: PayloadAction<boolean>) => {
      state.discountExpired = action.payload;
    },
    setSelectedTariffId: (state, action: PayloadAction<string | null>) => {
      state.selectedTariffId = action.payload;
    },
  },
});

export const { setDiscountExpired, setSelectedTariffId } = tariffsUiSlice.actions;

export default tariffsUiSlice.reducer;
