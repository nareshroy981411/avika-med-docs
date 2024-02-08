import { combineReducers } from 'redux';
import medicalRecordReducer from './medicalRecordReducer';

const rootReducer = combineReducers({
  medicalRecord: medicalRecordReducer
});

export default rootReducer;
