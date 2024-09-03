import React, { useState } from "react";
import {
  Card,
  Form,
  Nav,
  Tab,
  Row,
  Col,
  Dropdown,
  Table,
  Button,
  Image,
  Modal,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import DemandeTable from "./DemandeTable";
import ReclamationTable from "./ReclamationTable";
import "./hover.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import { Navigation, Pagination } from "swiper/modules";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";
import userImage from "../../assets/images/userImage.jpg";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.5.141/pdf.worker.min.js`;

const MyAccount = () => {
  const [clickedFile, setClickedFile] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const studentDetails = location.state;



  // Construct the full URLs for the images

  // console.log("FichePaiement URL:", fichePaiementURL);

  // console.log("Face1CIN URL:", `${face1CINPath}${studentDetails?.face_1_CIN}`);
  // console.log("Face2CIN URL:", `${face2CINPath}${studentDetails?.face_2_CIN}`);
  // console.log(
  //   "FichePaiement URL:",
  //   `${fichePaiementPath}${studentDetails?.fiche_paiement}`
  // );

  const handleFileClick = (fileSrc: string) => {
    setClickedFile(fileSrc);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setClickedFile(null);
  };
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const renderFile = (fileSrc: string) => {
    if (fileSrc.endsWith(".pdf")) {
      return (
        <div className="pdf-viewer">
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.12.0/build/pdf.worker.min.js`}
          >
            <Viewer fileUrl={fileSrc} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        </div>
      );
    } else {
      return (
        <img
          src={fileSrc}
          alt="Document preview"
          className="gallery-img img-fluid mx-auto"
        />
      );
    }
  };

  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);

    // Define the base paths
    const basePath = "http://localhost:5000/files/etudiantFiles/";
  const face1CINPath = `${basePath}Face1CIN/`;
  const face2CINPath = `${basePath}Face2CIN/`;
  const fichePaiementPath = `${basePath}FichePaiement/`;

  const files = [
    `${face1CINPath}${studentDetails?.face_1_CIN}`,
    `${face2CINPath}${studentDetails?.face_2_CIN}`,
    `${fichePaiementPath}${studentDetails?.fiche_paiement}`,
  ];

  const handleShowPdfModal = (fileUrl: string) => {
    setPdfUrl(fileUrl);
    setShowPdfModal(true);
  };

  const handleClosePdfModal = () => {
    setShowPdfModal(false);
    setPdfUrl("");
  };

  const isImageFile = (url: string) => /\.(jpeg|jpg|gif|png)$/i.test(url);
  const isPDFFile = (url: string) => /\.pdf$/i.test(url);
  

  const groupeClasseDisplay =
    typeof studentDetails?.groupe_classe! === "object"
      ? studentDetails?.groupe_classe?.nom_classe_fr!
      : studentDetails?.groupe_classe!;

  const niveauClasseDisplay =
    typeof studentDetails?.groupe_classe?.niveau_classe! === "object"
      ? studentDetails?.groupe_classe?.niveau_classe?.name_niveau_fr!
      : studentDetails?.groupe_classe?.niveau_classe!;

  const getSectionNames = (studentDetails: any) => {
    if (
      Array.isArray(studentDetails?.groupe_classe?.niveau_classe?.sections!)
    ) {
      const sectionNames =
        studentDetails?.groupe_classe?.niveau_classe?.sections.map(
          (section: any) => section.name_section_fr
        );
      return sectionNames;
    } else {
      return [];
    }
  };

  const sectionNames = getSectionNames(studentDetails);
  console.log(sectionNames);

  const etatCompteDisplay =
    typeof studentDetails?.etat_compte! === "object"
      ? studentDetails?.etat_compte?.etat_fr!
      : studentDetails?.etat_compte!;

  const typeInscriptionDisplay =
    typeof studentDetails?.type_inscription! === "object"
      ? studentDetails?.type_inscription?.type_fr!
      : studentDetails?.type_inscription!;

  console.log("studentdetails", studentDetails);

  return (
    <React.Fragment>
      <Tab.Container defaultActiveKey="Profil">
        <div className="d-flex align-items-center gap-3 mb-4">
          <Nav as="ul" className="nav nav-pills flex-grow-1 mb-0">
            <Nav.Item as="li">
              <Nav.Link eventKey="Profil">Profil</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link eventKey="Demandes">Demandes</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link eventKey="Reclamation">Réclamations</Nav.Link>
            </Nav.Item>
          </Nav>

          <div className="flex-shrink-0">
            <Link to="/settings" className="btn btn-success">
              Modifier le profil
            </Link>
          </div>
        </div>

        <Tab.Content className="text-muted">
          <Tab.Pane eventKey="Profil">
            <Card>
              <Row className="g-0">
                <Col md={2}>
                  <img
                    className="rounded-start img-fluid h-70 object-cover m-1"
                    src={
                      studentDetails.photo_profil
                        ? `http://localhost:5000/files/etudiantFiles/PhotoProfil/${studentDetails.photo_profil}`
                        : userImage
                    }
                    alt="Photo Profile"
                    onError={(e) => {
                      e.currentTarget.src = userImage;
                    }}
                  />
                </Col>
                <Col md={10}>
                  <Card.Header>
                    <div className="flex-grow-1 card-title mb-0">
                      <h5>
                        {studentDetails.nom_fr} {studentDetails.prenom_fr}
                      </h5>
                      <p className="text-muted mb-0">
                        {studentDetails.nom_ar} {studentDetails.prenom_ar}
                      </p>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col lg={6} className="m-0 p-0">
                        <div className="table-responsive">
                          <Table className="table-borderless table-sm m-0 p-0 ">
                            <tbody>
                              <tr>
                                <td>Groupe</td>
                                <td className="fw-medium">
                                  {groupeClasseDisplay}
                                </td>
                              </tr>
                              <tr>
                                <td>Cin</td>
                                <td className="fw-medium">
                                  {studentDetails.num_CIN}
                                </td>
                              </tr>
                              <tr>
                                <td>Téléphone</td>
                                <td className="fw-medium">
                                  {studentDetails.num_phone}
                                </td>
                              </tr>
                              <tr>
                                <td>Compte Verifié</td>
                                <td className="fw-medium">
                                  {" "}
                                  <span className="badge badge-label bg-primary">
                                    <i className="mdi mdi-circle-medium"></i>{" "}
                                    Oui
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Col>
                      <Col lg={6} className="m-0 p-0">
                        <div className="table-responsive">
                          <Table className="table-borderless table-sm m-0 p-0 ">
                            <tbody>
                              <tr>
                                <td>Etat de Compte</td>
                                <td className="fw-medium">
                                  <span className="badge badge-label bg-warning">
                                    <i className="mdi mdi-circle-medium"></i>{" "}
                                    {etatCompteDisplay}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>Type d'inscription</td>
                                <td className="fw-medium">
                                  <span className="badge badge-label bg-secondary fs-6">
                                    <i className="mdi mdi-circle-medium"></i>{" "}
                                    {typeInscriptionDisplay}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>Niveau</td>
                                <td className="fw-medium">
                                  {niveauClasseDisplay}
                                </td>
                              </tr>
                              <tr>
                                <td>Filière</td>
                                <td className="fw-medium">{sectionNames}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
            <Card>
              <Row className="p-2">
                <Col lg={6} className="border-end">
                  <h5 className="text-muted"> Informations Personnelles</h5>
                  <div className="table-responsive">
                    <Table className="table-borderless table-sm m-0 p-0 ">
                      <tbody>
                        <tr>
                          <td>Genre</td>
                          <td className="fw-medium">{studentDetails.sexe}</td>
                        </tr>

                        <tr>
                          <td>Etat civil</td>
                          <td className="fw-medium">
                            {studentDetails.etat_civil}
                          </td>
                        </tr>
                        <tr>
                          <td>Date naissance </td>
                          <td className="fw-medium">
                            {studentDetails.date_naissance}
                          </td>
                        </tr>
                        <tr>
                          <td>Lieu de naissance</td>
                          <td className="fw-medium">
                            {studentDetails.lieu_naissance_ar} /{" "}
                            {studentDetails.lieu_naissance_fr}
                          </td>
                        </tr>
                        <tr>
                          <td>Téléphone Etudiant</td>
                          <td className="fw-medium">
                            {studentDetails.num_phone}
                          </td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td className="fw-medium">{studentDetails.email}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Col>
                <Col lg={6}>
                  <h5 className="text-muted "> Adresse de l'etudiant</h5>
                  <div className="table-responsive">
                    <Table className="table-borderless table-sm m-0 p-0 ">
                      <tbody>
                        <tr>
                          <td>Nationalité </td>
                          <td className="fw-medium">
                            {studentDetails.nationalite}
                          </td>
                        </tr>
                        <tr>
                          <td>Gouvernorat</td>
                          <td className="fw-medium">{studentDetails.state}</td>
                        </tr>
                        <tr>
                          <td>Municipalité </td>
                          <td className="fw-medium">
                            {studentDetails.dependence}
                          </td>
                        </tr>
                        <tr>
                          <td>Adresse Domicile FR</td>
                          <td className="fw-medium">
                            {studentDetails.adress_fr}
                          </td>
                        </tr>
                        <tr>
                          <td>Adresse Domicile AR</td>
                          <td className="fw-medium">
                            {studentDetails.adress_ar}
                          </td>
                        </tr>
                        <tr>
                          <td>Code Postal</td>
                          <td className="fw-medium">
                            {studentDetails.code_postale}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
              <Row className="p-2">
                <Col lg={6} className="border-end ">
                  <h5 className="text-muted pb-1 pt-2 "> Parents</h5>
                  <div className="table-responsive">
                    <Table className="table-borderless table-sm m-0 p-0 ">
                      <tbody>
                        <tr>
                          <td>Nom et prénom père</td>
                          <td className="fw-medium">
                            {studentDetails.nom_pere}
                          </td>
                        </tr>

                        <tr>
                          <td>Profession de père </td>
                          <td className="fw-medium">
                            {studentDetails.job_pere}
                          </td>
                        </tr>
                        <tr>
                          <td>Nom et prénom mère </td>
                          <td className="fw-medium">
                            {studentDetails.nom_mere}
                          </td>
                        </tr>
                        <tr>
                          <td>Téléphone famille</td>
                          <td className="fw-medium">
                            {studentDetails.num_phone_tuteur}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Col>
                <Col lg={6}>
                  <h5 className="text-muted pb-1 pt-2"> Baccalauréat</h5>
                  <div className="table-responsive">
                    <Table className="table-borderless table-sm m-0 p-0">
                      <tbody>
                        <tr>
                          <td>Année </td>
                          <td className="fw-medium">
                            {studentDetails.annee_scolaire}
                          </td>
                        </tr>
                        <tr>
                          <td>Section</td>
                          <td className="fw-medium">
                            {studentDetails.filiere}
                          </td>
                        </tr>
                        <tr>
                          <td>Session</td>
                          <td className="fw-medium">
                            {studentDetails.session}
                          </td>
                        </tr>
                        <tr>
                          <td>Moyenne</td>
                          <td className="fw-medium">{studentDetails.moyen}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </Card>

            {/* documents */}

            {/* <div className="mt-3">
                      <ul className="list-unstyled hstack gap-2 mb-0">
                        <li>Documents:</li>
                        <li>
                        <Button type="button" className="btn btn-success btn-label"><i className="bi bi-postcard label-icon align-middle fs-16 me-2"></i> CIN Face 1</Button>
                        </li>
                        <li>
                        <Button type="button" className="btn btn-danger btn-label"><i className="bi bi-card-list label-icon align-middle fs-16 me-2"></i> CIN Face 2</Button>

                        </li>
                        <li>
                        <Button type="button" className="btn btn-info btn-label"><i className="bi bi-file-text label-icon align-middle fs-16 me-2"></i> Fiche d'inscription</Button>

                        </li>
                       
                      </ul>
                    </div> */}
            {/* </Col> */}

            <h5 className="text-muted "> Documents</h5>
            {/* <Row>
              <Col lg={3} className="d-flex flex-column ">
                <Image
                  src={cin1}
                  
                  className="figure-img img-fluid rounded hover-image"
                  onMouseEnter={(e) => handleHover(e, cin1)}
                  onMouseLeave={handleMouseLeave}
                  alt="..."
                />
                <Image
                  src={cin2}
                  onMouseEnter={(e) => handleHover(e, cin2)}
                  onMouseLeave={handleMouseLeave}
                  className="figure-img img-fluid rounded hover-image"
                  alt="..."
                />
               
              </Col>
              <Col lg={2}>
                <Image
                  src={paiement}
                  onMouseEnter={(e) => handleHover(e, paiement)}
                  onMouseLeave={handleMouseLeave}
                  className="figure-img img-fluid rounded h-100 hover-image"
                  alt="..."
                />
              </Col>
              <Col lg={2}>
                <Image
                  src={img1}
                  onMouseEnter={(e) => handleHover(e, img1)}
                  onMouseLeave={handleMouseLeave}
                  className="figure-img img-fluid rounded h-100 hover-image"
                  alt="..."
                />
              </Col>
              <Col lg={2}>
                <Image
                  src={img1}
                  className="figure-img img-fluid rounded h-100 hover-image"
                  alt="..."
                />
              </Col>
              <Col lg={2}>
                <Image
                  src={img1}
                  className="figure-img img-fluid rounded h-100 hover-image"
                  alt="..."
                />
              </Col>
              
            </Row> */}
            <Row>
            <Col lg={12}>
        <Card>
          <Card.Body>
          <Swiper
            spaceBetween={10}
            slidesPerView={3}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
          >
            {files.map((file, index) => (
              <SwiperSlide key={index}>
                {isImageFile(file) ? (
                  <img
                    src={file}
                    alt={`File ${index + 1}`}
                    style={{ width: "100%", height: "300px" }}
                  />
                ) : isPDFFile(file) ? (
                  <button
                    onClick={() => handleShowPdfModal(file)}
                    style={{
                      width: "100%",
                      height: "300px",
                      backgroundColor: "#f0f0f0",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    View PDF {index + 1}
                  </button>
                ) : (
                  <p>Unsupported file format</p>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          </Card.Body>
        </Card>
      </Col>

      {/* Modal for PDF Viewing */}
      <Modal show={showPdfModal} onHide={handleClosePdfModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Document Viewer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pdfUrl ? (
            <iframe src={pdfUrl} width="100%" height="700px" />
          ) : (
            <p>No document to display.</p>
          )}
        </Modal.Body>
      </Modal>
            </Row>
          </Tab.Pane>

          <Tab.Pane eventKey="Demandes">
            <Card>
              {/* <Card.Header className="d-sm-flex align-items-center gap-3">
                <h5 className="card-title mb-0 flex-grow-1">Demandes</h5>
                <div className="search-box mt-3 mt-sm-0">
                  <Form.Control
                    type="text"
                    className="search w-md"
                    placeholder="Rechercher une demande..."
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
              </Card.Header> */}
              <DemandeTable />
            </Card>
          </Tab.Pane>

          <Tab.Pane eventKey="Reclamation">
            <Card>
              {/* <Card.Header className="d-sm-flex align-items-center gap-3">
                <h5 className="card-title mb-0 flex-grow-1">Réclamations</h5>
                <div className="search-box mt-3 mt-sm-0">
                  <Form.Control
                    type="text"
                    className="search w-md"
                    placeholder="Rechercher une réclamation..."
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
              </Card.Header> */}
              <ReclamationTable />
            </Card>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </React.Fragment>
  );
};

export default MyAccount;
