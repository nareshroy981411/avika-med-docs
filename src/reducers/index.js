import { combineReducers } from 'redux';
import medicalRecordReducer from './medicalRecordReducer';

const rootReducer = combineReducers({
  medicalRecord: medicalRecordReducer,
  // Add other reducers if needed
});

export default rootReducer;
