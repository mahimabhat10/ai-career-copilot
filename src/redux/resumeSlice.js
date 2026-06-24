import { createSlice } from "@reduxjs/toolkit";

const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    resumeText: "",
    atsScore: 0,
    aiReview: "",
  },
  reducers: {
    setResumeData: (state, action) => {
      state.resumeText = action.payload.resumeText;
      state.atsScore = action.payload.atsScore;
      state.aiReview = action.payload.aiReview;
    },
  },
});

export const { setResumeData } =
  resumeSlice.actions;

export default resumeSlice.reducer;