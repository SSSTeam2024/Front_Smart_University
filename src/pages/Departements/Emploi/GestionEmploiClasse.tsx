import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "flatpickr/dist/flatpickr.min.css";
import Swal from "sweetalert2";
import { useFetchFicheVoeuxsQuery } from "features/ficheVoeux/ficheVoeux";
import "./GestionEmploiClasse.css";
import SimpleBar from "simplebar-react";

import { useFetchClasseByIdQuery } from "features/classe/classe";
import { useFetchDisponibiliteSallesMutation } from "features/disponibiliteSalle/disponibiliteSalle";
import {
  useAddSeanceMutation,
  useDeleteSeanceMutation,
  useFetchAllSeancesByClasseIdQuery,
  useGetSeancesByTeacherMutation,
} from "features/seance/seance";
import CustomLoaderForButton from "Common/CustomLoaderForButton/CustomLoaderForButton";


const GestionEmploiClasse = () => {
  document.title = " Gestion emploi classe | Application Smart Institute";

  const [heuresDebut, setHeuresDebut] = useState<any[]>([]);
  const [fetchDisponibiliteSalles, roomsAvailabilityRequestStatus] =
    useFetchDisponibiliteSallesMutation();
  const [disponibiliteSalles, setDisponibiliteSalles] = useState<any[]>([]);
  const [modal_AddParametreModals, setmodal_AddParametreModals] =
    useState<boolean>(false);
  const [heuresFin, setHeuresFin] = useState<any[]>([]);
  const [modal_AddSeanceModals, setmodal_AddSeanceModals] =
    useState<boolean>(false);
  const [selectedVoeux, setSelectedVoeux] = useState<any>([]);
  const [selectedJourVoeux, setSelectedJourVoeux] = useState<any>([]);
  const [selectedTempsVoeux, setSelectedTempsVoeux] = useState<string>("");
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [teacherSessionsForSingleDay, setTeacherSessionsForSingleDay] =
    useState<any[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const classeDetails = location.state;
  const [createSeance, sessionCreationRequestStatus] = useAddSeanceMutation();
  const [getSessionsByTeacherId] = useGetSeancesByTeacherMutation();
  const { data: allVoeux = [] } = useFetchFicheVoeuxsQuery();
  console.log("allVoeux", allVoeux);
  const voeux = allVoeux;
  const { data: classe } = useFetchClasseByIdQuery(classeDetails?.classe?._id);
  //console.log("classe", classe);
  const { data: allSessions = [] } = useFetchAllSeancesByClasseIdQuery(
    classeDetails?.classe?._id
  );

  //console.log("allSessions", allSessions);

  const [deleteSessionById] = useDeleteSeanceMutation();

  const [formData, setFormData] = useState({
    _id: "",
    matiere: "",
    enseignant: {
      _id: "",
      nom_fr: "",
      nom_ar: "",
      prenom_fr: "",
      prenom_ar: "",
    },
    classe: classeDetails?.classe?._id,
    salle: "",
    jour: "",
    heure_debut: "",
    heure_fin: "",
    type_seance: "1",
    semestre: classeDetails?.semestre,
  });

  const timeSlots: any = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
  ];

  function tog_AddParametreModals() {
    setmodal_AddParametreModals(!modal_AddParametreModals);
  }

  const filteredSessions = allSessions.filter(
    (session) => session?.semestre! === classeDetails?.semestre!
  );

  const timeSlotsDynamic: any = [];
  for (let i = 16; i < 38; i++) {
    const startHour = String(Math.floor(i / 2)).padStart(2, "0");
    const startMinutes = i % 2 === 0 ? "00" : "30";
    const endHour = String(Math.floor((i + 1) / 2)).padStart(2, "0");
    const endMinutes = (i + 1) % 2 === 0 ? "00" : "30";
    timeSlotsDynamic.push(
      `${startHour}:${startMinutes}-${endHour}:${endMinutes}`
    );
  }

  const groupSessionsByDay = (sessions: any) => {
    const grouped: any = {};
    sessions.forEach((session: any) => {
      const {
        _id,
        jour,
        heure_debut,
        heure_fin,
        matiere,
        enseignant,
        salle,
        semestre,
        type_seance,
      } = session;
      if (!grouped[jour]) {
        grouped[jour] = [];
      }
      grouped[jour].push({
        _id,
        jour,
        semestre,
        type_seance,
        classe,
        heure_debut,
        heure_fin,
        matiere,
        enseignant,
        salle,
      });
    });
    return grouped;
  };
  const groupedSessions = groupSessionsByDay(filteredSessions);

  const renderTableBody = () => {
    return ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"].map(
      (day) => {
        const sessionsForDay = groupedSessions[day] || [];
        const renderedSlots = new Set();

        return (
          <tr key={day}>
            <td className="time-td">{day}</td>
            {timeSlotsDynamic.map((slot: any, index: any) => {
              const [slotStart, slotEnd] = slot.split("-");

              // Check if the slot has already been rendered
              if (renderedSlots.has(slotStart)) {
                return null;
              }

              const session = sessionsForDay.find(
                (s: any) =>
                  slotStart >= s.heure_debut && slotStart < s.heure_fin
              );
              if (session) {
                const startSlot = session.heure_debut;
                const endSlot = session.heure_fin;
                const durationSlots: number =
                  (Number(new Date(`1970-01-01T${endSlot}:00Z`)) -
                    Number(new Date(`1970-01-01T${startSlot}:00Z`))) /
                  (30 * 60 * 1000);
                // Mark all slots covered by this session as rendered
                for (let i = 0; i < durationSlots; i++) {
                  renderedSlots.add(timeSlotsDynamic[index + i].split("-")[0]);
                }
                return (
                  <td key={index} colSpan={durationSlots} className="time-td">
                    {session.type_seance === '1/15'? (
                      <span className="flyingFifteen">15</span>
                    ): (<></>)}
                    <Row className="mb-3">
                      <div className="d-flex justify-content-end">
                        <ul className="hstack gap-2 list-unstyled mb-0">
                          <li>
                            <div className="badge bg-primary-subtle text-primary edit-item-btn">
                              <i
                                className="ph ph-pencil-line"
                                style={{
                                  transition: "transform 0.3s ease-in-out",
                                  cursor: "pointer",
                                  fontSize: "1.2em",
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.transform =
                                    "scale(1.2)")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.transform = "scale(1)")
                                }
                              ></i>
                            </div>
                          </li>
                          <li>
                            <div className="badge bg-danger-subtle text-danger remove-item-btn">
                              <i
                                className="ph ph-trash"
                                style={{
                                  transition: "transform 0.3s ease-in-out",
                                  cursor: "pointer",
                                  fontSize: "1.2em",
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.transform =
                                    "scale(1.2)")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.transform = "scale(1)")
                                }
                                onClick={(e) => {
                                  showDeleteAlert(session);
                                }}
                              ></i>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </Row>
                    <Row className="d-flex justify-content-center">
                      {session?.matiere?.matiere! + " " + session?.matiere?.type!} <br />{" "}
                      <u>
                        {session?.enseignant?.prenom_fr! +
                          " " +
                          session?.enseignant?.nom_fr!}
                      </u>{" "}
                      <br /> <strong>{session?.salle?.salle!}</strong>
                    </Row>
                  </td>
                );
              }

              return <td className="time-td" key={index}></td>;
            })}
          </tr>
        );
      }
    );
  };

  function tog_retourParametres() {
    navigate("/gestion-emplois-classe/liste-emplois-classe");
  }

  let key = "";
  if (classeDetails?.semestre === "1") {
    key = "S1";
  } else {
    key = "S2";
  }

  let wishList = [];
  for (let element of allVoeux) {
    let consernedVoeux;
    if( key === element.semestre){
      for (let v of element.fiche_voeux_classes) {
        if (classe?._id === v.classe?._id) {
          consernedVoeux = v;
          wishList.push({
            teachrer: element.enseignant,
            voeux: consernedVoeux,
          });
          break;
        }
      }
    }
    
  }

  const selectChangeHeureDebut = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      heure_debut: value,
      heure_fin: "",
      salle: "",
    });
    let index = timeSlots.indexOf(value);
    let tempHeuresFin = [];
    for (let i = index + 1; i < timeSlots.length; i++) {
      tempHeuresFin.push(timeSlots[i]);
    }
    setHeuresFin(tempHeuresFin);
    setDisponibiliteSalles([]);
  };

  const selectChangeHeureFin = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const endTime = event.target.value;
    let class_availability = isClassAvailable(endTime);
    let teacher_availability = isTeahcerAvailable(endTime);
    if (class_availability === true && teacher_availability === true) {
      setFormData({
        ...formData,
        heure_fin: endTime,
        salle: "",
      });
      setDisponibiliteSalles([]);
    } else if (class_availability === false && teacher_availability === true) {
      let startTime = formData.heure_debut;
      setFormData({
        ...formData,
        heure_debut: "",
        salle: "",
      });
      setDisponibiliteSalles([]);
      setHeuresFin([]);
      alert("Classe non disponible entre " + startTime + " et " + endTime);
    } else if (class_availability === true && teacher_availability === false) {
      let startTime = formData.heure_debut;
      setFormData({
        ...formData,
        heure_debut: "",
        salle: "",
      });
      setDisponibiliteSalles([]);
      setHeuresFin([]);
      alert("Enseignant non disponible entre " + startTime + " et " + endTime);
    } else if (class_availability === false && teacher_availability === false) {
      let startTime = formData.heure_debut;
      setFormData({
        ...formData,
        heure_debut: "",
        salle: "",
      });
      setDisponibiliteSalles([]);
      setHeuresFin([]);
      alert(
        "Enseignant et classe non disponible entre " +
          startTime +
          " et " +
          endTime
      );
    }
  };

  const isClassAvailable = (endTime: string) => {
    let isAvailable = false;
    if (groupedSessions[formData.jour]) {
      let sortedSessions = sortSessions(groupedSessions[formData.jour]);

      for (let session of sortedSessions) {
        //console.log(session);
        const { heure_debut, heure_fin } = session;
        let currentSessionIndex = sortedSessions.indexOf(session);
        //console.log(currentSessionIndex);
        /***** After */
        if (formData.heure_debut >= heure_fin) {
          // console.log(formData.heure_debut + ">=" + heure_fin);
          // console.log("Start Time Resolved part1 After");
          if (currentSessionIndex < sortedSessions.length - 1) {
            //console.log(sortedSessions[currentSessionIndex + 1]);
            if (
              endTime <= sortedSessions[currentSessionIndex + 1].heure_debut
            ) {
              // console.log(
              //   endTime +
              //     "<=" +
              //     sortedSessions[currentSessionIndex + 1].heure_debut
              // );
              // console.log("Start Time Resolved part2 After");
              isAvailable = true;
              break;
            }
          }
          if (currentSessionIndex === sortedSessions.length - 1) {
            //console.log("Start Time Resolved part2 second After");
            isAvailable = true;
            break;
          }
        }
        /***** After */
        /***** Before */
        if (endTime <= heure_debut) {
          // console.log(endTime + "<=" + heure_debut);
          // console.log("Start Time Resolved part1 Before");
          if (currentSessionIndex - 1 >= 1) {
            //console.log(sortedSessions[currentSessionIndex - 1]);
            if (
              formData.heure_debut >=
              sortedSessions[currentSessionIndex - 1].heure_fin
            ) {
              // console.log(
              //   formData.heure_debut +
              //     ">=" +
              //     sortedSessions[currentSessionIndex - 1].heure_fin
              // );
              // console.log("Start Time Resolved part2 Before");
              isAvailable = true;
              break;
            }
          }
          if (currentSessionIndex === 0) {
            //console.log("Start Time Resolved part2 second Before");
            isAvailable = true;
            break;
          }
        }
        /***** Before */
      }
    } else {
      isAvailable = true;
    }

    return isAvailable;
  };

  const isTeahcerAvailable = (endTime: string) => {
    let isAvailable = false;

    if (teacherSessionsForSingleDay.length !== 0) {
      let arr = [...teacherSessionsForSingleDay];
      let sortedSessions = sortSessions(arr);

      for (let session of sortedSessions) {
        console.log(session);
        const { heure_debut, heure_fin } = session;
        let currentSessionIndex = sortedSessions.indexOf(session);
        /***** After */
        if (formData.heure_debut >= heure_fin) {
          console.log(formData.heure_debut + ">=" + heure_fin);
          console.log("Start Time Resolved part1 After");
          if (currentSessionIndex < sortedSessions.length - 1) {
            console.log(sortedSessions[currentSessionIndex + 1]);
            if (
              endTime <= sortedSessions[currentSessionIndex + 1].heure_debut
            ) {
              console.log(
                endTime +
                  "<=" +
                  sortedSessions[currentSessionIndex + 1].heure_debut
              );
              console.log("Start Time Resolved part2 After");
              isAvailable = true;
              break;
            }
          }
          if (currentSessionIndex === sortedSessions.length - 1) {
            console.log("Start Time Resolved part2 second After");
            isAvailable = true;
            break;
          }
        }
        /***** After */
        /***** Before */
        if (endTime <= heure_debut) {
          console.log(endTime + "<=" + heure_debut);
          console.log("Start Time Resolved part1 Before");
          if (currentSessionIndex - 1 >= 1) {
            console.log(sortedSessions[currentSessionIndex - 1]);
            if (
              formData.heure_debut >=
              sortedSessions[currentSessionIndex - 1].heure_fin
            ) {
              console.log(
                formData.heure_debut +
                  ">=" +
                  sortedSessions[currentSessionIndex - 1].heure_fin
              );
              console.log("Start Time Resolved part2 Before");
              isAvailable = true;
              break;
            }
          }
          if (currentSessionIndex === 0) {
            console.log("Start Time Resolved part2 second Before");
            isAvailable = true;
            break;
          }
        }
        /***** Before */
      }
    } else {
      isAvailable = true;
    }

    return isAvailable;
  };

  const sortSessions = (sessions: any[]) => {
    
    sessions.sort((a, b) => {
      const timeA = a.heure_debut.split(":").map(Number);
      const timeB = b.heure_debut.split(":").map(Number);

      console.log(timeA);
      console.log(timeB);

      const hoursDifference = timeA[0] - timeB[0];
      const minutesDifference = timeA[1] - timeB[1];

      return hoursDifference !== 0 ? hoursDifference : minutesDifference;
    });

    return sessions;
  };

  const selectChangeJour = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    let requestData = {
      teacher_id: selectedTeacher?.id,
      jour: value,
      semestre: classeDetails.semestre,
    };

    let res = await getSessionsByTeacherId(requestData).unwrap();
    setTeacherSessionsForSingleDay(res);

    setFormData((prevState) => ({
      ...prevState,
      jour: value,
      heure_debut: "",
      heure_fin: "",
      salle: "",
    }));
    setDisponibiliteSalles([]);
    setHeuresFin([]);
  };

  const handleFetchDisponibiliteSalles = async (e: any) => {
    e.preventDefault();
    try {
      let dayNumber = "";
      switch (formData.jour) {
        case "Lundi":
          dayNumber = "0";
          break;
        case "Mardi":
          dayNumber = "1";
          break;
        case "Mercredi":
          dayNumber = "2";
          break;
        case "Jeudi":
          dayNumber = "3";
          break;
        case "Vendredi":
          dayNumber = "4";
          break;
        case "Samedi":
          dayNumber = "5";
          break;
        default:
          break;
      }

      const payload = {
        heure_debut: formData.heure_debut,
        heure_fin: formData.heure_fin,
        jour: dayNumber,
        searchedAvailability: "0",
        sessionType: formData.type_seance
      };
      let result: any[] = await fetchDisponibiliteSalles(payload).unwrap();
      console.log("disponibilites", result);

      let availableRooms = getRooms(result);
      let pureAvailableRooms = removeDuplicateRooms(availableRooms);
      setDisponibiliteSalles(pureAvailableRooms);
    } catch (err) {
      console.error("Failed to fetch disponibilite salles: ", err);
    }
  };

  const removeDuplicateRooms = (rooms: any[]): any[] => {
    const availableRooms = new Set<string>();
    return rooms.filter((room) => {
      if (availableRooms.has(room.salle)) {
        return false;
      } else {
        availableRooms.add(room.salle);
        return true;
      }
    });
  };

  const getRooms = (disponibilites: any[]) => {
    const availableRooms = disponibilites.map(
      (disponibilite) => disponibilite.roomId
    );
    return availableRooms;
  };

  const onSubmitSeance = async () => {
    try {
      await createSeance(formData).unwrap();
      tog_AddSeanceModals();
      notify();
    } catch (error: any) {
      console.log(error);
    }
  };

  const selectChangeTypeSceance = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      type_seance: value,
      semestre: classeDetails.semestre,
      classe: classeDetails.classe._id,
    }));
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const showDeleteAlert = async (session: any) => {
    swalWithBootstrapButtons
      .fire({
        title: "Êtes-vous sûr?",
        text: "Vous ne pourrez pas revenir en arrière!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimez!",
        cancelButtonText: "Non, annuler!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const requestData = {
            _id: session._id,
            roomId: session.salle._id,
            startTime: session.heure_debut,
            endTime: session.heure_fin,
            day: session.jour,
          };
          await deleteSessionById(requestData).unwrap();
          swalWithBootstrapButtons.fire(
            "Supprimé!",
            "Séance a été supprimé.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire("Annulé", "", "error");
        }
      });
  };

  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Séance Ajoutée",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  async function tog_AddSeanceModals() {
    setDisponibiliteSalles([]);
    setFormData((prevState) => ({
      ...prevState,
      heure_debut: "",
      heure_fin: "",
      matiere: "",
      salle: "",
      jour: ""
    }));
    setmodal_AddSeanceModals(!modal_AddSeanceModals);
    /*********************************************************** */
    let tempAvailableDays = [];
    setHeuresFin([]);

    for (let i = 0; i < 7; i++) {
      switch (i) {
        case 0:
          let mondayCoveredSlots = [];
          if (groupedSessions["Lundi"]) {
            for (let session of groupedSessions["Lundi"]) {
              const { heure_debut, heure_fin } = session;

              let startIndex = timeSlots.indexOf(heure_debut);
              let endIndex = timeSlots.indexOf(heure_fin);

              for (let i = startIndex; i < endIndex; i++) {
                mondayCoveredSlots.push(timeSlots[i]);
              }
            }
            if (mondayCoveredSlots.length < timeSlots.length - 1) {
              tempAvailableDays.push("Lundi");
            }
          } else {
            tempAvailableDays.push("Lundi");
          }
          break;
        case 1:
          let tuesdayCoveredSlots = [];
          if (groupedSessions["Mardi"]) {
            for (let session of groupedSessions["Mardi"]) {
              const { heure_debut, heure_fin } = session;

              let startIndex = timeSlots.indexOf(heure_debut);
              let endIndex = timeSlots.indexOf(heure_fin);

              for (let i = startIndex; i < endIndex; i++) {
                tuesdayCoveredSlots.push(timeSlots[i]);
              }
            }
            if (tuesdayCoveredSlots.length < timeSlots.length - 1) {
              tempAvailableDays.push("Mardi");
            }
          } else {
            tempAvailableDays.push("Mardi");
          }
          break;
        case 2:
          let wednesdayCoveredSlots = [];
          if (groupedSessions["Mercredi"]) {
            for (let session of groupedSessions["Mercredi"]) {
              const { heure_debut, heure_fin } = session;

              let startIndex = timeSlots.indexOf(heure_debut);
              let endIndex = timeSlots.indexOf(heure_fin);

              for (let i = startIndex; i < endIndex; i++) {
                wednesdayCoveredSlots.push(timeSlots[i]);
              }
            }
            if (wednesdayCoveredSlots.length < timeSlots.length - 1) {
              tempAvailableDays.push("Mercredi");
            }
          } else {
            tempAvailableDays.push("Mercredi");
          }
          break;
        case 4:
          let thursdayCoveredSlots = [];
          if (groupedSessions["Jeudi"]) {
            for (let session of groupedSessions["Jeudi"]) {
              const { heure_debut, heure_fin } = session;

              let startIndex = timeSlots.indexOf(heure_debut);
              let endIndex = timeSlots.indexOf(heure_fin);

              for (let i = startIndex; i < endIndex; i++) {
                thursdayCoveredSlots.push(timeSlots[i]);
              }
            }
            if (thursdayCoveredSlots.length < timeSlots.length - 1) {
              tempAvailableDays.push("Jeudi");
            }
          } else {
            tempAvailableDays.push("Jeudi");
          }
          break;
        case 5:
          let fridayCoveredSlots = [];
          if (groupedSessions["Vendredi"]) {
            for (let session of groupedSessions["Vendredi"]) {
              const { heure_debut, heure_fin } = session;

              let startIndex = timeSlots.indexOf(heure_debut);
              let endIndex = timeSlots.indexOf(heure_fin);

              for (let i = startIndex; i < endIndex; i++) {
                fridayCoveredSlots.push(timeSlots[i]);
              }
            }
            if (fridayCoveredSlots.length < timeSlots.length - 1) {
              tempAvailableDays.push("Vendredi");
            }
          } else {
            tempAvailableDays.push("Vendredi");
          }
          break;
        case 6:
          let samediCoveredSlots = [];
          if (groupedSessions["Samedi"]) {
            for (let session of groupedSessions["Samedi"]) {
              const { heure_debut, heure_fin } = session;

              let startIndex = timeSlots.indexOf(heure_debut);
              let endIndex = timeSlots.indexOf(heure_fin);

              for (let i = startIndex; i < endIndex; i++) {
                samediCoveredSlots.push(timeSlots[i]);
              }
            }
            if (samediCoveredSlots.length < timeSlots.length - 1) {
              tempAvailableDays.push("Samedi");
            }
          } else {
            tempAvailableDays.push("Samedi");
          }
          break;

        default:
          break;
      }
    }
    
    setAvailableDays(tempAvailableDays);
    /*********************************************************** */
  }

  const handleChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      enseignant: e.target.value,
    }));
  };

  const handleChangeSelectedVoeuxEnseignant = (e: any) => {
    if (e.target.value !== "") {
      let consernedVoeux: any = voeux.filter(
        (v) => v.enseignant._id === e.target.value
      );

      let currentVoeux: any = consernedVoeux[0]?.fiche_voeux_classes!.filter(
        (v: any) => v.classe._id === classe!._id
      );

      setSelectedTeacher({
        name:
          consernedVoeux[0]?.enseignant?.prenom_fr! +
          " " +
          consernedVoeux[0]?.enseignant?.nom_fr!,
        id: consernedVoeux[0]?.enseignant?._id!,
      });

      let tempMat = [];
      for (let mat of currentVoeux[0]?.matieres!) {
        tempMat.push({
          name: mat.matiere + " " + mat.type,
          id: mat._id,
        });
      }
      setFormData((prevState) => ({
        ...prevState,
        enseignant: e.target.value,
      }));

      setSelectedVoeux(tempMat);
      let tempJour = [];
      for (let jour of currentVoeux[0]?.jours!) {
        tempJour.push(jour);
      }
      setSelectedJourVoeux(tempJour);
      setSelectedTempsVoeux(currentVoeux[0]?.temps!);
    } else {
      setSelectedTeacher(null);
    }
  };

  const handleChangeFiltredMatiere = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      matiere: e.target.value,
    }));
  };

  const handleChangeSalle = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      salle: e.target.value,
    }));
  };
  const toggleTypeSeance = () => {
    setFormData((prevState) => ({
      ...prevState,
      type_seance: prevState.type_seance === "1" ? "1/15" : "1",
    }));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Form className="tablelist-form">
                <div
                  id="alert-error-msg"
                  className="d-none alert alert-danger py-2"
                ></div>
                <input type="hidden" id="id-field" />
                <Row className="d-flex justify-content-center fw-bold titre-emploi">
                  <div className="hstack gap-2 justify-content-start">
                    <Button
                      className="btn-danger"
                      onClick={() => {
                        tog_retourParametres();
                      }}
                    >
                      Retour
                    </Button>
                  </div>
                  <div className="mb-3 text-center">
                    <Form.Label htmlFor="semestre">
                      Emploi De Temps {classeDetails?.classe?.nom_classe_fr} -{" "}
                      Semestre {classeDetails?.semestre}
                    </Form.Label>
                  </div>
                </Row>

                <Row>
                  <Col lg={9} className="d-flex align-items-center">
                    <div style={{ overflowX: "auto", width: "100%" }}>
                      <table className="time-table">
                        <thead>
                          <tr>
                            <th>Jour/Temps</th>
                            {timeSlotsDynamic.map((slot: any, index: any) => (
                              <th className="timeTh time-th" key={index}>
                                {slot}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>{renderTableBody()}</tbody>
                      </table>
                    </div>
                  </Col>

                  <Col lg={3}>
                    <Col className="col-md-auto ms-auto mb-2">
                      <Button
                        disabled={selectedTeacher === null}
                        variant="success"
                        onClick={() => tog_AddSeanceModals()}
                        className="add-btn"
                      >
                        <i className="bi bi-plus-circle me-1 align-middle"></i>
                        Ajouter Séance
                      </Button>
                    </Col>
                    <Card>
                      <Card.Header className="d-flex align-items-center">
                        <h5 className="card-title mb-0 flex-grow-1">
                          Listes des voeux
                        </h5>
                        <div className="">
                          <select
                            className="form-select text-muted"
                            name="etat_compte"
                            id="etat_compte"
                            value={formData.enseignant.nom_ar}
                            onChange={handleChangeSelectedVoeuxEnseignant}
                          >
                            <option value="">Sélectionner Enseignant</option>
                            {wishList?.map((wish) => (
                              <option
                                key={wish?.teachrer?._id!}
                                value={wish?.teachrer?._id!}
                              >
                                {`${wish?.teachrer?.prenom_fr!} ${wish?.teachrer
                                  ?.nom_fr!}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <SimpleBar
                          data-simplebar
                          style={{ maxHeight: "440px" }}
                        >
                          <div className="acitivity-timeline acitivity-main">
                            <div className="acitivity-item d-flex">
                              <div className="flex-shrink-0 acitivity-avatar"></div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="mb-0 lh-base">Matières</h6>
                                {selectedVoeux?.map(
                                  (matiere: any, index: number) => (
                                    <p className="text-muted mb-0" key={index}>
                                      <strong>-</strong> {matiere.name}
                                    </p>
                                  )
                                )}
                              </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                              <div className="flex-shrink-0">
                                <div className="acitivity-avatar"></div>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="mb-0 lh-base">Jour</h6>
                                {selectedJourVoeux?.map(
                                  (jour: any, index: number) => (
                                    <p className="mb-2 text-muted" key={index}>
                                      {jour}
                                    </p>
                                  )
                                )}
                              </div>
                            </div>
                            <div className="acitivity-item py-3 d-flex">
                              <div className="flex-shrink-0 acitivity-avatar"></div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="mb-0 lh-base">Temps</h6>
                                <p className="mb-2 text-muted">
                                  {selectedTempsVoeux}
                                </p>
                              </div>
                            </div>
                          </div>
                        </SimpleBar>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Modal
                  id="showModal"
                  className="fade zoomIn"
                  size="lg"
                  show={modal_AddSeanceModals}
                  onHide={() => {
                    tog_AddSeanceModals();
                  }}
                  centered
                >
                  <Modal.Header className="px-4 pt-4" closeButton>
                    <h5 className="modal-title fs-18" id="exampleModalLabel">
                      Ajouter Séance
                    </h5>
                  </Modal.Header>
                  <Modal.Body className="p-4">
                    <Form className="tablelist-form">
                      <Row>
                        <div
                          id="alert-error-msg"
                          className="d-none alert alert-danger py-2"
                        ></div>
                        <input type="hidden" id="id-field" />
                        <Col lg={4}>
                          <div className="mb-3">
                            <Form.Label htmlFor="enseignant">
                              Enseignant
                            </Form.Label>
                            <select
                              className="form-select text-muted"
                              name="etat_compte"
                              id="etat_compte"
                              value={formData?.enseignant?.nom_fr}
                              onChange={handleChange}
                            >
                              {/* <option value="">Sélectionner Enseignant</option> */}

                              <option value={selectedTeacher?.id!}>
                                {selectedTeacher?.name!}
                              </option>
                            </select>
                          </div>
                        </Col>
                        <Col lg={5}>
                          <div className="mb-3">
                            <Form.Label htmlFor="matiere">Matière</Form.Label>
                            <select
                              className="form-select text-muted"
                              name="matiere"
                              id="matiere"
                              value={formData?.matiere}
                              onChange={handleChangeFiltredMatiere}
                            >
                              <option value="">Sélectionner Matière</option>
                              {selectedVoeux?.map((mat: any) => (
                                <option key={mat.id} value={mat.id}>
                                  {mat.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </Col>
                        <Col lg={3}>
                          <div className="mb-3">
                            <Form.Label htmlFor="semestre">
                              Type Séance
                            </Form.Label>
                            <div className="form-check form-switch form-switch-lg from-switch-info">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="customSwitchsizelg"
                                checked={formData.type_seance === "1"}
                                onChange={toggleTypeSeance}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customSwitchsizelg"
                              >
                                {formData.type_seance}
                              </label>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3}>
                          <div className="mb-3">
                            <Form.Label htmlFor="jour">Jour</Form.Label>
                            <select
                              className="form-select"
                              name="jour"
                              id="jour"
                              onChange={selectChangeJour}
                              onClick={(e) => {
                                if (formData.matiere === "") {
                                  alert(
                                    "Veuillez sélectionner une matière d'abord!"
                                  );
                                }
                              }}
                            >
                              <option value="">Sélectionner Jour</option>
                              {formData.matiere !== "" ? (
                                availableDays.map((day) => (
                                  <option value={day}>{day}</option>
                                ))
                              ) : (
                                <></>
                              )}
                            </select>
                          </div>
                        </Col>
                        <Col lg={3}>
                          <div className="mb-3">
                            <Form.Label htmlFor="heure_debut">
                              Heure début
                            </Form.Label>
                            <select
                              className="form-select text-muted"
                              name="heure_debut"
                              id="heure_debut"
                              value={formData.heure_debut}
                              onChange={selectChangeHeureDebut}
                              onClick={(e) => {
                                if (formData.jour === "") {
                                  alert(
                                    "Veuillez sélectionner un jour d'abord!"
                                  );
                                }
                              }}
                            >
                              <option value="">--:--</option>

                              {formData.jour !== "" ? (
                                timeSlots.map((time: any, index: number) =>
                                  index !== timeSlots.length - 1 ? (
                                    <option value={time}>{time}</option>
                                  ) : (
                                    <></>
                                  )
                                )
                              ) : (
                                <></>
                              )}
                            </select>
                          </div>
                        </Col>

                        <Col lg={3}>
                          <div className="mb-3">
                            <Form.Label htmlFor="heure_fin">
                              Heure fin
                            </Form.Label>
                            <select
                              className="form-select text-muted"
                              name="heure_fin"
                              id="heure_fin"
                              value={formData.heure_fin}
                              onChange={selectChangeHeureFin}
                            >
                              <option value="">--:--</option>

                              {heuresFin.map((time: any) => (
                                <option value={time}>{time}</option>
                              ))}
                            </select>
                          </div>
                        </Col>

                        <Col lg={3}>
                          {disponibiliteSalles.length === 0 ? (
                            <div className="d-flex flex-column">
                              <Form.Label htmlFor="statusSelect">
                                Salle
                              </Form.Label>
                              <Button
                                variant="secondary"
                                onClick={handleFetchDisponibiliteSalles}
                                disabled={formData.heure_fin === ""}
                              >
                                {roomsAvailabilityRequestStatus.isLoading ===
                                true ? (
                                  <CustomLoaderForButton></CustomLoaderForButton>
                                ) : (
                                  <>Salles disponibles?</>
                                )}
                              </Button>
                            </div>
                          ) : (
                            <div className="mb-3">
                              {" "}
                              <Form.Label htmlFor="statusSelect">
                                Salle
                              </Form.Label>
                              <select
                                className="form-select text-muted"
                                name="etat_compte"
                                id="etat_compte"
                                value={formData?.salle}
                                onChange={handleChangeSalle}
                              >
                                <option value="">Sélectionner Salle</option>
                                {disponibiliteSalles.map((salleDisponible) => (
                                  <option
                                    key={salleDisponible._id}
                                    value={salleDisponible._id}
                                  >
                                    {salleDisponible.salle}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </Col>
                      </Row>

                      <Col lg={12} className="modal-footer">
                        <div className="hstack gap-2 justify-content-end">
                          <Button
                            className="btn-ghost-danger"
                            onClick={() => {
                              tog_AddSeanceModals();
                            }}
                          >
                            <i className="ri-close-line align-bottom me-1"></i>{" "}
                            Fermer
                          </Button>

                          <Button
                            variant="primary"
                            id="add-btn"
                            onClick={() => {
                              onSubmitSeance();
                            }}
                            disabled={formData.salle === ""}
                          >
                            {sessionCreationRequestStatus.isLoading === true ? (
                              <CustomLoaderForButton></CustomLoaderForButton>
                            ) : (
                              <>Ajouter Séance</>
                            )}
                          </Button>
                        </div>
                      </Col>
                    </Form>
                  </Modal.Body>
                </Modal>
                <div className="modal-footer"></div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default GestionEmploiClasse;
