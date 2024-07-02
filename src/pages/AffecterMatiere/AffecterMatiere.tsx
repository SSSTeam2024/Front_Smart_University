import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { useLocation, useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";
import Select, { MultiValue } from "react-select";
import { Matiere, useFetchMatiereQuery } from "features/matiere/matiere";
import { useAssignMatiereToClasseMutation, useDeleteAssignedMatiereFromClasseMutation } from "features/classe/classe";

interface MatiereOption {
  value: string;
  label: string;
  type: string;
  semestre: string;
  code_matiere: string;
  volume: string;
  nbr_elimination: string;
}

const AffecterMatiere = () => {
  document.title = "Affecter matiére aux groupes/classes | Smart University";
  const [selectedMatieres, setSelectedMatieres] = useState<Matiere[]>([]);
  const navigate = useNavigate();
  const { data: allMatieres = [], error } = useFetchMatiereQuery();
  const [assignMatiereToClasse, { isLoading: isAssigningMatiere, isError: assignMatiereError }] = useAssignMatiereToClasseMutation();
  const [deleteAssignedMatiereFromClasse, { isLoading: isDeletingMatiere, isError: deleteMatiereError }] =
    useDeleteAssignedMatiereFromClasseMutation();

  const location = useLocation();
  const classeId = location.state?._id;

  useEffect(() => {
    if (location.state?.matieres) {
      setSelectedMatieres(location.state.matieres);
    }
  }, [location.state?.matieres]);

  if (error || deleteMatiereError || assignMatiereError) {
    console.error("Error fetching matieres:", error || deleteMatiereError || assignMatiereError);
    return <div>Error processing matieres</div>;
  }

  const prevNavigate = () => {
    navigate("/departement/gestion-classes/liste-classes");
  };

  const options: MatiereOption[] = allMatieres.map((matiere) => ({
    value: matiere._id,
    label: matiere.matiere,
    type: matiere.type,
    semestre: matiere.semestre,
    code_matiere: matiere.code_matiere,
    volume: matiere.volume,
    nbr_elimination: matiere.nbr_elimination,
  }));

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

  const handleSelectChange = (selectedOptions: MultiValue<MatiereOption>) => {
    const matieres = selectedOptions.map(option => ({
      _id: option.value,
      code_matiere: option.code_matiere,
      matiere: option.label,
      type: option.type,
      semestre: option.semestre,
      volume: option.volume,
      nbr_elimination: option.nbr_elimination,
    }));
    setSelectedMatieres(matieres);
  };

  const handleDeleteClick = async (matiereId: string) => {
    try {
      await deleteAssignedMatiereFromClasse({ classeId, matiereId }).unwrap();
      setSelectedMatieres((prevMatieres) =>
        prevMatieres.filter((m) => m._id !== matiereId)
      );
    } catch (error) {
      console.error("Error deleting assigned matiere from classe:", error);
    }
  };
  
  const handleSubmit = async () => {
    try {
      // Filter selectedMatieres to only include matieres that haven't been deleted
      const matiereIds = selectedMatieres.map((matiere) => matiere._id);
      await assignMatiereToClasse({
        _id: classeId,
        matiereIds,
      }).unwrap();
      // Optionally reset selectedMatieres after successful assignment
      setSelectedMatieres([]);
      navigate("/departement/gestion-classes/liste-classes");
    } catch (error) {
      console.error("Error assigning matieres to classe:", error);
    }
  };
  
  


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            title="Gestion des départements"
            pageTitle="Affecter matiére avec groupe"
          />

          <Row id="sellersList">
            <Col lg={12}>
              <Card>
                <Card.Body>
                  <Row className="g-3">
                    <Col lg={3}>
                      <div className="search-box">
                        <input
                          type="text"
                          className="form-control search"
                          placeholder="Chercher..."
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>

                    <Col className="col-lg-auto ms-auto">
                      <div className="hstack gap-3">
                        <Button
                          variant="info"
                          className="add-btn"
                          onClick={prevNavigate}
                        >
                          Retour
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body className="p-3">
                  <Row>
                    <Col lg={6} style={{ maxHeight: "calc(100vh - 150px)" }}>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Form.Label
                            htmlFor="choices-multiple-remove-button"
                            className="text-muted"
                          >
                            Selectionner Matiere
                          </Form.Label>

                          <Select
                            closeMenuOnSelect={false}
                            isMulti
                            options={options}
                            styles={customStyles}
                            onChange={handleSelectChange}
                          />
                        </div>
                      </Col>
                    </Col>
                    <Col lg={6}>
                      <div className="sticky-side-div mb-4">
                        <label htmlFor="studentIdInput" className="form-label">
                          Liste des matières liés avec groupe :
                          <span style={{ color: "#8B322C" }}>
                            {location?.state?.nom_classe_fr!}
                          </span>
                        </label>

                        <SimpleBar style={{ maxHeight: "calc(100vh - 150px)" }}>
                          <Row className="gy-4">
                            <Col lg={12}>
                              {selectedMatieres.map((matiere) => (
                                <Card
                                  style={{ height: "50px", marginTop: "10px" }}
                                  key={matiere._id}
                                >
                                  <Card.Body style={{ padding: "10px" }}>
                                    <div className="d-flex justify-content-between">
                                      <h1 className="fs-18 mb-3">
                                        <span style={{ color: "#9B3922" }}>
                                          {matiere.code_matiere}
                                        </span>
                                        - {matiere.matiere} /
                                        <span style={{ color: "#2C7865" }}>
                                        {matiere.type}
                                        </span>
                                        /
                                        <span style={{ color: "#627254" }}>
                                        {matiere.semestre}
                                        </span>
                                      </h1>
                                      <Button
                                        type="button"
                                        className="btn btn-danger btn-icon btn-sm"
                                        onClick={() => handleDeleteClick(matiere._id)}
                                      >
                                        <i className="ri-delete-bin-5-line"></i>
                                      </Button>
                                      
                                    </div>
                                  </Card.Body>
                                </Card>
                              ))}
                            </Col>
                          </Row>
                        </SimpleBar>
                        <Button variant="primary" onClick={handleSubmit} >
                          Submit
                        </Button>
                        {error && <div className="text-danger">Error assigning matieres to classe.</div>}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AffecterMatiere;
