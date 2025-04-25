import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserFormState {
  email: string;
  accBalance: number;
  password: string;
  username: string;
  name: string;
  phone: string;
  addressLine: string;
  postCode: string;
  city: string;
  DOB: string;
  country: string;
  passcode: string;
  profileImageUri: string | null;
}

const initialState: UserFormState = {
  email: '',
  accBalance: 30000,
  password: '',
  username: '',
  name: '',
  phone: '',
  addressLine: '',
  postCode: '',
  city: '',
  DOB: '',
  country: '',
  passcode: '',
  profileImageUri: null,
};

const userFormSlice = createSlice({
  name: 'userForm',
  initialState,
  reducers: {
    updateUserForm: (state, action: PayloadAction<Partial<UserFormState>>) => {
      return { ...state, ...action.payload };
    },
    resetUserForm: () => initialState,
  },
});

export const { updateUserForm, resetUserForm } = userFormSlice.actions;
export default userFormSlice.reducer;
