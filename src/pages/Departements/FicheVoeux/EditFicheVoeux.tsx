import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import {useLocation, useNavigate } from "react-router-dom";
import "flatpickr/dist/flatpickr.min.css";
import Swal from "sweetalert2";
import { Matiere, useFetchMatiereQuery } from "features/matiere/matiere";
import { useFetchFicheVoeuxsQuery, useUpdateFicheVoeuxMutation } from "features/ficheVoeux/ficheVoeux";
import Select, { MultiValue } from "react-select";
import { useFetchClassesQuery } from "features/classe/classe";
import { useFetchEnseignantsQuery } from "features/enseignant/enseignant";

// Define types for days and options
type Jour = {
  _id: number;
  name: string;
};

type JourOption = {
  value: number;
  label: string;
};

// Define the type for the FicheVoeuxClasse
interface FicheVoeuxClasse {
  matieres: string[];
  jours: string[]; // Assuming it's an array of day IDs
  temps: string;
  classe: string;
  allDays: Jour[];
  selectedJourOptions: JourOption[];
  selectedJours: number[];
  joursArray: number[];
  filtredJours: Jour[];
  jourOptions: JourOption[];
  filteredJoursOptions: JourOption[];
  consernedClasses: any[]; // Replace with specific type if available
  selectedSubjectOptions: any[];
  selectedSubjects: any[];
  filteredSubjectsOptions: any[];
  filtredSubjects: any[];
}

const EditFicheVoeux = () => {
  document.title = " Modifier  fiche de voeux | Application Smart Institute";
  const navigate = useNavigate();

  function tog_retourParametres() {
    navigate("/gestion-fiche-voeux/liste-fiche-voeux");
  }
  const { state: ficheVoeux } = useLocation();
  //console.log("ficheVoeux",ficheVoeux)

  const [editFicheVoeux] = useUpdateFicheVoeuxMutation();
  const { data: allTeachers = [] } = useFetchEnseignantsQuery();
  const { data: allVoeux = [] } = useFetchFicheVoeuxsQuery();
  
  useEffect(() => {
   // console.log("Setting form data:", ficheVoeux);
    if (ficheVoeux) {
      setFormData({
        _id: ficheVoeux._id,
        semestre: ficheVoeux.semestre,
        enseignant:ficheVoeux.enseignant,
        fiche_voeux_classes: ficheVoeux.fiche_voeux_classes,
      });
    }
  }, [ficheVoeux]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const teachersWithoutWishCard = allTeachers.filter(teacher => !allVoeux.some(voeux => voeux.enseignant._id === teacher._id));

  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");

  const [formData, setFormData] = useState({
    _id: "",
    fiche_voeux_classes: [
      {
        matieres: [""],
        jours: [""],
        temps: "",
        classe: "",
        allDays: [],
        selectedJourOptions: [],
        selectedJours: [],
        joursArray: [],
        filtredJours: [],
        jourOptions: [],
        filteredJoursOptions: [],
        consernedClasses: [],
        selectedSubjectOptions: [],
        selectedSubjects: [],
        filteredSubjectsOptions: [],
        filtredSubjects: [],
      },
    ],

    enseignant: {
      _id: "",
      nom_fr: "",
      nom_ar: "",
      prenom_fr: "",
      prenom_ar: "",
    },
    semestre: "S1",
  });

  const handleTempsChange = (e: any, index: number) => {
    if (e.target.value !== "") {
      setFormData((prevState) => {
        const updatedFicheVoeux = [...prevState.fiche_voeux_classes];
        updatedFicheVoeux[index].temps = e.target.value;
        return {
          ...prevState,
          fiche_voeux_classes: updatedFicheVoeux,
        };
      });
    }
  };

  // const handleTeacherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   console.log('Selected teacher ID:', e.target.value);
  //   const selectedTeacherId = e.target.value;
  
  //   if (selectedTeacherId !== "") {
  //     setSelectedTeacherId(selectedTeacherId);
  
  //     // Define the days for selection
  //     const allJours = [
  //       { _id: 0, name: "Lundi" },
  //       { _id: 1, name: "Mardi" },
  //       { _id: 2, name: "Mercredi" },
  //       { _id: 3, name: "Jeudi" },
  //       { _id: 4, name: "Vendredi" },
  //       { _id: 5, name: "Samedi" },
  //     ];
  
  //     setFormData((prevState: any) => {
  //       console.log('Previous state:', prevState);
  //       const updatedFicheVoeux: FicheVoeuxClasse[] = [
  //         ...prevState.fiche_voeux_classes,
  //       ];
  
  //       // Ensure correct mapping of all days (`Jour` type)
  //       const filtredJours: Jour[] = allJours.map((jour) => jour);
  //       const jourOptions: JourOption[] = filtredJours.map((jour) => ({
  //         value: jour._id,
  //         label: jour.name,
  //       }));
  
  //       const filteredJoursOptions = jourOptions.filter(
  //         (option) =>
  //           !updatedFicheVoeux[0]?.selectedJours?.some((jour) => jour === option.value)
  //       );
  
  //       // Find the selected teacher
  //       const selectedTeacher = teachersWithoutWishCard.find(
  //         (teacher) => teacher._id === selectedTeacherId
  //       );
  
  //       let classes: any[] = [];
  
  //       if (selectedTeacher) {
  //         if (selectedTeacher.departements?.name_fr === "Tous les départements") {
  //           classes = allClasses;
  //         } else {
  //           classes = allClasses.filter(
  //             (classItem) =>
  //               classItem.departement._id === selectedTeacher.departements?._id
  //           );
  //         }
  //       }
  
  //       // Correctly typed object conforming to `FicheVoeuxClasse`
  //       updatedFicheVoeux.splice(0, updatedFicheVoeux.length, {
  //         classe: "",
  //         jours: [], // Assuming this is a `number[]`, adjust if it's actually `string[]`
  //         matieres: [],
  //         temps: "",
  //         allDays: allJours,
  //         selectedJourOptions: [],
  //         selectedJours: [],
  //         joursArray: [],
  //         filtredJours,
  //         jourOptions,
  //         filteredJoursOptions,
  //         consernedClasses: classes,
  //         selectedSubjectOptions: [],
  //         selectedSubjects: [],
  //         filteredSubjectsOptions: [],
  //         filtredSubjects: [],
  //       });
  
  //       const newState = {
  //         ...prevState,
  //         fiche_voeux_classes: updatedFicheVoeux,
  //         enseignant: {
  //           _id: selectedTeacherId,
  //         },
  //         matieres: [],
  //       };
      
  //       console.log('New state:', newState); // Log new state
  //       return newState;
  //     });
  //   }
  // };
  
  const handleTeacherChange = (e: any) => {
    console.log("e.target.value",e.target.value)
    if (e.target.value !== "") {
      setSelectedTeacherId(e.target.value);
      /*---------------- Days selection ---------------- */
      let allJours: any = [
        { _id: 0, name: "Lundi" },
        { _id: 1, name: "Mardi" },
        { _id: 2, name: "Mercredi" },
        { _id: 3, name: "Jeudi" },
        { _id: 4, name: "Vendredi" },
        { _id: 5, name: "Samedi" },
      ];

      /*---------------- Days selection ---------------- */

      setFormData((prevState) => {
        const updatedFicheVoeux = [...prevState.fiche_voeux_classes];

        /*---------------- Days selection ---------------- */
        const filtredJours = allJours.map((jour: any) => jour);

        let jourOptions = filtredJours.map((jour: any) => ({
          value: jour._id,
          label: jour.name,
        }));

        const filteredJoursOptions = jourOptions.filter(
          (option: any) =>
            !updatedFicheVoeux[0]?.selectedJours?.some(
              (jour) => jour === option.value
            )
        );
        /*---------------- Days selection ---------------- */

        /*---------------- Subjects selection ---------------- */
        let selectedTeacher = teachersWithoutWishCard.filter(
          (teacher) => teacher._id === e.target.value
        );

        let classes: any ;

        if (selectedTeacher[0].departements?.name_fr === "Tous les départements"){
          classes = allClasses
        }
        else{
          classes = allClasses.filter(
            (classItem) =>
              classItem.departement._id === selectedTeacher[0].departements?._id
          );
        }

        /*---------------- Subjects selection ---------------- */

        updatedFicheVoeux.splice(0, updatedFicheVoeux.length);
        updatedFicheVoeux.push({
          classe: "",
          jours: [],
          matieres: [],
          temps: "",
          //Temporary data for days selection
          allDays: allJours,
          selectedJourOptions: [],
          selectedJours: [],
          joursArray: [],
          filtredJours: filtredJours,
          jourOptions: jourOptions,
          filteredJoursOptions: filteredJoursOptions,
          //Temporary data for subjects selection
          consernedClasses: classes,
          selectedSubjectOptions: [],
          selectedSubjects: [],
          filteredSubjectsOptions: [],
          filtredSubjects: [],
        });
        return {
          ...prevState,
          fiche_voeux_classes: updatedFicheVoeux,
          enseignant: e.target.value,
          matieres: [],
        };
      });
    }
  };
  

  const clearTemporaryDaysData = (element: any) => {
    delete (element as any).allDays;
    delete (element as any).selectedJourOptions;
    delete (element as any).selectedJours;
    delete (element as any).joursArray;
    delete (element as any).filtredJours;
    delete (element as any).jourOptions;
    delete (element as any).filteredJoursOptions;
  };

  const clearTemporarySubjectsData = (element: any) => {
    delete (element as any).selectedSubjectOptions;
    delete (element as any).selectedSubjects;
    delete (element as any).filteredSubjectsOptions;
    delete (element as any).filtredSubjects;
  };

  const onSubmitFicheVoeux = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(selectedMatieres);
      //TODO
      // formData.matieres = [];
      // for (let matiere of selectedMatieres) {
      //   formData.matieres.push(matiere._id);
      // }
      setFormData((prevState) => {
        const updatedFicheVoeux = [...prevState.fiche_voeux_classes];
        for (let element of updatedFicheVoeux) {
          clearTemporaryDaysData(element);
          clearTemporarySubjectsData(element);
        }
        return {
          ...prevState,
          fiche_voeux_classes: updatedFicheVoeux,
        };
      });

      console.log("formData submit fiche voeux", formData);
      await editFicheVoeux(formData).unwrap();
      notify();
      navigate("/gestion-fiche-voeux/liste-fiche-voeux");
    } catch (error: any) {
      console.log(error);
    }
  };

  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Fiche de voeux a été crée avec succés",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const error = (error: any) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `Creation fiche de voeux échoué ${error}`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const toggleSemestre = () => {

    setFormData((prevState) => {
      return {
        ...prevState,
        fiche_voeux_classes: [
          {
            matieres: [""],
            jours: [""],
            temps: "",
            classe: "",
            allDays: [],
            selectedJourOptions: [],
            selectedJours: [],
            joursArray: [],
            filtredJours: [],
            jourOptions: [],
            filteredJoursOptions: [],
            consernedClasses: [],
            selectedSubjectOptions: [],
            selectedSubjects: [],
            filteredSubjectsOptions: [],
            filtredSubjects: [],
          },
        ],
    
        enseignant: {
          _id: "",
          nom_fr: "",
          nom_ar: "",
          prenom_fr: "",
          prenom_ar: "",
        },
        semestre: prevState.semestre === "S1" ? "S2" : "S1",
      };
    });
  };

  const { data: allClasses = [] } = useFetchClassesQuery();
  // console.log("allClasses", allClasses);

  const { data: allMatieres = [] } = useFetchMatiereQuery();
  const [selectedMatieres, setSelectedMatieres] = useState<Matiere[]>([]);


  const handleSelectChange = (selectedOptions: any, index: number) => {
    setFormData((prevState) => {
      const updatedFicheVoeux = [...prevState.fiche_voeux_classes];
      updatedFicheVoeux[index].selectedSubjectOptions = selectedOptions;
      const matieres = selectedOptions.map((option: any) => ({
        _id: option.value,
        code_matiere: option.code_matiere,
        matiere: option.label,
        type: option.type,
        semestre: option.semestre,
        volume: option.volume,
        nbr_elimination: option.nbr_elimination,
      }));

      const uniqueMatieres: any = [
        ...updatedFicheVoeux[index].selectedSubjects,
        ...matieres,
      ].reduce((acc, current) => {
        const x = acc.find((item: any) => item._id === current._id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, [] as Matiere[]);

      updatedFicheVoeux[index].selectedSubjects = uniqueMatieres;
      updatedFicheVoeux[index].matieres = selectedOptions.map(
        (item: any) => item.value
      );

      return {
        ...prevState,
        fiche_voeux_classes: updatedFicheVoeux,
      };
    });
  };

  /*-------------------------------------------------------------------------- */

  const handleSelectJourChange = (selectedJourOptions: any, index: number) => {
    setFormData((prevState) => {
      const updatedFicheVoeux = [...prevState.fiche_voeux_classes];
      updatedFicheVoeux[index].selectedJourOptions = selectedJourOptions;
      const jours: any = updatedFicheVoeux[index].selectedJourOptions.map(
        (option: any) => ({
          _id: option.value,
          name: option.label,
        })
      );

      const uniqueJours = [
        ...updatedFicheVoeux[index].selectedJours,
        ...jours,
      ].reduce((acc, current) => {
        const x = acc.find((item: any) => item._id === current._id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      updatedFicheVoeux[index].selectedJours = uniqueJours;
      updatedFicheVoeux[index].jours = uniqueJours.map(
        (jour: any) => jour.name
      );
      return {
        ...prevState,
        fiche_voeux_classes: updatedFicheVoeux,
      };
    });
  };

  /*-------------------------------------------------------------------------- */
  const handleChangeClasse = (e: any, index: number) => {
    const value = e.target.value;

    if (value !== "") {
      let consernedClass = allClasses.filter(
        (classItem) => classItem._id === value
      );

      const filtredMatieres = allMatieres.filter((mat) =>
        consernedClass[0]?.matieres?.some((obj2) => obj2._id === mat._id && mat.semestre === formData.semestre)
      );

      console.log("filtredMatieres", filtredMatieres);

      let options = filtredMatieres.map((matiere) => ({
        value: matiere._id,
        label: matiere.matiere + " " + matiere.type,
        type: matiere.type,
        semestre: matiere.semestre,
        code_matiere: matiere.code_matiere,
        volume: matiere.volume,
        nbr_elimination: matiere.nbr_elimination,
      }));
      console.log("options", options);

      setFormData((prevState) => {
        const updatedFicheVoeux = [...prevState.fiche_voeux_classes];
        updatedFicheVoeux[index].classe = value;
        updatedFicheVoeux[index].selectedSubjects = [];
        updatedFicheVoeux[index].selectedSubjectOptions = [];

        let filtredOptions: any = options.filter(
          (option) =>
            !updatedFicheVoeux[index].selectedSubjects.some(
              (matiere: any) => matiere._id === option.value
            )
        );

        updatedFicheVoeux[index].filteredSubjectsOptions = filtredOptions;
        return {
          ...prevState,
          fiche_voeux_classes: updatedFicheVoeux,
        };
      });
    }
  };

  const customStyles = {
    multiValue: (styles: any, { data }: any) => ({
      ...styles,
      backgroundColor: "#4b93ff",
    }),
    multiValueLabel: (styles: any, { data }: any) => ({
      ...styles,
      backgroundColor: "#4b93ff",
      color: "white",
    }),
    multiValueRemove: (styles: any, { data }: any) => ({
      ...styles,
      color: "white",
      backgroundColor: "#4b93ff",
      ":hover": {
        backgroundColor: "#4b93ff",
        color: "white",
      },
    }),
  };

  const addNewClassLine = () => {
    let allJours: any = [
      { _id: 0, name: "Lundi" },
      { _id: 1, name: "Mardi" },
      { _id: 2, name: "Mercredi" },
      { _id: 3, name: "Jeudi" },
      { _id: 4, name: "Vendredi" },
      { _id: 5, name: "Samedi" },
    ];

    const filtredJours = allJours.map((jour: any) => jour);

    let jourOptions = filtredJours.map((jour: any) => ({
      value: jour._id,
      label: jour.name,
    }));
    let arr: any = [];
    const filteredJoursOptions = jourOptions.filter(
      (option: any) => !arr.some((jour: any) => jour === option.value)
    );

    /*---------------- Subjects selection ---------------- */
    let selectedTeacher = teachersWithoutWishCard.filter(
      (teacher) => teacher._id === selectedTeacherId
    );

    let classes: any ;

        if (selectedTeacher[0].departements?.name_fr === "Tous les départements"){
          classes = allClasses
        }
        else{
          classes = allClasses.filter(
            (classItem) =>
              classItem.departement._id === selectedTeacher[0].departements?._id
          );
        }

    /*---------------- Subjects selection ---------------- */

    setFormData((prevState) => ({
      ...prevState,
      fiche_voeux_classes: [
        ...prevState.fiche_voeux_classes,
        {
          classe: "",
          jours: [],
          matieres: [],
          temps: "",
          //Temporary data for days selection
          allDays: allJours,
          selectedJourOptions: [],
          selectedJours: [],
          joursArray: [],
          filtredJours: filtredJours,
          jourOptions: jourOptions,
          filteredJoursOptions: filteredJoursOptions,
          //Temporary data for subjects selection
          consernedClasses: classes,
          selectedSubjectOptions: [],
          selectedSubjects: [],
          filteredSubjectsOptions: [],
          filtredSubjects: [],
        },
      ],
    }));
  };

  const removeClassLine = (index: number) => {
    setFormData((prevState) => {
      const updatedFicheVoeux = [...prevState.fiche_voeux_classes];
      updatedFicheVoeux.splice(index, 1);
      return {
        ...prevState,
        fiche_voeux_classes: updatedFicheVoeux,
      };
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Form className="tablelist-form" onSubmit={onSubmitFicheVoeux}>
                <div
                  id="alert-error-msg"
                  className="d-none alert alert-danger py-2"
                ></div>
                <input type="hidden" id="id-field" />
                <Row>
                  <Col lg={3}>
                    <div className="mb-3">
                      <Form.Label htmlFor="semestre">Semestre</Form.Label>
                      <div className="form-check form-switch form-switch-lg from-switch-info">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="SwitchCheck6"
                          checked={formData.semestre === "S2"}
                          onChange={onChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="SwitchCheck6"
                        >
                          {formData.semestre}
                        </label>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={2}>
                    <div className="mb-3">
                      <Form.Label htmlFor="enseignant">Enseignant</Form.Label>
                      <select
                        className="form-select text-muted"
                        name="enseignant"
                        id="enseignant"
                        value={formData?.enseignant?._id || ""}
                        onChange={handleTeacherChange}
                      >
                        <option value="">Sélectionner Enseignant</option>
                        {teachersWithoutWishCard.map((enseignant) => (
                          <option key={enseignant._id} value={enseignant._id}>
                            {`${enseignant.prenom_fr} ${enseignant.nom_fr}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Col>
                  <Col lg={10}>
                    {formData.fiche_voeux_classes.map((data, index) => (
                      <Row>
                        <Col lg={2}>
                          <div className="mb-3">
                            <Form.Label htmlFor="classe">Classe</Form.Label>
                            <select
                              className="form-select text-muted"
                              name="classe"
                              id="classe"
                              value={formData.fiche_voeux_classes[index].classe}
                              onChange={(e) => {
                                handleChangeClasse(e, index);
                              }}
                            >
                              <option value="">Sélectionner Classe</option>
                              {data?.consernedClasses?.map((classe: any) => (
                                <option key={classe._id} value={classe._id}>
                                  {`${classe.nom_classe_fr}`}
                                </option>
                              ))}
                            </select>
                          </div>
                        </Col>
                        <Col lg={3}>
                          <div className="mb-3">
                            <Form.Label
                              htmlFor="choices-multiple-remove-button"
                              className="text-muted"
                            >
                              Sélectionner Matière
                            </Form.Label>

                            <Select
                              closeMenuOnSelect={false}
                              isMulti
                              options={data.filteredSubjectsOptions}
                              value={data.selectedSubjectOptions}
                              styles={customStyles}
                              onChange={(e) => {
                                handleSelectChange(e, index);
                              }}
                            />
                          </div>
                        </Col>

                        <Col lg={3}>
                          <div className="mb-3">
                            <Form.Label
                              htmlFor="choices-multiple-remove-button"
                              className="text-muted"
                            >
                              Sélectionner Jour
                            </Form.Label>

                            <Select
                              closeMenuOnSelect={false}
                              isMulti
                              options={data.filteredJoursOptions}
                              value={data.selectedJourOptions}
                              styles={customStyles}
                              onChange={(e) => {
                                handleSelectJourChange(e, index);
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={2}>
                          <div className="mb-3">
                            <Form.Label htmlFor="temps">Temps</Form.Label>
                            <select
                              className="form-select text-muted"
                              name="temps"
                              id="temps"
                              value={data.temps}
                              onChange={(e) => {
                                handleTempsChange(e, index);
                              }}
                            >
                              <option value="">---------</option>
                              <option value="Matin">Matin</option>
                              <option value="Après-midi">Après-midi</option>
                              <option value="Toute la journée">
                                Toute la journée
                              </option>
                            </select>
                          </div>
                        </Col>
                        <Col lg={2}>
                          <Button
                            className="mt-4"
                            variant="danger"
                            onClick={() => removeClassLine(index)}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </Button>
                        </Col>
                      </Row>
                    ))}
                    <Row>
                      <Col lg={12}>
                        <Button
                          variant="info"
                          disabled={formData.enseignant.nom_ar === ""}
                          onClick={addNewClassLine}
                        >
                          <i
                            className="bi bi-plus"
                            style={{ fontSize: "15px" }}
                          ></i>
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <div className="modal-footer">
                  <div className="hstack gap-2 justify-content-end">
                    <Button
                      className="btn-ghost-danger"
                      onClick={() => {
                        tog_retourParametres();
                      }}
                    >
                      Retour
                    </Button>
                    <Button variant="success" id="add-btn" type="submit">
                      Ajouter
                    </Button>
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditFicheVoeux;
