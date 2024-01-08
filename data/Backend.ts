import { Session } from 'inspector';
import { Signin, Signup } from './BackendTypes';
import { api } from './clients';

// Backend module contains functions related to User and Survey operations
export const Backend = {
  // User operations
  User: {
    // Retrieves all users from the backend
    getAllUsers: () => {
      return api.get(`user/`, null);
    },
    
    // Authenticates a user with provided credentials and stores access token in local storage
    signin: (data: Signin) => {
      return api.post('user/signin', data).then((res: any) => {
        if (res.access_token) {
          window.localStorage.setItem(
            'survey::credentials',
            JSON.stringify(res.access_token)
          );
        }
        return res;
      });
    },
    
    // Retrieves user information by user ID
    getUser: (userId: any) => {
      return api.get(`user/${userId}`);
    },
    
    // Registers a new user with provided signup data
    signup: (data: Signup) => api.post('user/signup', data),
    
    // Signs out a user with the provided token
    signout: (token: string) => {
      return api.post('user/signout', token);
    },
    
    // Checks the session validity using the provided token
    session: (token: string) => {
      return api.post('user/session', token);
    },
    
    // Initiates a user checkout process with stored credentials
    checkout: (credentials: string) =>
      api.post(`user/session`, credentials) as Promise<{
        valid: boolean;
        showInstructions?: boolean;
      }>,
  },

  Survey: {
    // Retrieves all surveys from the backend
    getAllSurveys: () => {
      return api.get(`survey/`, null);
    },
    
    // Retrieves a specific survey by survey ID
    getSurveyById: (surveyId: any) => {
      return api.get(`survey/${surveyId}`);
    },
    
    // Updates an existing survey with provided data and survey ID
    updateSurvey: (data: any, surveyId: any) => {
      return api.post('survey/create', data, surveyId);
    },
    
    // Creates a new survey with provided survey data
    createSurvey: (surveyData: any) => {
      return api.post('survey/create', surveyData);
    },
    
    // Submits a user's response to a survey
    userSurveyResponse: (data: any) => {
      
      return api.post('survey/response', { data });
    },
  },
};

export default Backend;
