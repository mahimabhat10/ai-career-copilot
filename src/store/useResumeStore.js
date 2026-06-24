import { create } from "zustand";

const useResumeStore = create((set) => ({
  atsScore: 0,
  aiReview: "",

  setResumeData: (data) =>
    set({
      atsScore: data.atsScore,
      aiReview: data.aiReview,
    }),
}));

export default useResumeStore;