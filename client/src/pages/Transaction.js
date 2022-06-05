import React, {useContext } from "react";
import { MainNavbarAdmin } from "../components";
import { Container, Row, Col, Table, Dropdown, } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from '../config/api';
import { UserContext } from '../context/userContext';

export default function Transaction() {
  const [state, dispatch] = useContext(UserContext);
  document.title = "Transaction";

  const counting = (rem,crt) => {
    const day = 1000*60*60*24
    const expired = new Date(crt).getTime() + (day*rem)
    const sisa =  Math.ceil((expired - Date.now()) / day)
  
    if (sisa<=0) {
      return "Expired"
    }else{
      return sisa + " / Hari"
    }
     
  }

  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  return (
    <>
      <MainNavbarAdmin
        profile={state?.user?.fullname?.slice(0,1).toUpperCase()}
        title={state.user.fullname}
       />

      <Container className="text-white pt-5 mt-5">
        <Row>
          <Col xs="6">
            <h3 className="fw-bold ">Incoming Transaction</h3>
          </Col>

          <Col xs="12" className="my-4">
            {transactions?.length !== 0 ? (
              <Table striped hover size="lg" variant="dark">
                <thead>
                  <tr className="text-danger">
                    <th width="1%" className="text-center">
                      No
                    </th>
                    <th>Users</th>
                    <th>Bukti Trasnsfer</th>
                    <th>Remaining Active</th>
                    <th>Status User</th>
                    <th>Status Payment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.map((item, index) => (
                    <tr>
                      <td className="align-middle text-center">{index + 1}</td>
                      <td className="align-middle">{item.user.fullname}</td>
                      <td>
                      <img
                        src={item.bukti}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                        alt="gambar"
                      />
                        </td>
                      <td className={counting(item.remaining,item.createdAt) === "Expired"?`text-danger fw-bold`:`text-white`}>{counting(item.remaining,item.createdAt)}</td>
                      <td className={item.userStatus === "Active" ? `text-secondary`: `text-danger`}>
                        {item.userStatus}
                      </td>
                      <td className={
                        item.paymentStatus === "Approve" ? `text-secondary`: (item.paymentStatus === "Pending" ? `text-warning`:`text-danger`)
                        }>{item.paymentStatus}</td>
                      <td className="align-middle">
                      <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-primary"
                      align="end"
                      id="button profil"
                    ></Dropdown.Toggle>
                    <Dropdown.Menu 
                      style={{ backgroundColor: "#3A3A3A" }}
                    >
                      <Dropdown.Item className="text-light" eventKey="1">Approve</Dropdown.Item>
                      <Dropdown.Item className="text-light" eventKey="2">Cancel</Dropdown.Item>
                      <Dropdown.Item className="text-light" eventKey="3">Pending</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center pt-5">
                <div className="mt-3 fw-bold">No data Transaction</div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
