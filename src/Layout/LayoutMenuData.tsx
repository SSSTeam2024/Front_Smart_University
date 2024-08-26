import { RootState } from "../app/store";
import { useAppSelector } from "app/hook";
import { selectCurrentUser } from "features/authSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Navdata = () => {
  const user: any = useSelector((state: RootState) => selectCurrentUser(state));

  //state data
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [isAvisEtudiant, setIsAvisEtudiant] = useState(false);
  const [isAvisEnseignant, setIsAvisEnseignant] = useState(false);
  const [isAvisPersonnel, setIsAvisPersonnel] = useState(false);
  const [isDeaprtement, setIsDeaprtement] = useState(false);
  const [isSellers, setIsSellers] = useState(false);
  const [isInvoice, setIsInvoice] = useState(false);
  const [isParametre, setIsParametre] = useState(false);
  const [isLocalization, setIsLocalization] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);
  const [isEtudiant, setIsEtudiant] = useState(false);
  const [isEnseignant, setIsEnseignant] = useState(false);
  const [isPersonnel, setIsPersonnel] = useState(false);
  const [isActualite, setIsActualite] = useState(false);
  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);
  const [isLevel3, setIsLevel3] = useState(false);
  const [isLevel4, setIsLevel4] = useState(false);
  const [isLevel5, setIsLevel5] = useState(false);
  const [isLevel6, setIsLevel6] = useState(false);
  const [isLevel7, setIsLevel7] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e: any) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul: any = document.getElementById("two-column-menu");
      const iconItems: any = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        // var id: any = item.getAttribute("subitems");
        // if (document.getElementById(id)){
        //     document.getElementById(id).classList.remove("show");
        // }
      });
    }
  }

  function linkInRoutes(link: string, routes: string[]): boolean {
    return routes.includes(link);
  }

  function filterMenuItems(menuItems: any[], routes: string[]): any[] {
    return menuItems.filter((item) => {
      if (item.subItems) {
        item.subItems = filterMenuItems(item.subItems, routes);
        // Keep the item if it has subItems left after filtering
        return item.subItems.length > 0;
      }
      return linkInRoutes(item.link, routes);
    });
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Ecommerce") {
      setIsEcommerce(false);
    }
    if (iscurrentState !== "Orders") {
      setIsOrder(false);
    }
    if (iscurrentState !== "Sellers") {
      setIsSellers(false);
    }
    if (iscurrentState !== "Invoice") {
      setIsInvoice(false);
    }
    if (iscurrentState !== "Parametre") {
      setIsParametre(false);
    }
    if (iscurrentState !== "Localization") {
      setIsLocalization(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "AvisEtudiant") {
      setIsAvisEtudiant(false);
    }
    if (iscurrentState !== "AvisEnseignant") {
      setIsAvisEnseignant(false);
    }
    if (iscurrentState !== "AvisPersonnel") {
      setIsAvisPersonnel(false);
    }
    if (iscurrentState !== "Departement") {
      setIsDeaprtement(false);
    }
    if (iscurrentState !== "Etudiant") {
      setIsEtudiant(false);
    }
    if (iscurrentState !== "Enseignant") {
      setIsEnseignant(false);
    }
    if (iscurrentState !== "Personnel") {
      setIsPersonnel(false);
    }
  }, [
    iscurrentState,
    isEcommerce,
    isOrder,
    isInvoice,
    isParametre,
    isLocalization,
    isAuth,
    isMultiLevel,
    isAvisEtudiant,
    isAvisEnseignant,
    isAvisPersonnel,
    isDeaprtement,
    isEtudiant,
    isEnseignant,
    isPersonnel,
  ]);

  let routes = [
    "/dashboard",
    "/AjouterEtudiant",
    "/AjouterEnseignant",
    "/ListeEnseignants",
    "/ListeEtudiants",
    "/permissions",
    "/parametre/categorie-personnels",
    "/parametre/poste-personnels",
    "/parametre/grade-personnels",
    "/parametre/etat-personnels",
    "/parametre/parametre-personnels",
    "/parametre/specialite-enseignants",
    "/parametre/poste-enseignants",
    "/parametre/grade-enseignants",
    "/parametre/etat-enseignants",
   "/parametre/parametre-enseignants",
   "/parametre/inscription-etudiants",
   "/parametre/etat-etudiants",
   "/parametre/parametre-etudiants",
   "/departement/gestion-matieres/liste-matieres",
   "/departement/gestion-matieres",
   '/departement',
   "/departement/gestion-classes/add-section",
   "/departement/gestion-classes/add-niveau",
   "/departement/gestion-classes/liste-classes",
   "/departement/gestion-classes",
   "/departement/gestion-salles/liste-salles",
   "/departement/gestion-salles",
   "/ListePersonnels",
   '/AjouterPersonnel',
   "/Gestion Personnels",
   "/gestion-departements/liste-departements",
   "/departements",
   "/profil-etudiant",
   "/accountEnseignant",
   "/gestion-fiche-voeux/liste-fiche-voeux",
   "/Fiches-voeux",
   "/emploi",
   "/gestion-emplois/liste-emplois",
   "/gestion-emplois-classe/liste-emplois-classe",
   "/emploi-classe"
  

  ];

  const menuItems: any = [
    {
      label: "Menu",
      isHeader: true,
    },

    //dashboard
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "bi bi-speedometer2",
      link: "/dashboard",
      badgeName: "Hot",
      badgeColor: "danger",
    },
    // gestion etudiant
    {
      id: "Gestion-des-Etudiants",
      label: "Gestion des Etudiants",
      link: "/#",
      icon: "bi bi-person-fill-gear",
      click: function (e: any) {
        e.preventDefault();
        setIsEtudiant(!isEtudiant);
        setIscurrentState("Etudiant");
        updateIconSidebar(e);
      },
      stateVariables: isEtudiant,
      subItems: [
        {
          id: "AjouterEtudiant",
          label: "Ajouter un Etudiant",
          link: "/AjouterEtudiant",
          parentId: "Gestion-des-Etudiant",
          icon: "bi bi-person-fill-add",
        },
        {
          id: "GestionEtudiant",
          label: "Liste Des Etudiants",
          link: "/ListeEtudiants",
          parentId: "Gestion-des-Etudiants",
          icon: "bi bi-person-lines-fill",
        },
      ],
    },
    // gestion enseignant
    {
      id: "gestion-enseignant",
      label: "Gestion Enseignants",
      link: "/#",
      icon: "bi bi-person-fill-gear",
      click: function (e: any) {
        e.preventDefault();
        setIsEnseignant(!isEnseignant);
        setIscurrentState("Enseignant");
        updateIconSidebar(e);
      },
      stateVariables: isEnseignant,
      subItems: [
        {
          id: "AjouterEnseignant",
          label: "Ajouter un Enseignant",
          link: "/AjouterEnseignant",
          parentId: "Gestion-enseignant",
          icon: "bi bi-person-fill-add",
        },
        {
          id: "GestionEnseignant",
          label: "Liste Des Enseignants",
          link: "/ListeEnseignants",
          parentId: "Gestion-enseignant",
          icon: "bi bi-person-lines-fill",
        },
      ],
    },
    //gestion personnel
    {
      id: "Gestion-Personnel",
      label: "Gestion Personnels",
      link: "/Gestion Personnels",
      icon: "bi bi-person-fill-gear",
      click: function (e: any) {
        e.preventDefault();
        setIsPersonnel(!isPersonnel);
        setIscurrentState("Personnel");
        updateIconSidebar(e);
      },
      stateVariables: isPersonnel,
      subItems: [
        {
          id: "AjouterPersonnel",
          label: "Ajouter un Personnel",
          link: "/AjouterPersonnel",
          parentId: "Gestion-Personnel",
          icon: "bi bi-person-fill-add",
        },
        {
          id: "GestionPersonnel",
          label: "Liste Des Personnels",
          link: "/ListePersonnels",
          parentId: "Gestion-Personnel",
          icon: "bi bi-person-lines-fill",
        },
      ],
    },
    {
      id: "parametre",
      label: "Paramètres Comptes",
      icon: "bi bi-sliders",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setIsParametre(!isParametre);
        setIscurrentState("Parametre");
        updateIconSidebar(e);
      },
      stateVariables: isParametre,
      subItems: [
        {
          id: "Etudiants",
          label: "Etudiants",
          icon: "bi bi-mortarboard-fill",
          link: "/parametre/parametre-etudiants",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setIsLevel1(!isLevel1);
          },
          stateVariables: isLevel1,
          childItems: [
            {
              id: 1,
              label: "Etat",
              link: "/parametre/etat-etudiants",
              icon: "bi bi-person-fill-exclamation",
            },
            {
              id: 2,
              label: "Inscription",
              link: "/parametre/inscription-etudiants",
              icon: "bi bi-person-plus-fill",
            },
          ],
        },
        {
          id: "Enseignants",
          label: "Enseignants",
          icon: "bi bi-briefcase-fill",
          link: "/parametre/parametre-enseignants",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setIsLevel2(!isLevel2);
          },
          stateVariables: isLevel2,
          childItems: [
            {
              id: 1,
              label: "Etat",
              link: "/parametre/etat-enseignants",
              icon: "bi bi-person-fill-exclamation",
            },
            {
              id: 2,
              label: "Grade",
              link: "/parametre/grade-enseignants",
              icon: "bi bi-award-fill",
            },
            {
              id: 1,
              label: "Poste",
              link: "/parametre/poste-enseignants",
              icon: "bi bi-book",
            },
            {
              id: 2,
              label: "Spécialité",
              link: "/parametre/specialite-enseignants",
              icon: "bi bi-briefcase-fill",
            },
          ],
        },
        {
          id: "Personnels",
          label: "Personnels",
          icon: "bi bi-person-workspace",
          link: "/parametre/parametre-personnels",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setIsLevel3(!isLevel3);
          },
          stateVariables: isLevel3,
          childItems: [
            {
              id: 1,
              label: "Etat",
              link: "/parametre/etat-personnels",
              icon: "bi bi-person-fill-exclamation",
            },
            {
              id: 2,
              label: "Grade",
              link: "/parametre/grade-personnels",
              icon: "bi bi-award-fill",
            },
            {
              id: 3,
              label: "Poste",
              link: "/parametre/poste-personnels",
              icon: "bi bi-book",
            },
            {
              id: 4,
              label: "Catégorie",
              link: "/parametre/categorie-personnels",
              icon: "bi bi-grid",
            },
            {
              id: 4,
              label: "Service",
              link: "/parametre/service-personnels",
              icon: "bi bi-gear",
            },
          ],
        },
      ],
    },
    {
      id: "departement",
      label: "Gestion Département",
      icon: "bi bi-house-gear-fill",
      link: "/departement",
      click: function (e: any) {
        e.preventDefault();
        setIsDeaprtement(!isDeaprtement);
        setIscurrentState("Departement");
        updateIconSidebar(e);
      },
      stateVariables: isDeaprtement,
      subItems: [
        {
          id: "matieres",
          label: "Matières",
          icon: "bi bi-journals",
          link: "/departement/gestion-matieres",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setIsLevel1(!isLevel1);
          },
          stateVariables: isLevel1,
          childItems: [
            {
              id: 1,
              label: "Liste Des Matières",
              link: "/departement/gestion-matieres/liste-matieres",
              icon: "bi bi-journal-text",
            },
          ],
        },
        {
          id: "salles",
          label: "Gestions Des Salles",
          icon: "bi bi-door-closed-fill",
          link: "/departement/gestion-salles",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setIsLevel2(!isLevel2);
          },
          stateVariables: isLevel2,
          childItems: [
            {
              id: 1,
              label: "Liste Des Salles",
              link: "/departement/gestion-salles/liste-salles",
              icon: "bi bi-person-fill-exclamation",
            },
            // { id: 1, label: "Ajouter Une Salle", link: "/gestion-salles/Ajout-salle",  icon: "bi bi-person-plus-fill"},
          ],
        },
        {
          id: "classes",
          label: "Classes",
          icon: "bi bi-people-fill",
          link: "/departement/gestion-classes",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setIsLevel3(!isLevel3);
          },
          stateVariables: isLevel3,
          childItems: [
            {
              id: 1,
              label: "Liste des classes",
              link: "/departement/gestion-classes/liste-classes",
              icon: "bi bi-people-fill",
            },
            {
              id: 1,
              label: "Listes des niveaux",
              link: "/departement/gestion-classes/liste-niveau",
              icon: "bi bi-sliders2-vertical",
            },
            {
              id: 1,
              label: "listes des séctions",
              link: "/departement/gestion-classes/liste-section",
              icon: "bi bi-diagram-3-fill",
            },
          ],
        },
        {
          id: "departements",
          label: "Départements",
          icon: "bi bi-house-gear-fill",
          link: "/departements",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setIsLevel4(!isLevel4);
          },
          stateVariables: isLevel4,
          childItems: [
            {
              id: 1,
              label: "Liste Des Départements",
              link: "/gestion-departements/liste-departements",
              icon: "bi bi-diagram-3-fill",
            },
            // { id: 1, label: "Ajouter Un Département", link: "/gestion-departements/Ajout-departement",  icon: "bi bi-person-plus-fill"},
          ],
        },
        {
          id: "emplois-enseignants",
          label: "Emplois de Temps Enseignants",
          icon: "bi bi-calendar-week-fill",
          link: "/emploi",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setIsLevel5(!isLevel5);
          },
          stateVariables: isLevel5,
          childItems: [
            {
              id: 1,
              label: "Liste Des Emplois",
              link: "/gestion-emplois/liste-emplois",
              icon: "bi bi-list-task",
            },
            // { id: 1, label: "Ajouter Un Département", link: "/gestion-departements/Ajout-departement",  icon: "bi bi-person-plus-fill"},
          ],
        },
        {
          id: "emplois-classes",
          label: "Emplois de Temps Classes",
          icon: "bi bi-calendar-week-fill",
          link: "/emploi-classe",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setIsLevel6(!isLevel6);
          },
          stateVariables: isLevel6,
          childItems: [
            {
              id: 1,
              label: "Liste Des Emplois",
              link: "/gestion-emplois-classe/liste-emplois-classe",
              icon: "bi bi-list-task",
            },
            // { id: 1, label: "Ajouter Un Département", link: "/gestion-departements/Ajout-departement",  icon: "bi bi-person-plus-fill"},
          ],
        },
        {
          id: "ficheVoeux",
          label: "Fiches des Voeux Enseignants",
          icon: "bi bi-postcard-heart",
          link: "/Fiches-voeux",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setIsLevel7(!isLevel7);
          },
          stateVariables: isLevel7,
          childItems: [
            {
              id: 1,
              label: "Liste Des Voeux",
              link: "/gestion-fiche-voeux/liste-fiche-voeux",
              icon: "bi bi-list-task",
            },
            // {
            //   id: 1,
            //   label: "Liste Des Emplois",
            //   link: "/gestion-fiche-voeux/add-fiche-voeux",
            //   icon: "bi bi-list-task",
            // },
          ],
        },
    
      ],
    },

    //avis etudiants
    {
      id: "Gestion-des-Avis",
      label: "Avis Etudiant",
      link: "/#",
      icon: "bi bi-megaphone",
      click: function (e: any) {
        e.preventDefault();
        setIsAvisEtudiant(!isAvisEtudiant);
        setIscurrentState("AvisEtudiant");
        updateIconSidebar(e);
      },
      stateVariables: isAvisEtudiant,
      subItems: [
        {
          id: "AjouterAvisEtudiant",
          label: "Ajouter un Avis",
          link: "/AjouterAvisEtudiant",
          parentId: "Gestion-des-Avis",
          icon: "bi bi-file-earmark-plus",
        },
        {
          id: "GestionAvisEtudiant",
          label: "Liste des avis",
          link: "/ListeAvisEtudiant",
          parentId: "Gestion-des-Avis",
          icon: "bi bi-list-ul",
        },
      ],
    },
    //avis enseignant
    {
      id: "Avis-enseignant",
      label: "Avis Enseignant",
      link: "/#",
      icon: "bi bi-megaphone",
      click: function (e: any) {
        e.preventDefault();
        setIsAvisEnseignant(!isAvisEnseignant);
        setIscurrentState("AvisEnseignant");
        updateIconSidebar(e);
      },
      stateVariables: isAvisEnseignant,
      subItems: [
        {
          id: "AjouterAvisEnseignant",
          label: "Ajouter un Avis",
          link: "/AjouterAvisEnseignant",
          parentId: "Avis-enseignant",
          icon: "bi bi-file-earmark-plus",
        },
        {
          id: "GestionAvisEnseignant",
          label: "Liste des avis",
          link: "/ListeAvisEnseignant",
          parentId: "Avis-enseignant",
          icon: "bi bi-list-ul",
        },
      ],
    },

    {
      id: "Avis-Personnel",
      label: "Avis Personnel",
      link: "/#",
      icon: "bi bi-megaphone",
      click: function (e: any) {
        e.preventDefault();
        setIsAvisPersonnel(!isAvisPersonnel);
        setIscurrentState("AvisPersonnel");
        updateIconSidebar(e);
      },
      stateVariables: isAvisPersonnel,
      subItems: [
        {
          id: "AjouterAvisPersonnel",
          label: "Ajouter un avis",
          link: "/AjouterAvisPersonnel",
          parentId: "Avis-Personnel",
          icon: "bi bi-file-earmark-plus",
        },
        {
          id: "GestionAvisPersonnel",
          label: "Liste des avis",
          link: "/ListeAvisPersonnel",
          parentId: "Avis-Personnel",
          icon: "bi bi-list-ul",
        },
      ],
    },
    // actualite
    {
      id: "Actualite",
      label: "Actualités",
      link: "/#",
      icon: "bi bi-chat-quote",
      click: function (e: any) {
        e.preventDefault();
        setIsActualite(!isActualite);
        setIscurrentState("ctualite");
        updateIconSidebar(e);
      },
      stateVariables: isActualite,
      subItems: [
        {
          id: "Ajouterctualite",
          label: "Ajouter une actualité",
          link: "/AjouterActualite",
          parentId: "Actualite",
          icon: "bi bi-file-earmark-plus",
        },
        {
          id: "listeActualite",
          label: "Liste des actualités",
          link: "/ListeActualite",
          parentId: "Actualite",
          icon: "bi bi-list-ul",
        },
      ],
    },
    // demande etudiant
    {
      id: "Demande-etudiant",
      label: "Demande Etudiant",
      link: "/ListeDemandeEtudiant",
      icon: "bi bi-telephone-forward",
    },
    // demande enseignant
    {
      id: "Demande-enseignant",
      label: "Demande Enseignant",
      link: "/ListeDemandeEnseignant",
      icon: "bi bi-telephone-forward",
    },
    // demande personnel
    {
      id: "Demande-personnel",
      label: "Demande Personnel",
      link: "/ListeDemandePersonnel",
      icon: "bi bi-telephone-forward",
    },
    // reclamation etudiant
    {
      id: "Reclamation-etudiant",
      label: "Réclamation Etudiant",
      link: "/ListeReclamationEtudiant",
      icon: "bi bi-envelope-exclamation",
    },
    // reclamation enseignant
    {
      id: "Reclamation-enseignant",
      label: "Réclamation Enseignant",
      link: "/ListeReclamationEnseignant",
      icon: "bi bi-envelope-exclamation",
    },
    // reclamation personnel
    {
      id: "Reclamation-personnel",
      label: "Réclamation Personnel",
      link: "/ListeReclamationPersonnel",
      icon: "bi bi-envelope-exclamation",
    },

    {
      id: "Avis-rattrapage",
      label: "Avis Rattrapage",
      link: "/AvisRattrapage",
      icon: "bi bi-book-half",
    },

    {
      id: "gestionPresence",
      label: "Gestion des Présences",
      icon: "bi bi-person-check",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setIsOrder(!isOrder);
        setIscurrentState("Orders");
        updateIconSidebar(e);
      },
      stateVariables: isOrder,
      subItems: [
        {
          id: "Pointages-enseignants",
          label: "Pointage Enseignant",
          link: "/orders-list-view",
          parentId: "gestionPresence",
          icon: "bi bi-fingerprint",
        },
        {
          id: "Absence-enseignant",
          label: "Absence Enseignant",
          link: "/orders-overview",
          parentId: "gestionPresence",
          icon: "bi bi-person-exclamation",
        },
      ],
    },

    {
      id: "telechargement",
      label: "Espace téléchargement",
      icon: "bi bi-cloud-arrow-down-fill",
      link: "/espace-telechargement",
    },
    {
      id: "lien",
      label: "Liens Utils",
      icon: "bi bi-link-45deg",
      link: "/liens-utils",
    },

    {
      id: "Permission",
      label: "Permissions",
      icon: "bi bi-link-45deg",
      link: "/permissions",
    },
  ];

  const filteredMenuItems = filterMenuItems(menuItems, routes);

  return <React.Fragment>{filteredMenuItems}</React.Fragment>;
};
export default Navdata;
