import React, { useState, useEffect } from "react";
import Uheader from "../../../../components/user/header/uheader";
import UsidePanel from "../../../../components/user/sidepanel/usidepanel";
import "./riview.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const reviewList = () => {
  const userid = localStorage.getItem("userid");
  const [reviewdata, setreviewdata] = useState([]);
  const [dataerror, setDataerror] = useState(false);

  useEffect(() => {
    getReviewList();
  }, [] );
  
  

  const getReviewList = async () => {
    let result = await fetch(
      `${process.env.REACT_APP_API_URL}/getreviewlist/`,
      {
        method: "POST",
        body: JSON.stringify({
          userid: userid,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    result = await result.json();
    result = Array.of( result );
    console.log( result );
    if (result) {
      //console.log(result);
      setDataerror(false);
      setreviewdata(result[0]);
    } else {
      setDataerror(true);
    }
  };

  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-lg-2 noleftrightpadding">
          <UsidePanel></UsidePanel>
        </div>
        <div className="col-lg-10 noleftrightpadding">
          <Uheader></Uheader>
          <div className="Dashboardsec box-shadow">
            <div className="row orer-details">
              <div className="col-lg-6">
                <div className="Topl mb-3">
                  <span className="heading-level-2">
                    Your Logged Review List{" "}
                  </span>
                </div>
              </div>
              <div className="col-lg-6 float-end">
                <div className=" mt-2 float-end">
                  <Link to="/user/submit-review" className="submitbtn">
                    Submit New Review
                  </Link>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              {dataerror ? (
                <label className="text-danger">
                  Now Query Found On Database
                </label>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Review Id#</th>
                      <th>Card Qty</th>
                      <th>Card Type</th>
                      <th>Status</th>
                      <th>Comments</th>
                    </tr>
                    {reviewdata.map((review) => (
                      <tr key={review._id}>
                        <td>{review.reviewid}</td>
                        <td>{review.notloggedcadqty}</td>
                        <td>{review.cardtype}</td>
                        <td>{review.status}</td>
                        <td>{review.comment}</td>
                      </tr>
                    ))}
                  </thead>
                </Table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default reviewList;
