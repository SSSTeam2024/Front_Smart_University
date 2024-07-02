import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

import LayoutReducer from "../slices/layouts/reducer";
// Authentication
import ForgetPasswordReducer from "../slices/auth/forgetpwd/reducer";
import ProfileReducer from "../slices/auth/profile/reducer";
import DashboardReducer from "../slices/dashboard/reducer";
import authSlice from "features/authSlice";
import { etatPersonnelSlice } from "features/etatPersonnel/etatPersonnelSlice";
import { accountSlice } from "features/accountSlice";
import { postePersonnelSlice } from "features/postePersonnel/postePersonnel";
import { categoriePersonnelSlice } from "features/categoriePersonnel/categoriePersonnel";
import { gradePersonnelSlice } from "features/gradePersonnel/gradePersonnel";
import { etatEnseignantSlice } from "features/etatEnseignant/etatEnseignant";
import { posteEnseignantSlice } from "features/posteEnseignant/posteEnseignant";
import { gradeEnseignantSlice } from "features/gradeEnseignant/gradeEnseignant";
import { specialiteEnseignantSlice } from "features/specialiteEnseignant/specialiteEnseignant";
import { servicePersonnelSlice } from "features/servicePersonnel/servicePersonnel";
import { etatEtudiantSlice } from "features/etatEtudiants/etatEtudiant";
import { typeInscriptionEtudiantSlice } from "features/typeInscriptionEtudiant/typeInscriptionEtudiant";
import { matiereSlice } from "features/matiere/matiere";
import { niveauSlice } from "features/niveau/niveau";
import { departementSlice } from "features/departement/departement";
import { salleSlice } from "features/salles/salles";
import { sectionSlice } from "features/section/section";
import { classeSlice } from "features/classe/classe";



export const store = configureStore({
  reducer: {
    [etatPersonnelSlice.reducerPath]: etatPersonnelSlice.reducer,
    [etatEtudiantSlice.reducerPath]: etatEtudiantSlice.reducer,
    [typeInscriptionEtudiantSlice.reducerPath]: typeInscriptionEtudiantSlice.reducer,
    [accountSlice.reducerPath]: accountSlice.reducer,
    [postePersonnelSlice.reducerPath]: postePersonnelSlice.reducer,
    [categoriePersonnelSlice.reducerPath]: categoriePersonnelSlice.reducer,
    [gradePersonnelSlice.reducerPath]: gradePersonnelSlice.reducer,
    [servicePersonnelSlice.reducerPath]: servicePersonnelSlice.reducer,
    [etatEnseignantSlice.reducerPath]: etatEnseignantSlice.reducer,
    [posteEnseignantSlice.reducerPath]: posteEnseignantSlice.reducer,
    [gradeEnseignantSlice.reducerPath]: gradeEnseignantSlice.reducer,
    [specialiteEnseignantSlice.reducerPath]: specialiteEnseignantSlice.reducer,
    [matiereSlice.reducerPath]: matiereSlice.reducer,
    [niveauSlice.reducerPath]: niveauSlice.reducer,
    [departementSlice.reducerPath]: departementSlice.reducer,
    [salleSlice.reducerPath]: salleSlice.reducer,
    [sectionSlice.reducerPath]: sectionSlice.reducer,
    [classeSlice.reducerPath]: classeSlice.reducer,

    auth: authSlice,
    Layout: LayoutReducer,
    ForgetPassword: ForgetPasswordReducer,
    Profile: ProfileReducer,
    Dashboard: DashboardReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      etatPersonnelSlice.middleware,
      accountSlice.middleware,
      postePersonnelSlice.middleware,
      categoriePersonnelSlice.middleware,
      gradePersonnelSlice.middleware,
      etatEnseignantSlice.middleware,
      posteEnseignantSlice.middleware,
      gradeEnseignantSlice.middleware,
      specialiteEnseignantSlice.middleware,
      servicePersonnelSlice.middleware,
      etatEtudiantSlice.middleware,
      typeInscriptionEtudiantSlice.middleware,
      matiereSlice.middleware,
      niveauSlice.middleware,
      departementSlice.middleware,
      salleSlice.middleware,
      sectionSlice.middleware,
      classeSlice.middleware
    ]);
  },
});
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
