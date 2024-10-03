import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import TableContainer from "Common/TableContainer";
import Swal from "sweetalert2";
import { useDeleteEtatEnseignantMutation, useFetchEtatsEnseignantQuery } from "features/etatEnseignant/etatEnseignant";

const ListEtatEnseignants = () => {
  document.title = "Liste états des enseignants | Smart University";

  const navigate = useNavigate();

  const [modal_AddParametreModals, setmodal_AddParametreModals] =
    useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value.toLowerCase());
    };

  function tog_AddEtatEnseignant() {
    navigate("/parametre/add-etat-enseignant");
  }
  const { data = [] } = useFetchEtatsEnseignantQuery();


  const filteredEtatCompteEnseignants = useMemo(() => {
    let result = data;
    if (searchQuery) {
      result = result.filter((etatCompteEnseignant) =>
        [
          etatCompteEnseignant.etat_ar,
          etatCompteEnseignant.etat_fr,
          etatCompteEnseignant.value_etat_enseignant,
        ].some((value) => value && value.toLowerCase().includes(searchQuery))
      );
    }

    return result;
  }, [data, searchQuery]);
  const [deleteEtatEnseignant] = useDeleteEtatEnseignantMutation();

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
        deleteEtatEnseignant(_id);
        swalWithBootstrapButtons.fire(
          "Supprimé!",
          "L'état compte enseignant a été supprimé.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          "Annulé",
          "L'état compte enseignant est en sécurité :)",
          "error"
        );
      }
    });
  }
  const columns = useMemo(
    () => [
      {
        Header: (
          <div className="form-check">
            {" "}
            <input
              className="form-check-input"
              type="checkbox"
              id="checkAll"
              value="option"
            />{" "}
          </div>
        ),
        Cell: (cellProps: any) => {
          return (
            <div className="form-check">
              {" "}
              <input
                className="form-check-input"
                type="checkbox"
                name="chk_child"
                defaultValue="option1"
              />{" "}
            </div>
          );
        },
        id: "#",
      },
      {
        Header: "Value",
        accessor: "value_etat_enseignant",
        disableFilters: true,
        filterable: true,
      },

      {
        Header: "Etat Compte Enseignant",
        accessor: "etat_fr",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "حالة حساب الأستاذ",
        accessor: "etat_ar",
        disableFilters: true,
        filterable: true,
      },

      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (etatEnseignant: any) => {
          return (
            <ul className="hstack gap-2 list-unstyled mb-0">
        
              <li>
                <Link
             
                  to="/parametre/edit-etat-enseignant"
                  state={etatEnseignant}
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
                    onClick={() => AlertDelete(etatEnseignant?._id!)}
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
          <Breadcrumb
            title="Paramètres des enseignants"
            pageTitle="Liste états des enseignants"
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
                          value={searchQuery}
                          onChange={handleSearchChange}
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>
             
                    <Col className="col-lg-auto ms-auto">
                      <div className="hstack gap-2">
                        <Button
                          variant="primary"
                          className="add-btn"
                          onClick={() => tog_AddEtatEnseignant()}
                        >
                          Ajouter Etat
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body className="p-0">
                  {/* <div className="table-responsive table-card mb-1"> */}
                  <table
                    className="table align-middle table-nowrap"
                    id="customerTable"
                  >
                    <TableContainer
                      columns={columns || []}
                      data={filteredEtatCompteEnseignants || []}
                      // isGlobalFilter={false}
                      iscustomPageSize={false}
                      isBordered={false}
                      customPageSize={10}
                      className="custom-header-css table align-middle table-nowrap"
                      tableClass="table-centered align-middle table-nowrap mb-0"
                      theadClass="text-muted table-light"
                      SearchPlaceholder="Search Products..."
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

export default ListEtatEnseignants;
