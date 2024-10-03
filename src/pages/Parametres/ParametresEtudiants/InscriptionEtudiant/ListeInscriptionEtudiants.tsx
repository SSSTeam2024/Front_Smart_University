import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import Swal from "sweetalert2";
import { TypeInscriptionEtudiant,  useDeleteTypeInscriptionEtudiantMutation, useFetchTypeInscriptionsEtudiantQuery } from "features/typeInscriptionEtudiant/typeInscriptionEtudiant";


const ListeInscriptionEtudiants = () => {
  document.title =
    "Liste inscriptions des étudiants | Smart University";

  const navigate = useNavigate();

  const [modal_AddParametreModals, setmodal_AddParametreModals] =
    useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value.toLowerCase());
    };
  function tog_AddParametreModals() {
    setmodal_AddParametreModals(!modal_AddParametreModals);
  }

  function tog_AddTypeInscriptionEtudiant() {
    navigate("/parametre/add-inscription-etudiants");
  }
  const { data = [] } = useFetchTypeInscriptionsEtudiantQuery();
  const [deleteTypeInscriptionEtudiant] = useDeleteTypeInscriptionEtudiantMutation();
  const filteredTypeInscriptions = useMemo(() => {
    let result = data;

    // Filter by search query
    if (searchQuery) {
      result = result.filter((typeInscription) =>
        [
          typeInscription.type_ar,
          typeInscription.type_fr,
          typeInscription.value_type_inscription,
          
        ].some((value) => value && value.toLowerCase().includes(searchQuery))
      );
    }

    return result;
  }, [data, searchQuery]);


  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const AlertDelete = async (_id: string) => {
  
    swalWithBootstrapButtons
    .fire({
      title: "Êtes-vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimez-le!",
      cancelButtonText: "Non, annuler!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        deleteTypeInscriptionEtudiant(_id);
        swalWithBootstrapButtons.fire(
          "Supprimé!",
          "Type inscription étudiant a été supprimé.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          "Annulé",
          "Type inscription étudiant est en sécurité :)",
          "error"
        );
      }
    });
  }



  const columns = useMemo(
    () => [
        {
            Header: (<div className="form-check"> <input className="form-check-input" type="checkbox" id="checkAll" value="option" /> </div>),
            Cell: (cellProps: any) => {
                return (<div className="form-check"> <input className="form-check-input" type="checkbox" name="chk_child" defaultValue="option1" /> </div>);
            },
            id: '#',
        },

        {
            Header: "Value",
            accessor: "value_type_inscription",
            disableFilters: true,
            filterable: true,
        },
       
        {
            Header: "Inscription Etudiant",
            accessor: "type_fr",
            disableFilters: true,
            filterable: true,
        },
        {
            Header: "تسجيل الطالب",
            accessor: "type_ar",
            disableFilters: true,
            filterable: true,
        },
        
        {
            Header: "Action",
            disableFilters: true,
            filterable: true,
            accessor: (typeInscriptionEtudiant: TypeInscriptionEtudiant) => {
                return (
                    <ul className="hstack gap-2 list-unstyled mb-0">
                      <li>
                        <Link
                          to="/parametre/edit-type-inscription-etudiant"
                          state={typeInscriptionEtudiant}
                          className="badge bg-primary-subtle text-primary edit-item-btn"
                    
                        >
                          <i
                            className="ph ph-pencil-line"
                            style={{
                              transition: "transform 0.3s ease-in-out",
                              cursor: "pointer",
                              fontSize: "1.5em",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.transform = "scale(1.2)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                          ></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="badge bg-danger-subtle text-danger remove-item-btn"
                        >
                          <i
                            className="ph ph-trash"
                            style={{
                              transition: "transform 0.3s ease-in-out",
                              cursor: "pointer",
                              fontSize: "1.5em",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.transform = "scale(1.2)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                            onClick={() => AlertDelete(typeInscriptionEtudiant?._id!)}
                            
                          ></i>
                        </Link>
                      </li>
                    </ul>
                  );
            },
        },
    ],
    []
);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Paramètres des étudiants" pageTitle="Liste types inscriptions des étudiants" />
         
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
                          value={searchQuery}
                          onChange={handleSearchChange}
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>
                    {/* <Col className="col-lg-auto">
                      <select
                        className="form-select"
                        id="idStatus"
                        name="choices-single-default"
                      >
                        <option defaultValue="All">Status</option>
                        <option value="All">tous</option>
                        <option value="Active">Activé</option>
                        <option value="Inactive">Desactivé</option>
                      </select>
                    </Col> */}
                  
                    <Col className="col-lg-auto ms-auto">
                      <div className="hstack gap-2">
                        <Button
                          variant="primary"
                          className="add-btn"
                          onClick={() => tog_AddTypeInscriptionEtudiant()}
                        >
                          Ajouter type inscription étudiant
                        </Button>
                      
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* <Modal
                className="fade modal-fullscreen"
                show={modal_AddParametreModals}
                onHide={() => {
                  tog_AddParametreModals();
                }}
                centered
              >
                <Modal.Header className="px-4 pt-4" closeButton>
                  <h5 className="modal-title" id="exampleModalLabel">
                    Ajouter Inscription Etudiant
                  </h5>
                </Modal.Header>
                <Form className="tablelist-form">
                  <Modal.Body className="p-4">
                    <div
                      id="alert-error-msg"
                      className="d-none alert alert-danger py-2"
                    ></div>
                    <input type="hidden" id="id-field" />

                    <div className="mb-3">
                      <Form.Label htmlFor="seller-name-field">
                        Valeur
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="seller-name-field"
                        placeholder=""
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <Form.Label htmlFor="item-stock-field">
                        Inscription Etudiant
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="item-stock-field"
                        placeholder=""
                        required
                      />
                    </div>

                    <div
                      className="mb-3"
                      style={{
                        direction: "rtl",
                        textAlign: "right",
                      }}
                    >
                      <Form.Label htmlFor="phone-field">
                        تسجيل الطالب
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="phone-field"
                        placeholder=""
                        required
                      />
                    </div>
                  </Modal.Body>
                  <div className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        className="btn-ghost-danger"
                        onClick={() => {
                          tog_AddParametreModals();
                        }}
                      >
                        Fermer
                      </Button>
                      <Button variant="success" id="add-btn">
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </Form>
              </Modal> */}

              <Card>
                <Card.Body className="p-0">
                  {/* <div className="table-responsive table-card mb-1"> */}
                  <table
                    className="table align-middle table-nowrap"
                    id="customerTable"
                  >
                     <TableContainer
                columns={(columns || [])}
                data={(filteredTypeInscriptions || [])}
                // isGlobalFilter={false}
                iscustomPageSize={false}
                isBordered={false}
                customPageSize={10}
                className="custom-header-css table align-middle table-nowrap"
                tableClass="table-centered align-middle table-nowrap mb-0"
                theadClass="text-muted table-light"
                SearchPlaceholder='Search Products...'
            />
                  </table>
                  <div className="noresult" style={{ display: "none" }}>
                    <div className="text-center py-4">
                      <div className="avatar-md mx-auto mb-4">
                        <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                          <i className="bi bi-search"></i>
                        </div>
                      </div>
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted mb-0">
                        We've searched more than 150+ seller We did not find any
                        seller for you search.
                      </p>
                    </div>
                  </div>
                  {/* </div> */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ListeInscriptionEtudiants;
