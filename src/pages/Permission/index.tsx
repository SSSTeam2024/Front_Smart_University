import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Container, Card, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
interface CheckState {
  [key: string]: boolean;
}

const Permissions = () => {
  document.title = "Permissions | Smart University";
  const [checkedState, setCheckedState] = useState({
    scolarite: false,
    personnel: false,
    enseignant: false,
    departement: false,
    examen: false,
    stage: false,
    bureau: false,
    suivi: false,
  });

  const handleCheckAll = () => {
    console.log("Check All button clicked");
    setCheckedState((prevState) => {
      console.log("Previous State:", prevState);
      const newState = {
        scolarite: true,
        personnel: true,
        enseignant: true,
        departement: true,
        examen: true,
        stage: true,
        bureau: true,
        suivi: true,
      };
      console.log("New State:", newState);
      return newState;
    });
  };
  // avis etudiant
  const [checkState, setCheckState] = useState({
    ajouterEtudiant: false,
    etudiantParClasse: false,
    inscriptionEtudiants: false,
    filtrageEtudiants: false,
  });

  const handleMasterChange = (e: any) => {
    const checked = e.target.checked;
    setCheckState({
      ajouterEtudiant: checked,
      etudiantParClasse: checked,
      inscriptionEtudiants: checked,
      filtrageEtudiants: checked,
    });
  };

  const handleCheckboxChange = (e: any) => {
    const { id, checked } = e.target;
    setCheckState((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };
  // avis enseignant

  const [checkState1, setCheckState1] = useState({
    ajouterAvisEnseignant: false,
    listerAvisEnseignant: false,
    visualiserAvisEnseignant: false,
    modifierAvisEnseignant: false,
  });

  const handleMasterChange1 = (e: any) => {
    const checked = e.target.checked;
    setCheckState1({
      ajouterAvisEnseignant: checked,
      listerAvisEnseignant: checked,
      visualiserAvisEnseignant: checked,
      modifierAvisEnseignant: checked,
    });
  };

  const handleCheckboxChange1 = (e: any) => {
    const { id, checked } = e.target;
    setCheckState1((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // avis personnels

  const [checkState2, setCheckState2] = useState({
    ajouterAvisPersonnel: false,
    listerAvisPersonnel: false,
    visualiserAvisPersonnel: false,
    modifierAvisPersonnel: false,
  });

  const handleMasterChange2 = (e: any) => {
    const checked = e.target.checked;
    setCheckState2({
      ajouterAvisPersonnel: checked,
      listerAvisPersonnel: checked,
      visualiserAvisPersonnel: checked,
      modifierAvisPersonnel: checked,
    });
  };

  const handleCheckboxChange2 = (e: any) => {
    const { id, checked } = e.target;
    setCheckState2((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // demande etudiant
  const [checkStateDemandeEtudiant, setCheckStateDemandeEtudiant] = useState({
    ajouterDemandeEtudiant: false,
    listerDemandeEudiant: false,
    visualiserDemandeEtudiant: false,
    modifierDemandeEtudiant: false,
  });

  const handleMasterChangeDemandeEtudiant = (e: any) => {
    const checked = e.target.checked;
    setCheckStateDemandeEtudiant({
      ajouterDemandeEtudiant: checked,
      listerDemandeEudiant: checked,
      visualiserDemandeEtudiant: checked,
      modifierDemandeEtudiant: checked,
    });
  };

  const handleCheckboxChangeDemandeEtudiant = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateDemandeEtudiant((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };
  // demande enseignant

  const [checkStateDemandeEnseignant, setCheckStateDemandeEnseignant] =
    useState({
      ajouterDemandeEnseignant: false,
      listerDemandeEnseignant: false,
      visualiserDemandeEnseignant: false,
      modifierDemandeEnseignant: false,
    });

  const handleMasterChangeDemandeEnseignant = (e: any) => {
    const checked = e.target.checked;
    setCheckStateDemandeEnseignant({
      ajouterDemandeEnseignant: checked,
      listerDemandeEnseignant: checked,
      visualiserDemandeEnseignant: checked,
      modifierDemandeEnseignant: checked,
    });
  };

  const handleCheckboxChangeDemandeEnseignant = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateDemandeEnseignant((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // demande personnels

  const [checkStateDemandePersonnel, setCheckStateDemandePersonnel] = useState({
    ajouterDemandePersonnel: false,
    listerDemandePersonnel: false,
    visualiserDemandePersonnel: false,
    modifierDemandePersonnel: false,
  });

  const handleMasterChangeDemandePersonnel = (e: any) => {
    const checked = e.target.checked;
    setCheckStateDemandePersonnel({
      ajouterDemandePersonnel: checked,
      listerDemandePersonnel: checked,
      visualiserDemandePersonnel: checked,
      modifierDemandePersonnel: checked,
    });
  };

  const handleCheckboxChangeDemandePersonnel = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateDemandePersonnel((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // reclamation etudiant
  const [checkStateReclamationEtudiant, setCheckStateReclamationEtudiant] =
    useState({
      ajouterReclamationEtudiant: false,
      listerReclamationEudiant: false,
      visualiserReclamationEtudiant: false,
      modifierReclamationEtudiant: false,
    });

  const handleMasterChangeReclamationEtudiant = (e: any) => {
    const checked = e.target.checked;
    setCheckStateReclamationEtudiant({
      ajouterReclamationEtudiant: checked,
      listerReclamationEudiant: checked,
      visualiserReclamationEtudiant: checked,
      modifierReclamationEtudiant: checked,
    });
  };

  const handleCheckboxChangeReclamationEtudiant = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateReclamationEtudiant((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };
  // reclamation enseignant

  const [checkStateReclamationEnseignant, setCheckStateReclamationEnseignant] =
    useState({
      ajouterReclamationEnseignant: false,
      listerReclamationEnseignant: false,
      visualiserReclamationEnseignant: false,
      modifierReclamationEnseignant: false,
    });

  const handleMasterChangeReclamationEnseignant = (e: any) => {
    const checked = e.target.checked;
    setCheckStateReclamationEnseignant({
      ajouterReclamationEnseignant: checked,
      listerReclamationEnseignant: checked,
      visualiserReclamationEnseignant: checked,
      modifierReclamationEnseignant: checked,
    });
  };

  const handleCheckboxChangeReclamationEnseignant = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateReclamationEnseignant((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // reclamation personnels

  const [checkStateReclamationPersonnel, setCheckStateReclamationPersonnel] =
    useState({
      ajouterReclamationPersonnel: false,
      listerReclamationPersonnel: false,
      visualiserReclamationPersonnel: false,
      modifierReclamationPersonnel: false,
    });

  const handleMasterChangeReclamationPersonnel = (e: any) => {
    const checked = e.target.checked;
    setCheckStateReclamationPersonnel({
      ajouterReclamationPersonnel: checked,
      listerReclamationPersonnel: checked,
      visualiserReclamationPersonnel: checked,
      modifierReclamationPersonnel: checked,
    });
  };

  const handleCheckboxChangeReclamationPersonnel = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateReclamationPersonnel((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // actualite
  const [checkState3, setCheckState3] = useState({
    AjouterActualite: false,
    listerActualite: false,
    visualiserActualite: false,
    modifierActualite: false,
  });

  const handleMasterChange3 = (e: any) => {
    const checked = e.target.checked;
    setCheckState3({
      AjouterActualite: checked,
      listerActualite: checked,
      visualiserActualite: checked,
      modifierActualite: checked,
    });
  };

  const handleCheckboxChange3 = (e: any) => {
    const { id, checked } = e.target;
    setCheckState3((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };
  // espace de téléchargement
  const [checkStateEspaceTelechargement, setCheckStateEspaceTelechargement] =
    useState({
      AjouterEspaceTelechargement: false,
      listerEspaceTelechargement: false,
      visualiserEspaceTelechargement: false,
      modifierEspaceTelechargement: false,
    });

  const handleMasterChangeEspaceTelechargement = (e: any) => {
    const checked = e.target.checked;
    setCheckStateEspaceTelechargement({
      AjouterEspaceTelechargement: checked,
      listerEspaceTelechargement: checked,
      visualiserEspaceTelechargement: checked,
      modifierEspaceTelechargement: checked,
    });
  };

  const handleCheckboxChangeEspaceTelechargement = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateEspaceTelechargement((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // gestion de bibliotheque
  const [checkStateBibliotheque, setCheckStateBibliotheque] = useState({
    AjouterBibliotheque: false,
    listerBibliotheque: false,
    visualiserBibliotheque: false,
    modifierBibliotheque: false,
  });

  const handleMasterChangeBibliotheque = (e: any) => {
    const checked = e.target.checked;
    setCheckStateBibliotheque({
      AjouterBibliotheque: checked,
      listerBibliotheque: checked,
      visualiserBibliotheque: checked,
      modifierBibliotheque: checked,
    });
  };

  const handleCheckboxChangeBibliotheque = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateBibliotheque((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };
  // gestion des admins
  const [checkStateAdmin, setCheckStateAdmin] = useState({
    AjouterAdmin: false,
    listerAdmin: false,
    visualiserAdmin: false,
    modifierAdmin: false,
  });

  const handleMasterChangeAdmin = (e: any) => {
    const checked = e.target.checked;
    setCheckStateAdmin({
      AjouterAdmin: checked,
      listerAdmin: checked,
      visualiserAdmin: checked,
      modifierAdmin: checked,
    });
  };

  const handleCheckboxChangeAdmin = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateAdmin((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // gestion des Variable Globales
  const [checkStateVariableGlobales, setCheckStateVariableGlobales] = useState({
    listerVariableGlobales: false,
    modifierVariableGlobales: false,
  });

  const handleMasterChangeVariableGlobales = (e: any) => {
    const checked = e.target.checked;
    setCheckStateVariableGlobales({
      listerVariableGlobales: checked,
      modifierVariableGlobales: checked,
    });
  };

  const handleCheckboxChangeVariableGlobales = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateVariableGlobales((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };
  // vie estudiantine
  const [checkStateVieEstudiantine, setCheckStateVieEstudiantine] = useState({
    AjouterCategorie: false,
    listerCategories: false,
    ajouterLocalisation: false,
    listerLocalisation: false,
    visualiserLocalisation: false,
  });

  const handleMasterChangeVieEstudiantine = (e: any) => {
    const checked = e.target.checked;
    setCheckStateVieEstudiantine({
      AjouterCategorie: checked,
      listerCategories: checked,
      ajouterLocalisation: checked,
      listerLocalisation: checked,
      visualiserLocalisation: checked,
    });
  };

  const handleCheckboxChangeVieEstudiantine = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateVieEstudiantine((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // evenements
  const [checkState4, setCheckState4] = useState({
    AjouterEvenement: false,
    listerEvenement: false,
    visualiserEvenement: false,
    modifierEvenement: false,
  });

  const handleMasterChange4 = (e: any) => {
    const checked = e.target.checked;
    setCheckState4({
      AjouterEvenement: checked,
      listerEvenement: checked,
      visualiserEvenement: checked,
      modifierEvenement: checked,
    });
  };

  const handleCheckboxChange4 = (e: any) => {
    const { id, checked } = e.target;
    setCheckState4((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // gestion des abcences des etudiants

  const [checkStateAbscenceEtudiant, setCheckStateAbscenceEtudiant] = useState({
    listerAbcenceEtudiant: false,
    justifierAbcenceEtudiant: false,
    listerElimine: false,
  });

  const handleMasterChangeAbcenceEtudiant = (e: any) => {
    const checked = e.target.checked;
    setCheckStateAbscenceEtudiant({
      listerAbcenceEtudiant: checked,
      justifierAbcenceEtudiant: checked,
      listerElimine: checked,
    });
  };

  const handleCheckboxChangeAbcenceEtudiant = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateAbscenceEtudiant((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // gestion des PointageEnseignant

  const [checkStatePointageEnseignant, setCheckStatePointageEnseignant] =
    useState({
      saisirPointage: false,
      listerEnseignantPresents: false,
    });

  const handleMasterChangePointageEnseignant = (e: any) => {
    const checked = e.target.checked;
    setCheckStatePointageEnseignant({
      saisirPointage: checked,
      listerEnseignantPresents: checked,
    });
  };

  const handleCheckboxChangePointageEnseignant = (e: any) => {
    const { id, checked } = e.target;
    setCheckStatePointageEnseignant((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // gestion des Presence personnel

  const [checkStatePresencePersonnel, setCheckStatePresencePersonnel] =
    useState({
      saisirPointagePersonnel: false,
      listerPersonnelPresents: false,
    });

  const handleMasterChangePresencePersonnel = (e: any) => {
    const checked = e.target.checked;
    setCheckStatePresencePersonnel({
      saisirPointagePersonnel: checked,
      listerPersonnelPresents: checked,
    });
  };

  const handleCheckboxChangePresencePersonnel = (e: any) => {
    const { id, checked } = e.target;
    setCheckStatePresencePersonnel((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const [checkStateAbsencePersonnel, setCheckStateAbsencePersonnel] = useState({
    saisirAbsencePersonnel: false,
    listerPersonnelAbsents: false,
  });

  const handleMasterChangeAbsencePersonnel = (e: any) => {
    const checked = e.target.checked;
    setCheckStateAbsencePersonnel({
      saisirAbsencePersonnel: checked,
      listerPersonnelAbsents: checked,
    });
  };

  const handleCheckboxChangeAbsencePersonnel = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateAbsencePersonnel((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // gestion des absence enseignant

  const [checkStateAbsenceEnseignant, setCheckStateAbsenceEnseignant] =
    useState({
      saisirAbsence: false,
      listerEnseignantAbsents: false,
    });

  const handleMasterChangeAbsenceEnseignant = (e: any) => {
    const checked = e.target.checked;
    setCheckStateAbsenceEnseignant({
      saisirAbsence: checked,
      listerEnseignantAbsents: checked,
    });
  };

  const handleCheckboxChangeAbsenceEnseignant = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateAbsenceEnseignant((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // gestion des pointage enseignant

  const [
    checkStateGestionPointageEnseignant,
    setCheckStateGestionPointageEnseignant,
  ] = useState({
    ListerGestionPointageEnseignant: false,
    AjouterGestionPointageEnseignant: false,
  });

  const handleMasterChangeGestionPointageEnseignant = (e: any) => {
    const checked = e.target.checked;
    setCheckStateGestionPointageEnseignant({
      ListerGestionPointageEnseignant: checked,
      AjouterGestionPointageEnseignant: checked,
    });
  };

  const handleCheckboxChangeGestionPointageEnseignant = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateGestionPointageEnseignant((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // compte etudiant

  const [checkStateEtudiant, setCheckStateEtudiant] = useState({
    AjouterCompteEtudiant: false,
    listerCompteEtudiant: false,
    visualiserCompteEtudiant: false,
    modifierCompteEtudiant: false,
  });

  const handleMasterChangeEtudiant = (e: any) => {
    const checked = e.target.checked;
    setCheckStateEtudiant({
      AjouterCompteEtudiant: checked,
      listerCompteEtudiant: checked,
      visualiserCompteEtudiant: checked,
      modifierCompteEtudiant: checked,
    });
  };

  const handleCheckboxChangeEtudiant = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateEtudiant((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };
  // compte enseignant

  const [checkStateEnseignant, setCheckStateEnseignant] = useState({
    AjouterCompteEnseignant: false,
    listerCompteEnseignant: false,
    visualiserCompteEnseignant: false,
    modifierCompteEnseignant: false,
  });

  const handleMasterChangeEnseignant = (e: any) => {
    const checked = e.target.checked;
    setCheckStateEnseignant({
      AjouterCompteEnseignant: checked,
      listerCompteEnseignant: checked,
      visualiserCompteEnseignant: checked,
      modifierCompteEnseignant: checked,
    });
  };

  const handleCheckboxChangeEnseignant = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateEnseignant((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };
  // compte personnel

  const [checkStatePersonnel, setCheckStatePersonnel] = useState({
    AjouterComptePersonnel: false,
    listerComptePersonnel: false,
    visualiserComptePersonnel: false,
    modifierComptePersonnel: false,
  });

  const handleMasterChangePersonnel = (e: any) => {
    const checked = e.target.checked;
    setCheckStatePersonnel({
      AjouterComptePersonnel: checked,
      listerComptePersonnel: checked,
      visualiserComptePersonnel: checked,
      modifierComptePersonnel: checked,
    });
  };

  const handleCheckboxChangePersonnel = (e: any) => {
    const { id, checked } = e.target;
    setCheckStatePersonnel((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // Parametres: Etat Etudiant
  const [checkStateEtatEtudiant, setCheckStateEtatEtudiant] = useState({
    AjouterEtatEtudiant: false,
    listerEtatEtudiant: false,
    visualiserEtatEtudiant: false,
    modifierEtatEtudiant: false,
  });

  const handleMasterChangeEtat = (e: any) => {
    const checked = e.target.checked;
    setCheckStateEtatEtudiant({
      AjouterEtatEtudiant: checked,
      listerEtatEtudiant: checked,
      visualiserEtatEtudiant: checked,
      modifierEtatEtudiant: checked,
    });
  };

  const handleCheckboxChangeEtatEtudiant = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateEtatEtudiant((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const allChecked =
    checkStateEtatEtudiant.AjouterEtatEtudiant &&
    checkStateEtatEtudiant.listerEtatEtudiant &&
    checkStateEtatEtudiant.visualiserEtatEtudiant &&
    checkStateEtatEtudiant.modifierEtatEtudiant;

  // parametres : inscription etudiant

  const [checkStateInscriptionEtudiant, setCheckStateInscriptionEtudiant] =
    useState({
      AjouterInscriptionEtudiant: false,
      listerInscriptionEtudiant: false,
      visualiserInscriptionEtudiant: false,
      modifierInscriptionEtudiant: false,
    });

  const handleMasterChangeInscriptionEtudiants = (e: any) => {
    const checked = e.target.checked;
    setCheckStateInscriptionEtudiant({
      AjouterInscriptionEtudiant: checked,
      listerInscriptionEtudiant: checked,
      visualiserInscriptionEtudiant: checked,
      modifierInscriptionEtudiant: checked,
    });
  };

  const handleCheckboxChangeInscriptionEtudiant = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateInscriptionEtudiant((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const allCheckedInscription =
    checkStateInscriptionEtudiant.AjouterInscriptionEtudiant &&
    checkStateInscriptionEtudiant.listerInscriptionEtudiant &&
    checkStateInscriptionEtudiant.visualiserInscriptionEtudiant &&
    checkStateInscriptionEtudiant.modifierInscriptionEtudiant;

  const handleMasterChangeComptesEtudiants = (e: any) => {
    const checked = e.target.checked;
    handleMasterChangeEtat({ target: { checked } });
    handleMasterChangeInscriptionEtudiants({ target: { checked } });
  };
  // parametre enseignant:etat enseignant

  const [checkStateEtatEnseignant, setCheckStateEtatEnseignant] = useState({
    AjouterEtatEnseignant: false,
    listerEtatEnseignant: false,
    visualiserEtatEnseignant: false,
    modifierEtatEnseignant: false,
  });

  const handleMasterChangeEtatEnseignant = (e: any) => {
    const checked = e.target.checked;
    setCheckStateEtatEnseignant({
      AjouterEtatEnseignant: checked,
      listerEtatEnseignant: checked,
      visualiserEtatEnseignant: checked,
      modifierEtatEnseignant: checked,
    });
  };

  const handleCheckboxChangeEtatEnseignant = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateEtatEnseignant((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const allCheckedEtatEnseignant =
    checkStateEtatEnseignant.AjouterEtatEnseignant &&
    checkStateEtatEnseignant.listerEtatEnseignant &&
    checkStateEtatEnseignant.visualiserEtatEnseignant &&
    checkStateEtatEnseignant.modifierEtatEnseignant;

  // parametres : grade enseignant

  const [checkStateGradeEnseignant, setCheckStateGradeEnseignant] = useState({
    AjouterGradeEnseignant: false,
    listerGradeEnseignant: false,
    visualiserGradeEnseignant: false,
    modifierGradeEnseignant: false,
  });

  const handleMasterChangeGradeEnseignants = (e: any) => {
    const checked = e.target.checked;
    setCheckStateGradeEnseignant({
      AjouterGradeEnseignant: checked,
      listerGradeEnseignant: checked,
      visualiserGradeEnseignant: checked,
      modifierGradeEnseignant: checked,
    });
  };

  const handleCheckboxChangeGradeEnseignant = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateGradeEnseignant((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const allCheckedGradeEnseignant =
    checkStateGradeEnseignant.AjouterGradeEnseignant &&
    checkStateGradeEnseignant.listerGradeEnseignant &&
    checkStateGradeEnseignant.visualiserGradeEnseignant &&
    checkStateGradeEnseignant.modifierGradeEnseignant;
  // Poste enseignant

  const [checkStatePosteEnseignant, setCheckStatePosteEnseignant] = useState({
    AjouterPosteEnseignant: false,
    listerPosteEnseignant: false,
    visualiserPosteEnseignant: false,
    modifierPosteEnseignant: false,
  });

  const handleMasterChangePosteEnseignants = (e: any) => {
    const checked = e.target.checked;
    setCheckStatePosteEnseignant({
      AjouterPosteEnseignant: checked,
      listerPosteEnseignant: checked,
      visualiserPosteEnseignant: checked,
      modifierPosteEnseignant: checked,
    });
  };

  const handleCheckboxChangePosteEnseignant = (e: any) => {
    const { id, checked } = e.target;
    setCheckStatePosteEnseignant((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const allCheckedPosteEnseignant =
    checkStatePosteEnseignant.AjouterPosteEnseignant &&
    checkStatePosteEnseignant.listerPosteEnseignant &&
    checkStatePosteEnseignant.visualiserPosteEnseignant &&
    checkStatePosteEnseignant.modifierPosteEnseignant;

  // Specialite
  const [checkStateSpecialiteEnseignant, setCheckStateSpecialiteEnseignant] =
    useState({
      AjouterSpecialiteEnseignant: false,
      listerSpecialiteEnseignant: false,
      visualiserSpecialiteEnseignant: false,
      modifierSpecialiteEnseignant: false,
    });

  const handleMasterChangeSpecialiteEnseignants = (e: any) => {
    const checked = e.target.checked;
    setCheckStateSpecialiteEnseignant({
      AjouterSpecialiteEnseignant: checked,
      listerSpecialiteEnseignant: checked,
      visualiserSpecialiteEnseignant: checked,
      modifierSpecialiteEnseignant: checked,
    });
  };

  const handleCheckboxChangeSpecialiteEnseignant = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateSpecialiteEnseignant((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const allCheckedSpecialiteEnseignant =
    checkStateSpecialiteEnseignant.AjouterSpecialiteEnseignant &&
    checkStateSpecialiteEnseignant.listerSpecialiteEnseignant &&
    checkStateSpecialiteEnseignant.visualiserSpecialiteEnseignant &&
    checkStateSpecialiteEnseignant.modifierSpecialiteEnseignant;

  const handleMasterChangeComptesEnseignants = (e: any) => {
    const checked = e.target.checked;
    handleMasterChangeEtatEnseignant({ target: { checked } });
    handleMasterChangeGradeEnseignants({ target: { checked } });
    handleMasterChangePosteEnseignants({ target: { checked } });
    handleMasterChangeSpecialiteEnseignants({ target: { checked } });
  };

  //compte personnel : etat personnel

  const [checkStateEtatPersonnel, setCheckStateEtatPersonnel] = useState({
    AjouterEtatPersonnel: false,
    listerEtatPersonnel: false,
    visualiserEtatPersonnel: false,
    modifierEtatPersonnel: false,
  });

  const handleMasterChangeEtatPersonnel = (e: any) => {
    const checked = e.target.checked;
    setCheckStateEtatPersonnel({
      AjouterEtatPersonnel: checked,
      listerEtatPersonnel: checked,
      visualiserEtatPersonnel: checked,
      modifierEtatPersonnel: checked,
    });
  };

  const handleCheckboxChangeEtatPersonnel = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateEtatPersonnel((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const allCheckedEtatPersonnel =
    checkStateEtatPersonnel.AjouterEtatPersonnel &&
    checkStateEtatPersonnel.listerEtatPersonnel &&
    checkStateEtatPersonnel.visualiserEtatPersonnel &&
    checkStateEtatPersonnel.modifierEtatPersonnel;

  // parametres : grade personnel

  const [checkStateGradePersonnel, setCheckStateGradePersonnel] = useState({
    AjouterGradePersonnel: false,
    listerGradePersonnel: false,
    visualiserGradePersonnel: false,
    modifierGradePersonnel: false,
  });

  const handleMasterChangeGradePersonnels = (e: any) => {
    const checked = e.target.checked;
    setCheckStateGradePersonnel({
      AjouterGradePersonnel: checked,
      listerGradePersonnel: checked,
      visualiserGradePersonnel: checked,
      modifierGradePersonnel: checked,
    });
  };

  const handleCheckboxChangeGradePersonnel = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateGradePersonnel((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const allCheckedGradePersonnel =
    checkStateGradePersonnel.AjouterGradePersonnel &&
    checkStateGradePersonnel.listerGradePersonnel &&
    checkStateGradePersonnel.visualiserGradePersonnel &&
    checkStateGradePersonnel.modifierGradePersonnel;

  // Poste personnel

  const [checkStatePostePersonnel, setCheckStatePostePersonnel] = useState({
    AjouterPostePersonnel: false,
    listerPostePersonnel: false,
    visualiserPostePersonnel: false,
    modifierPostePersonnel: false,
  });

  const handleMasterChangePostePersonnels = (e: any) => {
    const checked = e.target.checked;
    setCheckStatePostePersonnel({
      AjouterPostePersonnel: checked,
      listerPostePersonnel: checked,
      visualiserPostePersonnel: checked,
      modifierPostePersonnel: checked,
    });
  };

  const handleCheckboxChangePostePersonnel = (e: any) => {
    const { id, checked } = e.target;
    setCheckStatePostePersonnel((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const allCheckedPostePersonnel =
    checkStatePostePersonnel.AjouterPostePersonnel &&
    checkStatePostePersonnel.listerPostePersonnel &&
    checkStatePostePersonnel.visualiserPostePersonnel &&
    checkStatePostePersonnel.modifierPostePersonnel;

  // Categorie
  const [checkStateCategoriePersonnel, setCheckStateCategoriePersonnel] =
    useState({
      AjouterCategoriePersonnel: false,
      listerCategoriePersonnel: false,
      visualiserCategoriePersonnel: false,
      modifierCategoriePersonnel: false,
    });

  const handleMasterChangeCategoriePersonnels = (e: any) => {
    const checked = e.target.checked;
    setCheckStateCategoriePersonnel({
      AjouterCategoriePersonnel: checked,
      listerCategoriePersonnel: checked,
      visualiserCategoriePersonnel: checked,
      modifierCategoriePersonnel: checked,
    });
  };

  const handleCheckboxChangeCategoriePersonnel = (e: any) => {
    const { id, checked } = e.target;
    setCheckStateCategoriePersonnel((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const allCheckedCategoriePersonnel =
    checkStateCategoriePersonnel.AjouterCategoriePersonnel &&
    checkStateCategoriePersonnel.listerCategoriePersonnel &&
    checkStateCategoriePersonnel.visualiserCategoriePersonnel &&
    checkStateCategoriePersonnel.modifierCategoriePersonnel;

  const handleMasterChangeComptesPersonnels = (e: any) => {
    const checked = e.target.checked;
    handleMasterChangeCategoriePersonnels({ target: { checked } });
    handleMasterChangePostePersonnels({ target: { checked } });
    handleMasterChangeGradePersonnels({ target: { checked } });
    handleMasterChangeEtatPersonnel({ target: { checked } });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="" pageTitle="Permissions" />
          <Col className="d-flex justify-content-end">
            <Button variant="info mb-3" style={{marginRight:"5px"}} onClick={handleCheckAll}>
              Check All
            </Button>
            <Form.Group controlId="searchUsers">
              <Form.Control
                type="text"
                placeholder="Rechercher un utilisateur"
              />
            </Form.Group>
          </Col>
          {/*Gestion Avis */}
          <Col lg={12}>
            <Card className="header">
              <h5 style={{ margin: "10px" }}><i className="ri-lightbulb-flash-line"></i> {" "} Gestions des Avis</h5>
            </Card>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterEtudiant"
                          onChange={handleMasterChange}
                          checked={
                            checkState.ajouterEtudiant &&
                            checkState.etudiantParClasse &&
                            checkState.inscriptionEtudiants &&
                            checkState.filtrageEtudiants
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Avis étudiants</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="ajouterEtudiant"
                        onChange={handleCheckboxChange}
                        checked={checkState.ajouterEtudiant}
                      />
                      <Form.Label htmlFor="ajouterEtudiant">
                        Ajouter un avis étudiant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="etudiantParClasse"
                        onChange={handleCheckboxChange}
                        checked={checkState.etudiantParClasse}
                      />
                      <Form.Label htmlFor="etudiantParClasse">
                        Lister les avis des étudiant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="inscriptionEtudiants"
                        onChange={handleCheckboxChange}
                        checked={checkState.inscriptionEtudiants}
                      />
                      <Form.Label htmlFor="inscriptionEtudiants">
                        Visualiser un avis étudiant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="filtrageEtudiants"
                        onChange={handleCheckboxChange}
                        checked={checkState.filtrageEtudiants}
                      />
                      <Form.Label htmlFor="filtrageEtudiants">
                        Modifier un avis étudiant
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterEnseignant"
                          onChange={handleMasterChange1}
                          checked={
                            checkState1.ajouterAvisEnseignant &&
                            checkState1.listerAvisEnseignant &&
                            checkState1.visualiserAvisEnseignant &&
                            checkState1.modifierAvisEnseignant
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Avis enseignants</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="ajouterAvisEnseignant"
                        onChange={handleCheckboxChange1}
                        checked={checkState1.ajouterAvisEnseignant}
                      />
                      <Form.Label htmlFor="ajouterAvisEnseignant">
                        Ajouter un avis enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerAvisEnseignant"
                        onChange={handleCheckboxChange1}
                        checked={checkState1.listerAvisEnseignant}
                      />
                      <Form.Label htmlFor="listerAvisEnseignant">
                        Lister les avis des enseignants
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserAvisEnseignant"
                        onChange={handleCheckboxChange1}
                        checked={checkState1.visualiserAvisEnseignant}
                      />
                      <Form.Label htmlFor="visualiserAvisEnseignant">
                        Visualiser un avis enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierAvisEnseignant"
                        onChange={handleCheckboxChange1}
                        checked={checkState1.modifierAvisEnseignant}
                      />
                      <Form.Label htmlFor="modifierAvisEnseignant">
                        Modifier un avis enseignant
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterPersonnel"
                          onChange={handleMasterChange2}
                          checked={
                            checkState2.ajouterAvisPersonnel &&
                            checkState2.listerAvisPersonnel &&
                            checkState2.visualiserAvisPersonnel &&
                            checkState2.modifierAvisPersonnel
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Avis personnels</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="ajouterAvisPersonnel"
                        onChange={handleCheckboxChange2}
                        checked={checkState2.ajouterAvisPersonnel}
                      />
                      <Form.Label htmlFor="ajouterAvisPersonnel">
                        Ajouter un avis personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerAvisPersonnel"
                        onChange={handleCheckboxChange2}
                        checked={checkState2.listerAvisPersonnel}
                      />
                      <Form.Label htmlFor="listerAvisPersonnel">
                        Lister les avis des personnels
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserAvisPersonnel"
                        onChange={handleCheckboxChange2}
                        checked={checkState2.visualiserAvisPersonnel}
                      />
                      <Form.Label htmlFor="visualiserAvisPersonnel">
                        Visualiser un avis personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierAvisPersonnel"
                        onChange={handleCheckboxChange2}
                        checked={checkState2.modifierAvisPersonnel}
                      />
                      <Form.Label htmlFor="modifierAvisPersonnel">
                        Modifier un avis personnel
                      </Form.Label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          {/*Gestion Demandes */}
          <Col lg={12}>
            <Card className="header">
              <h5 style={{ margin: "10px" }}><i className="ri-file-list-3-line"></i> {" "} Gestions des Demandes</h5>
            </Card>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterDemandeEtudiant"
                          onChange={handleMasterChangeDemandeEtudiant}
                          checked={
                            checkStateDemandeEtudiant.ajouterDemandeEtudiant &&
                            checkStateDemandeEtudiant.listerDemandeEudiant &&
                            checkStateDemandeEtudiant.visualiserDemandeEtudiant &&
                            checkStateDemandeEtudiant.modifierDemandeEtudiant
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Demandes étudiants</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="ajouterDemandeEtudiant"
                        onChange={handleCheckboxChangeDemandeEtudiant}
                        checked={
                          checkStateDemandeEtudiant.ajouterDemandeEtudiant
                        }
                      />
                      <Form.Label htmlFor="ajouterDemandeEtudiant">
                        Ajouter un demande étudiant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerDemandeEudiant"
                        onChange={handleCheckboxChangeDemandeEtudiant}
                        checked={checkStateDemandeEtudiant.listerDemandeEudiant}
                      />
                      <Form.Label htmlFor="listerDemandeEudiant">
                        Lister les demandes des étudiant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserDemandeEtudiant"
                        onChange={handleCheckboxChangeDemandeEtudiant}
                        checked={
                          checkStateDemandeEtudiant.visualiserDemandeEtudiant
                        }
                      />
                      <Form.Label htmlFor="visualiserDemandeEtudiant">
                        Visualiser un demande étudiant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierDemandeEtudiant"
                        onChange={handleCheckboxChangeDemandeEtudiant}
                        checked={
                          checkStateDemandeEtudiant.modifierDemandeEtudiant
                        }
                      />
                      <Form.Label htmlFor="modifierDemandeEtudiant">
                        Modifier un demande étudiant
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterDemandeEnseignant"
                          onChange={handleMasterChangeDemandeEnseignant}
                          checked={
                            checkStateDemandeEnseignant.ajouterDemandeEnseignant &&
                            checkStateDemandeEnseignant.listerDemandeEnseignant &&
                            checkStateDemandeEnseignant.visualiserDemandeEnseignant &&
                            checkStateDemandeEnseignant.modifierDemandeEnseignant
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Demandes enseignants</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="ajouterDemandeEnseignant"
                        onChange={handleCheckboxChangeDemandeEnseignant}
                        checked={
                          checkStateDemandeEnseignant.ajouterDemandeEnseignant
                        }
                      />
                      <Form.Label htmlFor="ajouterDemandeEnseignant">
                        Ajouter un demande enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerDemandeEnseignant"
                        onChange={handleCheckboxChangeDemandeEnseignant}
                        checked={
                          checkStateDemandeEnseignant.listerDemandeEnseignant
                        }
                      />
                      <Form.Label htmlFor="listerDemandeEnseignant">
                        Lister les demandes des enseignants
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserDemandeEnseignant"
                        onChange={handleCheckboxChangeDemandeEnseignant}
                        checked={
                          checkStateDemandeEnseignant.visualiserDemandeEnseignant
                        }
                      />
                      <Form.Label htmlFor="visualiserDemandeEnseignant">
                        Visualiser un demande enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierDemandeEnseignant"
                        onChange={handleCheckboxChangeDemandeEnseignant}
                        checked={
                          checkStateDemandeEnseignant.modifierDemandeEnseignant
                        }
                      />
                      <Form.Label htmlFor="modifierDemandeEnseignant">
                        Modifier un demande enseignant
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterDemandePersonnel"
                          onChange={handleMasterChangeDemandePersonnel}
                          checked={
                            checkStateDemandePersonnel.ajouterDemandePersonnel &&
                            checkStateDemandePersonnel.listerDemandePersonnel &&
                            checkStateDemandePersonnel.visualiserDemandePersonnel &&
                            checkStateDemandePersonnel.modifierDemandePersonnel
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Demandes personnels</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="ajouterDemandePersonnel"
                        onChange={handleCheckboxChangeDemandePersonnel}
                        checked={
                          checkStateDemandePersonnel.ajouterDemandePersonnel
                        }
                      />
                      <Form.Label htmlFor="ajouterDemandePersonnel">
                        Ajouter une demande personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerDemandePersonnel"
                        onChange={handleCheckboxChangeDemandePersonnel}
                        checked={
                          checkStateDemandePersonnel.listerDemandePersonnel
                        }
                      />
                      <Form.Label htmlFor="listerDemandePersonnel">
                        Lister les demandes des personnels
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserDemandePersonnel"
                        onChange={handleCheckboxChangeDemandePersonnel}
                        checked={
                          checkStateDemandePersonnel.visualiserDemandePersonnel
                        }
                      />
                      <Form.Label htmlFor="visualiserDemandePersonnel">
                        Visualiser un demande personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierDemandePersonnel"
                        onChange={handleCheckboxChangeDemandePersonnel}
                        checked={
                          checkStateDemandePersonnel.modifierDemandePersonnel
                        }
                      />
                      <Form.Label htmlFor="modifierDemandePersonnel">
                        Modifier un demande personnel
                      </Form.Label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/*Gestion Reclamations */}
          <Col lg={12}>
            <Card className="header">
              <h5 style={{ margin: "10px" }}> <i className="ri-file-warning-line"></i> {" "} {" "} Gestions des Réclamations</h5>
            </Card>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterReclamationEtudiant"
                          onChange={handleMasterChangeReclamationEtudiant}
                          checked={
                            checkStateReclamationEtudiant.ajouterReclamationEtudiant &&
                            checkStateReclamationEtudiant.listerReclamationEudiant &&
                            checkStateReclamationEtudiant.visualiserReclamationEtudiant &&
                            checkStateReclamationEtudiant.modifierReclamationEtudiant
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Réclamations étudiants</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="ajouterReclamationEtudiant"
                        onChange={handleCheckboxChangeReclamationEtudiant}
                        checked={
                          checkStateReclamationEtudiant.ajouterReclamationEtudiant
                        }
                      />
                      <Form.Label htmlFor="ajouterReclamationEtudiant">
                        Ajouter une réclamation étudiant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerReclamationEudiant"
                        onChange={handleCheckboxChangeReclamationEtudiant}
                        checked={
                          checkStateReclamationEtudiant.listerReclamationEudiant
                        }
                      />
                      <Form.Label htmlFor="listerReclamationEudiant">
                        Lister les réclamations des étudiant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserReclamationEtudiant"
                        onChange={handleCheckboxChangeReclamationEtudiant}
                        checked={
                          checkStateReclamationEtudiant.visualiserReclamationEtudiant
                        }
                      />
                      <Form.Label htmlFor="visualiserReclamationEtudiant">
                        Visualiser une réclamation d'un étudiant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierReclamationEtudiant"
                        onChange={handleCheckboxChangeReclamationEtudiant}
                        checked={
                          checkStateReclamationEtudiant.modifierReclamationEtudiant
                        }
                      />
                      <Form.Label htmlFor="modifierReclamationEtudiant">
                        Modifier une réclamation d'un étudiant
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterReclamationEnseignant"
                          onChange={handleMasterChangeReclamationEnseignant}
                          checked={
                            checkStateReclamationEnseignant.ajouterReclamationEnseignant &&
                            checkStateReclamationEnseignant.listerReclamationEnseignant &&
                            checkStateReclamationEnseignant.visualiserReclamationEnseignant &&
                            checkStateReclamationEnseignant.modifierReclamationEnseignant
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Réclamations enseignants</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="ajouterReclamationEnseignant"
                        onChange={handleCheckboxChangeReclamationEnseignant}
                        checked={
                          checkStateReclamationEnseignant.ajouterReclamationEnseignant
                        }
                      />
                      <Form.Label htmlFor="ajouterReclamationEnseignant">
                        Ajouter une réclamation d'un enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerReclamationEnseignant"
                        onChange={handleCheckboxChangeReclamationEnseignant}
                        checked={
                          checkStateReclamationEnseignant.listerReclamationEnseignant
                        }
                      />
                      <Form.Label htmlFor="listerReclamationEnseignant">
                        Lister les réclamations des enseignants
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserReclamationEnseignant"
                        onChange={handleCheckboxChangeReclamationEnseignant}
                        checked={
                          checkStateReclamationEnseignant.visualiserReclamationEnseignant
                        }
                      />
                      <Form.Label htmlFor="visualiserReclamationEnseignant">
                        Visualiser une réclamation d'un enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierReclamationEnseignant"
                        onChange={handleCheckboxChangeReclamationEnseignant}
                        checked={
                          checkStateReclamationEnseignant.modifierReclamationEnseignant
                        }
                      />
                      <Form.Label htmlFor="modifierReclamationEnseignant">
                        Modifier une réclamation d'un enseignant
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterReclamationPersonnel"
                          onChange={handleMasterChangeReclamationPersonnel}
                          checked={
                            checkStateReclamationPersonnel.ajouterReclamationPersonnel &&
                            checkStateReclamationPersonnel.listerReclamationPersonnel &&
                            checkStateReclamationPersonnel.visualiserReclamationPersonnel &&
                            checkStateReclamationPersonnel.modifierReclamationPersonnel
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Réclamations personnels</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="ajouterReclamationPersonnel"
                        onChange={handleCheckboxChangeReclamationPersonnel}
                        checked={
                          checkStateReclamationPersonnel.ajouterReclamationPersonnel
                        }
                      />
                      <Form.Label htmlFor="ajouterReclamationPersonnel">
                        Ajouter une réclamation personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerReclamationPersonnel"
                        onChange={handleCheckboxChangeReclamationPersonnel}
                        checked={
                          checkStateReclamationPersonnel.listerReclamationPersonnel
                        }
                      />
                      <Form.Label htmlFor="listerReclamationPersonnel">
                        Lister les réclamations des personnels
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserReclamationPersonnel"
                        onChange={handleCheckboxChangeReclamationPersonnel}
                        checked={
                          checkStateReclamationPersonnel.visualiserReclamationPersonnel
                        }
                      />
                      <Form.Label htmlFor="visualiserReclamationPersonnel">
                        Visualiser une réclamation d'un personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierReclamationPersonnel"
                        onChange={handleCheckboxChangeReclamationPersonnel}
                        checked={
                          checkStateReclamationPersonnel.modifierReclamationPersonnel
                        }
                      />
                      <Form.Label htmlFor="modifierReclamationPersonnel">
                        Modifier une réclamation d'un personnel
                      </Form.Label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/*Gestion actualite */}
          <Col lg={12}>
            <Card className="header">
              <h5 style={{ margin: "10px" }}><i className='bx bxs-news'></i> {" "} Gestions des actualitées</h5>
            </Card>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterActualite"
                          onChange={handleMasterChange3}
                          checked={
                            checkState3.AjouterActualite &&
                            checkState3.listerActualite &&
                            checkState3.visualiserActualite &&
                            checkState3.visualiserActualite
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Actualitées</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterActualite"
                        onChange={handleCheckboxChange3}
                        checked={checkState3.AjouterActualite}
                      />
                      <Form.Label htmlFor="AjouterActualite">
                        Ajouter une actualitée
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerActualite"
                        onChange={handleCheckboxChange3}
                        checked={checkState3.listerActualite}
                      />
                      <Form.Label htmlFor="listerActualite">
                        Lister les actualitées
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserActualite"
                        onChange={handleCheckboxChange3}
                        checked={checkState3.visualiserActualite}
                      />
                      <Form.Label htmlFor="visualiserActualite">
                        Visualiser une actualitée
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierActualite"
                        onChange={handleCheckboxChange3}
                        checked={checkState3.modifierActualite}
                      />
                      <Form.Label htmlFor="modifierActualite">
                        Modifier une actualitée
                      </Form.Label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          {/*Gestion evenements */}
          <Col lg={12}>
            <Card className="header">
              <h5 style={{ margin: "10px" }}><i className='bx bxs-megaphone'></i> {" "} Gestions des évènements</h5>
            </Card>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterEvenement"
                          onChange={handleMasterChange4}
                          checked={
                            checkState4.AjouterEvenement &&
                            checkState4.listerEvenement &&
                            checkState4.visualiserEvenement &&
                            checkState4.modifierEvenement
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Evènements</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterEvenement"
                        onChange={handleCheckboxChange4}
                        checked={checkState4.AjouterEvenement}
                      />
                      <Form.Label htmlFor="AjouterEvenement">
                        Ajouter un avis évènement
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerEvenement"
                        onChange={handleCheckboxChange4}
                        checked={checkState4.listerEvenement}
                      />
                      <Form.Label htmlFor="listerEvenement">
                        Lister les évènements
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserEvenement"
                        onChange={handleCheckboxChange4}
                        checked={checkState4.visualiserEvenement}
                      />
                      <Form.Label htmlFor="visualiserEvenement">
                        Visualiser un évènement
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierEvenement"
                        onChange={handleCheckboxChange4}
                        checked={checkState4.modifierEvenement}
                      />
                      <Form.Label htmlFor="modifierEvenement">
                        Modifier un évènement
                      </Form.Label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/*Gestion Absences des etudiants */}
          <Col lg={12}>
            <Card className="header">
              <h5 style={{ margin: "10px" }}>
              <i className='bx bx-group'></i> {" "}  Gestions des absences des étudiants
              </h5>
            </Card>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterAbscenceEtudiant"
                          onChange={handleMasterChangeAbcenceEtudiant}
                          checked={
                            checkStateAbscenceEtudiant.justifierAbcenceEtudiant &&
                            checkStateAbscenceEtudiant.listerAbcenceEtudiant &&
                            checkStateAbscenceEtudiant.listerElimine
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Absences des étudiants</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerAbcenceEtudiant"
                        onChange={handleCheckboxChangeAbcenceEtudiant}
                        checked={
                          checkStateAbscenceEtudiant.listerAbcenceEtudiant
                        }
                      />
                      <Form.Label htmlFor="listerAbcenceEtudiant">
                        Lister les absences des étudiants
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="justifierAbcenceEtudiant"
                        onChange={handleCheckboxChangeAbcenceEtudiant}
                        checked={
                          checkStateAbscenceEtudiant.justifierAbcenceEtudiant
                        }
                      />
                      <Form.Label htmlFor="justifierAbcenceEtudiant">
                        justifier les absences des étudiants
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerElimine"
                        onChange={handleCheckboxChangeAbcenceEtudiant}
                        checked={checkStateAbscenceEtudiant.listerElimine}
                      />
                      <Form.Label htmlFor="listerElimine">
                        Lister les éliminés
                      </Form.Label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/*Gestion presence des enseignants */}
          <Col lg={12}>
            <Card className="header">
              <h5 style={{ margin: "10px" }}>
              <i className="ri-nurse-line"></i>  {" "} Gestions présences des enseigants
              </h5>
            </Card>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterpointageEnseignant"
                          onChange={handleMasterChangePointageEnseignant}
                          checked={
                            checkStatePointageEnseignant.listerEnseignantPresents &&
                            checkStatePointageEnseignant.saisirPointage
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Pointage enseignants</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="saisirPointage"
                        onChange={handleCheckboxChangePointageEnseignant}
                        checked={checkStatePointageEnseignant.saisirPointage}
                      />
                      <Form.Label htmlFor="saisirPointage">
                        Saisir pointage enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerEnseignantPresents"
                        onChange={handleCheckboxChangePointageEnseignant}
                        checked={
                          checkStatePointageEnseignant.listerEnseignantPresents
                        }
                      />
                      <Form.Label htmlFor="listerEnseignantPresents">
                        Lister les enseignants présents
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterAbsenceEnseignant"
                          onChange={handleMasterChangeAbsenceEnseignant}
                          checked={
                            checkStateAbsenceEnseignant.listerEnseignantAbsents &&
                            checkStateAbsenceEnseignant.saisirAbsence
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Absences des enseignants</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="saisirAbsence"
                        onChange={handleCheckboxChangeAbsenceEnseignant}
                        checked={checkStateAbsenceEnseignant.saisirAbsence}
                      />
                      <Form.Label htmlFor="saisirAbsence">
                        Saisir absence enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerEnseignantAbsents"
                        onChange={handleCheckboxChangeAbsenceEnseignant}
                        checked={
                          checkStateAbsenceEnseignant.listerEnseignantAbsents
                        }
                      />
                      <Form.Label htmlFor="listerEnseignantAbsents">
                        Lister les enseignants absents
                      </Form.Label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/*Gestion presence des personnels */}
          <Col lg={12}>
            <Card className="header">
              <h5 style={{ margin: "10px" }}>
              <i className="ri-user-2-fill"></i>{" "} Gestions présences des personnels
              </h5>
            </Card>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterpointagePersonnel"
                          onChange={handleMasterChangePresencePersonnel}
                          checked={
                            checkStatePresencePersonnel.saisirPointagePersonnel &&
                            checkStatePresencePersonnel.listerPersonnelPresents
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Pointage des personnels</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="saisirPointagePersonnel"
                        onChange={handleCheckboxChangePresencePersonnel}
                        checked={
                          checkStatePresencePersonnel.saisirPointagePersonnel
                        }
                      />
                      <Form.Label htmlFor="saisirPointagePersonnel">
                        Saisir pointage personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerPersonnelPresents"
                        onChange={handleCheckboxChangePresencePersonnel}
                        checked={
                          checkStatePresencePersonnel.listerPersonnelPresents
                        }
                      />
                      <Form.Label htmlFor="listerPersonnelPresents">
                        Lister les personnels présents
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterAbsenceEnseignant"
                          onChange={handleMasterChangeAbsencePersonnel}
                          checked={
                            checkStateAbsencePersonnel.listerPersonnelAbsents &&
                            checkStateAbsencePersonnel.saisirAbsencePersonnel
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Absences des personnels</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="saisirAbsencePersonnel"
                        onChange={handleCheckboxChangeAbsencePersonnel}
                        checked={
                          checkStateAbsencePersonnel.saisirAbsencePersonnel
                        }
                      />
                      <Form.Label htmlFor="saisirAbsencePersonnel">
                        Saisir absence personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerPersonnelAbsents"
                        onChange={handleCheckboxChangeAbsencePersonnel}
                        checked={
                          checkStateAbsencePersonnel.listerPersonnelAbsents
                        }
                      />
                      <Form.Label htmlFor="listerPersonnelAbsents">
                        Lister les personnels absents
                      </Form.Label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/*Gestion espace telechargement */}
          <Col lg={12}>
            <Card className="header">
              <h5 style={{ margin: "10px" }}>
              <i className="ri-file-download-line"></i>{" "}  Gestion éspace de téléchargement
              </h5>
            </Card>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterEspaceTelechargement"
                          onChange={handleMasterChangeEspaceTelechargement}
                          checked={
                            checkStateEspaceTelechargement.AjouterEspaceTelechargement &&
                            checkStateEspaceTelechargement.listerEspaceTelechargement &&
                            checkStateEspaceTelechargement.modifierEspaceTelechargement &&
                            checkStateEspaceTelechargement.visualiserEspaceTelechargement
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Espace de téléchargement</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerEspaceTelechargement"
                        onChange={handleCheckboxChangeEspaceTelechargement}
                        checked={
                          checkStateEspaceTelechargement.listerEspaceTelechargement
                        }
                      />
                      <Form.Label htmlFor="listerEspaceTelechargement">
                        Lister les fiches de téléchargement
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierEspaceTelechargement"
                        onChange={handleCheckboxChangeEspaceTelechargement}
                        checked={
                          checkStateEspaceTelechargement.modifierEspaceTelechargement
                        }
                      />
                      <Form.Label htmlFor="modifierEspaceTelechargement">
                        Modifier une fiche de téléchargement
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterEspaceTelechargement"
                        onChange={handleCheckboxChangeEspaceTelechargement}
                        checked={
                          checkStateEspaceTelechargement.AjouterEspaceTelechargement
                        }
                      />
                      <Form.Label htmlFor="AjouterEspaceTelechargement">
                        Ajouter une fiche de téléchargement
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserEspaceTelechargement"
                        onChange={handleCheckboxChangeEspaceTelechargement}
                        checked={
                          checkStateEspaceTelechargement.visualiserEspaceTelechargement
                        }
                      />
                      <Form.Label htmlFor="visualiserEspaceTelechargement">
                        Visualiser une fiche téléchargement
                      </Form.Label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/*Gestion vie estudiantine */}
          <Col lg={12}>
            <Card className="header">
            <h5 style={{ margin: "10px" }}> <i className="ri-map-pin-user-fill"></i> {" "} Gestion vie estudiantine</h5>
            </Card>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterVieEstudiantine"
                          onChange={handleMasterChangeVieEstudiantine}
                          checked={
                            checkStateVieEstudiantine.AjouterCategorie &&
                            checkStateVieEstudiantine.ajouterLocalisation &&
                            checkStateVieEstudiantine.listerCategories &&
                            checkStateVieEstudiantine.listerLocalisation &&
                            checkStateVieEstudiantine.visualiserLocalisation
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Vie estudiantine</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerCategories"
                        onChange={handleCheckboxChangeVieEstudiantine}
                        checked={checkStateVieEstudiantine.listerCategories}
                      />
                      <Form.Label htmlFor="listerCategories">
                        Lister les catégories
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerLocalisation"
                        onChange={handleCheckboxChangeVieEstudiantine}
                        checked={checkStateVieEstudiantine.listerLocalisation}
                      />
                      <Form.Label htmlFor="listerLocalisation">
                        Lister les localisations
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterCategorie"
                        onChange={handleCheckboxChangeVieEstudiantine}
                        checked={checkStateVieEstudiantine.AjouterCategorie}
                      />
                      <Form.Label htmlFor="AjouterCategorie">
                        Ajouter une catégorie
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="ajouterLocalisation"
                        onChange={handleCheckboxChangeVieEstudiantine}
                        checked={checkStateVieEstudiantine.ajouterLocalisation}
                      />
                      <Form.Label htmlFor="ajouterLocalisation">
                        Ajouter une localisation
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserLocalisation"
                        onChange={handleCheckboxChangeVieEstudiantine}
                        checked={
                          checkStateVieEstudiantine.visualiserLocalisation
                        }
                      />
                      <Form.Label htmlFor="visualiserLocalisation">
                        Visualiser une localisation
                      </Form.Label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/*Gestion bibliotheque */}
          <Col lg={12}>
            <Card className="header">
            <h5 style={{ margin: "10px" }}> <i className='bx bxs-school'></i>  {" "} Gestion de bibliothèque</h5>
            </Card>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterBibliotheque"
                          onChange={handleMasterChangeBibliotheque}
                          checked={
                            checkStateBibliotheque.AjouterBibliotheque &&
                            checkStateBibliotheque.listerBibliotheque &&
                            checkStateBibliotheque.modifierBibliotheque &&
                            checkStateBibliotheque.visualiserBibliotheque
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Bibliothèque</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerBibliotheque"
                        onChange={handleCheckboxChangeBibliotheque}
                        checked={checkStateBibliotheque.listerBibliotheque}
                      />
                      <Form.Label htmlFor="listerBibliotheque">
                        Lister les livres
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierBibliotheque"
                        onChange={handleCheckboxChangeBibliotheque}
                        checked={checkStateBibliotheque.modifierBibliotheque}
                      />
                      <Form.Label htmlFor="modifierBibliotheque">
                        Modifier un livre
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterBibliotheque"
                        onChange={handleCheckboxChangeBibliotheque}
                        checked={checkStateBibliotheque.AjouterBibliotheque}
                      />
                      <Form.Label htmlFor="AjouterBibliotheque">
                        Ajouter un livre
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserBibliotheque"
                        onChange={handleCheckboxChangeBibliotheque}
                        checked={checkStateBibliotheque.visualiserBibliotheque}
                      />
                      <Form.Label htmlFor="visualiserBibliotheque">
                        Visualiser les livres
                      </Form.Label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/*Gestion Admin */}
          <Col lg={12}>
            <Card className="header">
              <h5 style={{ margin: "10px" }}> <i className="ri-admin-fill"></i> {" "} Gestion des admins</h5>
            </Card>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterAdmin"
                          onChange={handleMasterChangeAdmin}
                          checked={
                            checkStateAdmin.AjouterAdmin &&
                            checkStateAdmin.listerAdmin &&
                            checkStateAdmin.modifierAdmin &&
                            checkStateAdmin.visualiserAdmin
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Admins</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerAdmin"
                        onChange={handleCheckboxChangeAdmin}
                        checked={checkStateAdmin.listerAdmin}
                      />
                      <Form.Label htmlFor="listerAdmin">
                        Lister les admins
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierAdmin"
                        onChange={handleCheckboxChangeAdmin}
                        checked={checkStateAdmin.modifierAdmin}
                      />
                      <Form.Label htmlFor="modifierAdmin">
                        Modifier un admin
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterAdmin"
                        onChange={handleCheckboxChangeAdmin}
                        checked={checkStateAdmin.AjouterAdmin}
                      />
                      <Form.Label htmlFor="AjouterAdmin">
                        Ajouter un admin
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserAdmin"
                        onChange={handleCheckboxChangeAdmin}
                        checked={checkStateAdmin.visualiserAdmin}
                      />
                      <Form.Label htmlFor="visualiserAdmin">
                        Visualiser un admin
                      </Form.Label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/*Gestion variables globales */}
          <Col lg={12}>
            <Card className="header">
              <h5 style={{ margin: "10px" }}><i className="ri-global-line"></i> {" "} Gestion des variables globales</h5>
            </Card>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterVariableGlobales"
                          onChange={handleMasterChangeVariableGlobales}
                          checked={
                            checkStateVariableGlobales.listerVariableGlobales &&
                            checkStateVariableGlobales.modifierVariableGlobales
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Variables globales</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierVariableGlobales"
                        onChange={handleCheckboxChangeVariableGlobales}
                        checked={
                          checkStateVariableGlobales.modifierVariableGlobales
                        }
                      />
                      <Form.Label htmlFor="modifierVariableGlobales">
                        Modifier un variable
                      </Form.Label>
                    </div>
                  </Col>

                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerVariableGlobales"
                        onChange={handleCheckboxChangeVariableGlobales}
                        checked={
                          checkStateVariableGlobales.listerVariableGlobales
                        }
                      />
                      <Form.Label htmlFor="listerVariableGlobales">
                        Lister les variables
                      </Form.Label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/*Gestion poinatges des enseignants */}
          <Col lg={12}>
            <Card className="header">
              <h5 style={{ margin: "10px" }}>
              <i className="ri-user-follow-fill"></i> {" "}  Gestions pointage des enseigants
              </h5>
            </Card>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterGestionPointageEnseignant"
                          onChange={handleMasterChangeGestionPointageEnseignant}
                          checked={
                            checkStateGestionPointageEnseignant.AjouterGestionPointageEnseignant &&
                            checkStateGestionPointageEnseignant.ListerGestionPointageEnseignant
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Pointage Enseignants</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="ListerGestionPointageEnseignant"
                        onChange={handleCheckboxChangeGestionPointageEnseignant}
                        checked={
                          checkStateGestionPointageEnseignant.ListerGestionPointageEnseignant
                        }
                      />
                      <Form.Label htmlFor="ListerGestionPointageEnseignant">
                        Lister les pointages des enseignants
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterGestionPointageEnseignant"
                        onChange={handleCheckboxChangeGestionPointageEnseignant}
                        checked={
                          checkStateGestionPointageEnseignant.AjouterGestionPointageEnseignant
                        }
                      />
                      <Form.Label htmlFor="AjouterGestionPointageEnseignant">
                        Ajouter un pointage d'enseignant
                      </Form.Label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          {/*Gestion Comptes */}
          <Col lg={12}>
            <Card className="header">
              <h5 style={{ margin: "10px" }}> <i className="ri-account-box-fill"></i> {" "} Gestions des Comptes</h5>
            </Card>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterCompteEtudiant"
                          onChange={handleMasterChangeEtudiant}
                          checked={
                            checkStateEtudiant.AjouterCompteEtudiant &&
                            checkStateEtudiant.listerCompteEtudiant &&
                            checkStateEtudiant.visualiserCompteEtudiant &&
                            checkStateEtudiant.visualiserCompteEtudiant
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Comptes étudiants</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterCompteEtudiant"
                        onChange={handleCheckboxChangeEtudiant}
                        checked={checkStateEtudiant.AjouterCompteEtudiant}
                      />
                      <Form.Label htmlFor="AjouterCompteEtudiant">
                        Ajouter compte étudiant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerCompteEtudiant"
                        onChange={handleCheckboxChangeEtudiant}
                        checked={checkStateEtudiant.listerCompteEtudiant}
                      />
                      <Form.Label htmlFor="listerCompteEtudiant">
                        Lister les comptes des étudiants
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserCompteEtudiant"
                        onChange={handleCheckboxChangeEtudiant}
                        checked={checkStateEtudiant.visualiserCompteEtudiant}
                      />
                      <Form.Label htmlFor="visualiserCompteEtudiant">
                        Visualiser un compte étudiant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierCompteEtudiant"
                        onChange={handleCheckboxChangeEtudiant}
                        checked={checkStateEtudiant.modifierCompteEtudiant}
                      />
                      <Form.Label htmlFor="modifierCompteEtudiant">
                        Modifier un compte étudiant
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterCompteEnseignant"
                          onChange={handleMasterChangeEnseignant}
                          checked={
                            checkStateEnseignant.AjouterCompteEnseignant &&
                            checkStateEnseignant.listerCompteEnseignant &&
                            checkStateEnseignant.visualiserCompteEnseignant &&
                            checkStateEnseignant.modifierCompteEnseignant
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Comptes enseignants</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterCompteEnseignant"
                        onChange={handleCheckboxChangeEnseignant}
                        checked={checkStateEnseignant.AjouterCompteEnseignant}
                      />
                      <Form.Label htmlFor="AjouterCompteEnseignant">
                        Ajouter un compte enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerCompteEnseignant"
                        onChange={handleCheckboxChangeEnseignant}
                        checked={checkStateEnseignant.listerCompteEnseignant}
                      />
                      <Form.Label htmlFor="listerCompteEnseignant">
                        Lister les comptes des enseignants
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserCompteEnseignant"
                        onChange={handleCheckboxChangeEnseignant}
                        checked={
                          checkStateEnseignant.visualiserCompteEnseignant
                        }
                      />
                      <Form.Label htmlFor="visualiserCompteEnseignant">
                        Visualiser un compte enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierCompteEnseignant"
                        onChange={handleCheckboxChangeEnseignant}
                        checked={checkStateEnseignant.modifierCompteEnseignant}
                      />
                      <Form.Label htmlFor="modifierCompteEnseignant">
                        Modifier un compte enseignant
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col lg={2}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterComptePersonnel"
                          onChange={handleMasterChangePersonnel}
                          checked={
                            checkStatePersonnel.AjouterComptePersonnel &&
                            checkStatePersonnel.listerComptePersonnel &&
                            checkStatePersonnel.visualiserComptePersonnel &&
                            checkStatePersonnel.modifierComptePersonnel
                          }
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Comptes personnels</h6>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterComptePersonnel"
                        onChange={handleCheckboxChangePersonnel}
                        checked={checkStatePersonnel.AjouterComptePersonnel}
                      />
                      <Form.Label htmlFor="AjouterComptePersonnel">
                        Ajouter un compte personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerComptePersonnel"
                        onChange={handleCheckboxChangePersonnel}
                        checked={checkStatePersonnel.listerComptePersonnel}
                      />
                      <Form.Label htmlFor="listerComptePersonnel">
                        Lister les comptes des personnels
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserComptePersonnel"
                        onChange={handleCheckboxChangePersonnel}
                        checked={checkStatePersonnel.visualiserComptePersonnel}
                      />
                      <Form.Label htmlFor="visualiserComptePersonnel">
                        Visualiser un compte personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierComptePersonnel"
                        onChange={handleCheckboxChangePersonnel}
                        checked={checkStatePersonnel.modifierComptePersonnel}
                      />
                      <Form.Label htmlFor="modifierComptePersonnel">
                        Modifier un compte personnel
                      </Form.Label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/*Paramètres Comptes */}
          <Col lg={12}>
            <Card className="header">
              <h5 style={{ margin: "10px" }}>  <i className='bx bxs-cog' ></i> {" "}  Paramètres Comptes</h5>
            </Card>
            <Card>
              <Card.Body>
                {/* comptes etudiants */}
                <Row className="align-items-center">
                  <Col lg={12}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterComptesEtudiants"
                          onChange={handleMasterChangeComptesEtudiants}
                          checked={allChecked && allCheckedInscription}
                        />
                      </div>
                      <h5 className="mb-3">Comptes étudiants</h5>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={12}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="etatEtudiant"
                          onChange={handleMasterChangeEtat}
                          checked={allChecked}
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Etat</h6>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterEtatEtudiant"
                        onChange={handleCheckboxChangeEtatEtudiant}
                        checked={checkStateEtatEtudiant.AjouterEtatEtudiant}
                      />
                      <Form.Label htmlFor="AjouterEtatEtudiant">
                        Ajouter un état des étudiants
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerEtatEtudiant"
                        onChange={handleCheckboxChangeEtatEtudiant}
                        checked={checkStateEtatEtudiant.listerEtatEtudiant}
                      />
                      <Form.Label htmlFor="listerEtatEtudiant">
                        Lister les états des étudiants
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserEtatEtudiant"
                        onChange={handleCheckboxChangeEtatEtudiant}
                        checked={checkStateEtatEtudiant.visualiserEtatEtudiant}
                      />
                      <Form.Label htmlFor="visualiserEtatEtudiant">
                        Visualiser un état étudiant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierEtatEtudiant"
                        onChange={handleCheckboxChangeEtatEtudiant}
                        checked={checkStateEtatEtudiant.modifierEtatEtudiant}
                      />
                      <Form.Label htmlFor="modifierEtatEtudiant">
                        Modifier un état étudiant
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={12}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="inscriptionEtudiant"
                          onChange={handleMasterChangeInscriptionEtudiants}
                          checked={allCheckedInscription}
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Inscription</h6>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterInscriptionEtudiant"
                        onChange={handleCheckboxChangeInscriptionEtudiant}
                        checked={
                          checkStateInscriptionEtudiant.AjouterInscriptionEtudiant
                        }
                      />
                      <Form.Label htmlFor="AjouterInscriptionEtudiant">
                        Ajouter un inscription étudiant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerInscriptionEtudiant"
                        onChange={handleCheckboxChangeInscriptionEtudiant}
                        checked={
                          checkStateInscriptionEtudiant.listerInscriptionEtudiant
                        }
                      />
                      <Form.Label htmlFor="listerInscriptionEtudiant">
                        Lister les inscriptions des étudiants
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserInscriptionEtudiant"
                        onChange={handleCheckboxChangeInscriptionEtudiant}
                        checked={
                          checkStateInscriptionEtudiant.visualiserInscriptionEtudiant
                        }
                      />
                      <Form.Label htmlFor="visualiserInscriptionEtudiant">
                        Visualiser un inscription étudiant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierInscriptionEtudiant"
                        onChange={handleCheckboxChangeInscriptionEtudiant}
                        checked={
                          checkStateInscriptionEtudiant.modifierInscriptionEtudiant
                        }
                      />
                      <Form.Label htmlFor="modifierInscriptionEtudiant">
                        Modifier un inscription étudiant
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                {/* comptes enseignants */}
                <Row className="align-items-center">
                  <Col lg={12}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterComptesEnseignants"
                          onChange={handleMasterChangeComptesEnseignants}
                          checked={
                            allCheckedEtatEnseignant &&
                            allCheckedGradeEnseignant &&
                            allCheckedPosteEnseignant &&
                            allCheckedSpecialiteEnseignant
                          }
                        />
                      </div>
                      <h5 className=" mb-3">Comptes enseignants</h5>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={12}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="etatEnseignant"
                          onChange={handleMasterChangeEtatEnseignant}
                          checked={allCheckedEtatEnseignant}
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Etat</h6>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterEtatEnseignant"
                        onChange={handleCheckboxChangeEtatEnseignant}
                        checked={checkStateEtatEnseignant.AjouterEtatEnseignant}
                      />
                      <Form.Label htmlFor="AjouterEtatEnseignant">
                        Ajouter un état des enseignantss
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerEtatEnseignant"
                        onChange={handleCheckboxChangeEtatEnseignant}
                        checked={checkStateEtatEnseignant.listerEtatEnseignant}
                      />
                      <Form.Label htmlFor="listerEtatEnseignant">
                        Lister les états des enseignants
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserEtatEnseignant"
                        onChange={handleCheckboxChangeEtatEnseignant}
                        checked={
                          checkStateEtatEnseignant.visualiserEtatEnseignant
                        }
                      />
                      <Form.Label htmlFor="visualiserEtatEnseignant">
                        Visualiser un état enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierEtatEtudiant"
                        onChange={handleCheckboxChangeEtatEnseignant}
                        checked={
                          checkStateEtatEnseignant.modifierEtatEnseignant
                        }
                      />
                      <Form.Label htmlFor="modifierEtatEtudiant">
                        Modifier un état enseignant
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={12}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="apecialiteEnseignant"
                          onChange={handleMasterChangeSpecialiteEnseignants}
                          checked={allCheckedSpecialiteEnseignant}
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Spécialité</h6>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterSpecialiteEnseignant"
                        onChange={handleCheckboxChangeSpecialiteEnseignant}
                        checked={
                          checkStateSpecialiteEnseignant.AjouterSpecialiteEnseignant
                        }
                      />
                      <Form.Label htmlFor="AjouterSpecialiteEnseignant">
                        Ajouter une spécialité enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerSpecialiteEnseignant"
                        onChange={handleCheckboxChangeSpecialiteEnseignant}
                        checked={
                          checkStateSpecialiteEnseignant.listerSpecialiteEnseignant
                        }
                      />
                      <Form.Label htmlFor="listerSpecialiteEnseignant">
                        Lister les spécialités des enseignants
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserSpecialiteEnseignant"
                        onChange={handleCheckboxChangeSpecialiteEnseignant}
                        checked={
                          checkStateSpecialiteEnseignant.visualiserSpecialiteEnseignant
                        }
                      />
                      <Form.Label htmlFor="visualiserSpecialiteEnseignant">
                        Visualiser une spécialité enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierSpecialiteEnseignant"
                        onChange={handleCheckboxChangeSpecialiteEnseignant}
                        checked={
                          checkStateSpecialiteEnseignant.modifierSpecialiteEnseignant
                        }
                      />
                      <Form.Label htmlFor="modifierSpecialiteEnseignant">
                        Modifier une spécialité enseignant
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={12}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="gradeEnseignant"
                          onChange={handleMasterChangeGradeEnseignants}
                          checked={allCheckedGradeEnseignant}
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Grade</h6>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterGradeEnseignant"
                        onChange={handleCheckboxChangeGradeEnseignant}
                        checked={
                          checkStateGradeEnseignant.AjouterGradeEnseignant
                        }
                      />
                      <Form.Label htmlFor="AjouterGradeEnseignant">
                        Ajouter un garde enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerGradeEnseignant"
                        onChange={handleCheckboxChangeGradeEnseignant}
                        checked={
                          checkStateGradeEnseignant.listerGradeEnseignant
                        }
                      />
                      <Form.Label htmlFor="listerGradeEnseignant">
                        Lister les grades des enseignants
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserGradeEnseignant"
                        onChange={handleCheckboxChangeGradeEnseignant}
                        checked={
                          checkStateGradeEnseignant.visualiserGradeEnseignant
                        }
                      />
                      <Form.Label htmlFor="visualiserGradeEnseignant">
                        Visualiser un grade enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierGradeEnseignant"
                        onChange={handleCheckboxChangeGradeEnseignant}
                        checked={
                          checkStateGradeEnseignant.modifierGradeEnseignant
                        }
                      />
                      <Form.Label htmlFor="modifierGradeEnseignant">
                        Modifier un grade enseignant
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={12}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="posteEnseignant"
                          onChange={handleMasterChangePosteEnseignants}
                          checked={allCheckedPosteEnseignant}
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Poste</h6>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterPosteEnseignant"
                        onChange={handleCheckboxChangePosteEnseignant}
                        checked={
                          checkStatePosteEnseignant.AjouterPosteEnseignant
                        }
                      />
                      <Form.Label htmlFor="AjouterPosteEnseignant">
                        Ajouter un poste enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerPosteEnseignant"
                        onChange={handleCheckboxChangePosteEnseignant}
                        checked={
                          checkStatePosteEnseignant.listerPosteEnseignant
                        }
                      />
                      <Form.Label htmlFor="listerPosteEnseignant">
                        Lister les postes des enseignants
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserPosteEnseignant"
                        onChange={handleCheckboxChangePosteEnseignant}
                        checked={
                          checkStatePosteEnseignant.visualiserPosteEnseignant
                        }
                      />
                      <Form.Label htmlFor="visualiserPosteEnseignant">
                        Visualiser un poste enseignant
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierPosteEnseignant"
                        onChange={handleCheckboxChangePosteEnseignant}
                        checked={
                          checkStatePosteEnseignant.modifierPosteEnseignant
                        }
                      />
                      <Form.Label htmlFor="modifierPosteEnseignant">
                        Modifier un poste enseignant
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                {/* comptes personnels */}
                <Row className="align-items-center">
                  <Col lg={12}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="masterComptesPersonnels"
                          onChange={handleMasterChangeComptesPersonnels}
                          checked={
                            allCheckedEtatPersonnel &&
                            allCheckedGradePersonnel &&
                            allCheckedPostePersonnel &&
                            allCheckedCategoriePersonnel
                          }
                        />
                      </div>
                      <h5 className=" mb-3">Comptes personnels</h5>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={12}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="etatPersonnels"
                          onChange={handleMasterChangeEtatPersonnel}
                          checked={allCheckedEtatPersonnel}
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Etat</h6>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterEtatPersonnel"
                        onChange={handleCheckboxChangeEtatPersonnel}
                        checked={checkStateEtatPersonnel.AjouterEtatPersonnel}
                      />
                      <Form.Label htmlFor="AjouterEtatPersonnel">
                        Ajouter un état des personnels
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerEtatPersonnel"
                        onChange={handleCheckboxChangeEtatPersonnel}
                        checked={checkStateEtatPersonnel.listerEtatPersonnel}
                      />
                      <Form.Label htmlFor="listerEtatPersonnel">
                        Lister les états des personnels
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserEtatPersonnel"
                        onChange={handleCheckboxChangeEtatPersonnel}
                        checked={
                          checkStateEtatPersonnel.visualiserEtatPersonnel
                        }
                      />
                      <Form.Label htmlFor="visualiserEtatPersonnel">
                        Visualiser un état personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierEtatPersonnel"
                        onChange={handleCheckboxChangeEtatPersonnel}
                        checked={checkStateEtatPersonnel.modifierEtatPersonnel}
                      />
                      <Form.Label htmlFor="modifierEtatPersonnel">
                        Modifier un état personnel
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={12}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="categoriePersonnel"
                          onChange={handleMasterChangeCategoriePersonnels}
                          checked={allCheckedCategoriePersonnel}
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Catégorie</h6>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterCategoriePersonnel"
                        onChange={handleCheckboxChangeCategoriePersonnel}
                        checked={
                          checkStateCategoriePersonnel.AjouterCategoriePersonnel
                        }
                      />
                      <Form.Label htmlFor="AjouterCategoriePersonnel">
                        Ajouter une catégorie personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerCategoriePersonnel"
                        onChange={handleCheckboxChangeCategoriePersonnel}
                        checked={
                          checkStateCategoriePersonnel.listerCategoriePersonnel
                        }
                      />
                      <Form.Label htmlFor="listerCategoriePersonnel">
                        Lister les catégories des personnels
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserCategoriePersonnel"
                        onChange={handleCheckboxChangeCategoriePersonnel}
                        checked={
                          checkStateCategoriePersonnel.visualiserCategoriePersonnel
                        }
                      />
                      <Form.Label htmlFor="visualiserCategoriePersonnel">
                        Visualiser une catégorie personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierCategoriePersonnel"
                        onChange={handleCheckboxChangeCategoriePersonnel}
                        checked={
                          checkStateCategoriePersonnel.modifierCategoriePersonnel
                        }
                      />
                      <Form.Label htmlFor="modifierCategoriePersonnel">
                        Modifier une catégorie personnel
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={12}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="gradeEnseignant"
                          onChange={handleMasterChangeGradePersonnels}
                          checked={allCheckedGradePersonnel}
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Grade</h6>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterGradePersonnel"
                        onChange={handleCheckboxChangeGradePersonnel}
                        checked={checkStateGradePersonnel.AjouterGradePersonnel}
                      />
                      <Form.Label htmlFor="AjouterGradePersonnel">
                        Ajouter un garde personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerGradePersonnel"
                        onChange={handleCheckboxChangeGradePersonnel}
                        checked={checkStateGradePersonnel.listerGradePersonnel}
                      />
                      <Form.Label htmlFor="listerGradePersonnel">
                        Lister les grades des personnels
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserGradePersonnel"
                        onChange={handleCheckboxChangeGradePersonnel}
                        checked={
                          checkStateGradePersonnel.visualiserGradePersonnel
                        }
                      />
                      <Form.Label htmlFor="visualiserGradePersonnel">
                        Visualiser un grade personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierGradePersonnel"
                        onChange={handleCheckboxChangeGradePersonnel}
                        checked={
                          checkStateGradePersonnel.modifierGradePersonnel
                        }
                      />
                      <Form.Label htmlFor="modifierGradePersonnel">
                        Modifier un grade personnel
                      </Form.Label>
                    </div>
                  </Col>
                </Row>

                <Row className="g-3">
                  <Col lg={12}>
                    <div className="d-flex align-items-center mt-4">
                      <div className="form-check ms-2 mb-3">
                        <Form.Check
                          type="checkbox"
                          id="posteEnseignant"
                          onChange={handleMasterChangePostePersonnels}
                          checked={allCheckedPostePersonnel}
                        />
                      </div>
                      <h6 className="fs-15 mb-3">Poste</h6>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="AjouterPostePersonnel"
                        onChange={handleCheckboxChangePostePersonnel}
                        checked={checkStatePostePersonnel.AjouterPostePersonnel}
                      />
                      <Form.Label htmlFor="AjouterPostePersonnel">
                        Ajouter un poste personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="listerPostePersonnel"
                        onChange={handleCheckboxChangePostePersonnel}
                        checked={checkStatePostePersonnel.listerPostePersonnel}
                      />
                      <Form.Label htmlFor="listerPostePersonnel">
                        Lister les postes des personnels
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="visualiserPostePersonnel"
                        onChange={handleCheckboxChangePostePersonnel}
                        checked={
                          checkStatePostePersonnel.visualiserPostePersonnel
                        }
                      />
                      <Form.Label htmlFor="visualiserPostePersonnel">
                        Visualiser un poste personnel
                      </Form.Label>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-check">
                      <Form.Check
                        type="checkbox"
                        id="modifierPostePersonnel"
                        onChange={handleCheckboxChangePostePersonnel}
                        checked={
                          checkStatePostePersonnel.modifierPostePersonnel
                        }
                      />
                      <Form.Label htmlFor="modifierPostePersonnel">
                        Modifier un poste personnel
                      </Form.Label>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Permissions;
