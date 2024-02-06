
export const baseUrl = 'https://med.avika.ai';
export const publicURL = process.env.REACT_APP_BASE_URL;


//login Url
export const loginUrl = `${baseUrl}/auth/login`;

//document list table data api
export const documentListTableDataApi = `${baseUrl}/admin/records`;

//get a single document  by id
export const getDocumentById = `${baseUrl}/admin/getMedicalRecord/`