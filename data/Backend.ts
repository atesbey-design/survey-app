import { Session } from 'inspector'
import { Signin, Signup } from './BackendTypes'
import { api } from './clients'

export const Backend = {
  User: {
    getAllUsers: () => {
      return api.get(`user/`, null)
    },
    signin: (data: Signin) => {
      return api.post('user/signin', data).then((res: any) => {
        if (res.access_token) {
          window.localStorage.setItem(
            'survey::credentials',
            JSON.stringify(res.access_token)
          )
        }
        return res
      })
    },
    getUser: (userId: any) => {
      return api.get(`user/${userId}`)
    },

    signup: (data: Signup) => api.post('user/signup', data),
    signout: (token: string) => {
      return api.post('user/signout', token)
    },
    session: (token: string) => {
      return api.post('user/session', token)
    },
    checkout: (credentials: string) =>
      api.post(`user/session`, credentials) as Promise<{
        valid: boolean
        showInstructions?: boolean
      }>
  },
  Survey: {
    getAllSurveys: () => {
      return api.get(`survey/`, null)
    },
    getSurveyById: (surveyId: any) => {
      return api.get(`survey/${surveyId}`)
    },
    updateSurvey: (data: any, surveyId: any) => {
      return api.post('survey/create', data, surveyId)
    },
    createSurvey: (surveyData: any) => {
      return api.post('survey/create', surveyData)
    },
    userSurveyResponse: (data: any) => {
      console.log('buradakidata', data)
      return api.post('survey/response', { data })
    }
  }
}

export default Backend
