import { useState } from "react";
import { Button, Form, Alert, Row, Col, Container } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../../context/user/userContext";
import { types } from "../../../context/user/userReducer";
import axiosInstance from "../../../config/axios";
import jwt from "jwt-decode";

export const AdminUser = () => {
  return <div>AdminUser</div>;
};
