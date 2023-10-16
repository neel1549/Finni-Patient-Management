import axios from "axios";

export type Patient = {
  firstName: string;
  middleName: string;
  lastName: string;
  status: string;
  email: string;
  address: string;
  phoneNumber: string;
  providerId: string;
  patientId?: string;
  profilePhoto?: File;
  additionalFields?: {};
};

export type NewUser = {
  email: string;
  uid: string;
};

export const getPatients = (
  providerId: string,
  token: string
): Promise<any> => {
  return axios.get("http://localhost:8080/patients", {
    params: { providerId: providerId },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const createNewUser = (
  newUser: NewUser,
  token: string
): Promise<NewUser> => {
  return axios.post(
    "http://localhost:8080/user",
    { email: newUser.email, uid: newUser.uid },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
export const createNewPatient = (newPatient: Patient, token: string) => {
  let retPatient = null;
  const formData = new FormData();
  formData.append("firstName", newPatient.firstName);
  formData.append("middleName", newPatient.middleName);
  formData.append("lastName", newPatient.lastName);
  formData.append("email", newPatient.email);
  formData.append("address", newPatient.address);
  formData.append("phoneNumber", newPatient.phoneNumber);
  formData.append("providerId", newPatient.providerId);
  formData.append("status", newPatient.status);
  formData.append("patientId", newPatient.patientId);
  formData.append("file", newPatient.profilePhoto);

  Object.entries(newPatient.additionalFields || []).map(([key, value]) => {
    console.log(key, value);
    formData.append(key, value as string);
  });

  console.log(formData.getAll("file"));
  axios
    .post("http://localhost:8080/patient", formData, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => (retPatient = res.data))
    .catch((e) => console.log(e));
  return retPatient;
};
export const updatePatient = (newPatient: Patient, token: string) => {
  let retPatient = null;
  axios
    .put(
      `http://localhost:8080/patient/${newPatient?.patientId}`,
      { ...newPatient },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => (retPatient = res.data))
    .catch((e) => console.log(e));
  return retPatient;
};
export const deletePatient = (patientId: string, token: string) => {
  return axios.delete(
    `http://localhost:8080/patient/${patientId}`,

    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
