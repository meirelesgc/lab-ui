import { useQuery } from 'react-query';
import { fetchPatients } from '../services/patientClient'

const usePatients = () => {
    return useQuery('fetchPatients', fetchPatients);
};

export default usePatients;